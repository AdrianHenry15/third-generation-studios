"use server"

import { createClient } from "@/lib/supabase/server"
import { bannedWords } from "@/lib/constants"

// Validation helpers - moved outside to prevent recreation on each call
const validatePassword = (password: string): string | null => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

  return passwordRegex.test(password)
    ? null
    : "Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and symbol."
}

const validateUsername = (username: string): string | null => {
  if (!username.trim()) return "Username is required"
  if (bannedWords.some((word) => username.toLowerCase().includes(word))) {
    return "Username contains inappropriate language"
  }
  return null
}

// Database helpers for common operations
const checkUsernameUniqueness = async (
  username: string,
  supabase: any
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle()

  if (error) throw new Error("Could not check username uniqueness")
  return !data // Returns true if username is available
}

const createDefaultSubscription = async (userId: string, supabase: any) => {
  const now = new Date()
  const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .insert({
      user_id: userId,
      tier: "free",
      status: "active",
      current_period_start: now.toISOString(),
      current_period_end: endDate.toISOString(),
      cancel_at_period_end: false,
    })
    .select("id")
    .single()

  if (error) throw new Error("Could not create subscription")

  // Link subscription to profile
  await supabase
    .from("profiles")
    .update({ current_subscription_id: subscription.id })
    .eq("id", userId)

  return subscription
}

// Maps Supabase auth error messages to consistent codes and friendly messages
const mapSupabaseAuthError = (rawMessage: string) => {
  const m = (rawMessage || "").toLowerCase()
  if (
    m.includes("invalid login credentials") ||
    m.includes("invalid email or password")
  ) {
    return {
      code: "invalid_credentials" as const,
      message: "Invalid email or password",
    }
  }
  if (m.includes("email not confirmed")) {
    return {
      code: "email_not_confirmed" as const,
      message: "Email not confirmed",
    }
  }
  if (m.includes("too many requests") || m.includes("rate limit")) {
    return {
      code: "rate_limited" as const,
      message: "Too many attempts. Try again later.",
    }
  }
  if (
    m.includes("captcha") ||
    m.includes("verification") ||
    m.includes("challenge")
  ) {
    return { code: "captcha_required" as const, message: "Captcha required" }
  }
  if (
    m.includes("user not found") ||
    m.includes("no user") ||
    m.includes("email not found")
  ) {
    return { code: "user_not_found" as const, message: "User not found" }
  }
  return { code: "unknown" as const, message: rawMessage }
}

export const signUpAction = async (formData: FormData) => {
  try {
    // Extract and validate form data
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    const confirmPassword = formData.get("confirm_password")?.toString()
    const username = formData.get("username")?.toString()?.trim()
    const hcaptchaToken = formData.get("hcaptcha_token")?.toString()

    // Early validation - fail fast
    if (!email || !password || !confirmPassword || !username) {
      return { error: "All fields are required" }
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    // Use helper functions for validation
    const passwordError = validatePassword(password)
    if (passwordError) return { error: passwordError }

    const usernameError = validateUsername(username)
    if (usernameError) return { error: usernameError }

    const supabase = await createClient()

    // Check username uniqueness using helper
    const isUsernameAvailable = await checkUsernameUniqueness(
      username,
      supabase
    )
    if (!isUsernameAvailable) {
      return { error: "Username is already taken" }
    }

    // Attempt user signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        captchaToken: hcaptchaToken,
      },
    })

    if (error) {
      console.error(`signUp error: ${error.code} ${error.message}`)
      if (error.message?.toLowerCase().includes("already registered")) {
        return {
          error:
            "Email is already registered. Please sign in or use a different email.",
        }
      }
      return { error: error.message }
    }

    // Ensure user isn't automatically signed in after signup
    if (data.session) {
      await supabase.auth.signOut()
    }

    // Create default subscription for new users
    if (data.user) {
      try {
        await createDefaultSubscription(data.user.id, supabase)
      } catch (subscriptionError) {
        console.error("Subscription creation failed:", subscriptionError)
        // Don't fail the signup for subscription errors
      }
    }

    return {
      success: true,
      message:
        "Account created successfully! Please check your email to verify your account.",
      redirectTo: "/sign-up/verify",
    }
  } catch (error) {
    console.error("signUpAction error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export const checkEmailExistsAction = async (formData: FormData) => {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  try {
    const supabase = await createClient()

    // Use a dummy random strong password to probe auth without revealing existence
    const dummyPassword = `__dummy_${Math.random().toString(36).slice(2)}A!9`

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: dummyPassword,
    })

    const msg = authError?.message || ""

    // If there's no error, somehow the dummy password worked (very unlikely)
    if (!authError) {
      return { exists: true }
    }

    const lower = msg.toLowerCase()

    // Email exists but password is wrong
    if (
      lower.includes("invalid login credentials") ||
      lower.includes("invalid email or password")
    ) {
      return { exists: true }
    }

    // Email exists but not confirmed
    if (lower.includes("email not confirmed")) {
      return { exists: true, unconfirmed: true }
    }

    // Captcha-related issues: assume email exists
    if (
      lower.includes("captcha") ||
      lower.includes("verification") ||
      lower.includes("challenge")
    ) {
      console.log(
        "Captcha-related error during email check, assuming email exists:",
        msg
      )
      return { exists: true }
    }

    // Email not found cases
    if (
      lower.includes("user not found") ||
      lower.includes("no user") ||
      lower.includes("email not found") ||
      lower.includes("invalid email")
    ) {
      return { exists: false }
    }

    // For any unhandled error, log it and return a generic error
    console.log("Unhandled auth error during email check:", msg)
    return { error: "Could not verify email" }
  } catch (error) {
    console.error("checkEmailExistsAction error:", error)
    return { error: "Could not verify email" }
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const hcaptchaToken = formData.get("hcaptcha_token")?.toString()

  // Early validation
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken: hcaptchaToken,
      },
    })

    if (error) {
      const mapped = mapSupabaseAuthError(error.message)
      return { error: mapped.message, errorCode: mapped.code }
    }

    return {
      success: true,
      message: "Sign in successful",
    }
  } catch (error) {
    console.error("signInAction error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export const forgotPasswordAction = async (formData: FormData) => {
  // Extract fields
  const email = (formData.get("email") as string | null)?.trim()
  const hcaptchaToken = (
    formData.get("hcaptcha_token") as string | null
  )?.trim()

  // Basic validation
  if (!email) return { error: "Email is required" }
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!EMAIL_REGEX.test(email))
    return { error: "Please enter a valid email address" }

  if (!hcaptchaToken) return { error: "Captcha is required" }

  try {
    const supabase = await createClient()

    // Direct redirect to reset-password page
    const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "")
    const redirectTo = origin ? `${origin}/reset-password` : "/reset-password"

    console.log("🔗 Password reset redirect URL:", redirectTo)
    console.log("🌐 Origin:", origin)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
      captchaToken: hcaptchaToken,
    })

    if (error) {
      console.error("❌ resetPasswordForEmail error:", error)

      const msg = (error.message || "").toLowerCase()
      if (msg.includes("rate") || msg.includes("too many")) {
        return {
          error: "Too many reset attempts. Please wait before trying again.",
          code: "rate_limited",
        }
      }
      if (msg.includes("captcha")) {
        return {
          error: "Captcha verification failed. Please try again.",
          code: "captcha_failed",
        }
      }

      // For security, do not reveal whether the email exists
      return {
        success: true,
        message:
          "If an account with this email exists, we've sent you a password reset link.",
      }
    }

    // Success
    return {
      success: true,
      message:
        "If an account with this email exists, we've sent you a password reset link.",
    }
  } catch (error) {
    console.error("forgotPasswordAction error:", error)
    return {
      success: true,
      message:
        "If an account with this email exists, we've sent you a password reset link.",
    }
  }
}

export const signOutAction = async () => {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()

    return {
      success: true,
      message: "Signed out successfully",
      redirectTo: "/sign-in",
    }
  } catch (error) {
    console.error("signOutAction error:", error)
    return { error: "Could not sign out. Please try again." }
  }
}

export const upgradeSubscriptionAction = async (formData: FormData) => {
  try {
    const planId = formData.get("plan_id")?.toString()
    const userId = formData.get("user_id")?.toString()

    if (!planId || !userId) {
      return {
        error: "Invalid upgrade request. Please try again.",
        code: "invalid_request",
      }
    }

    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user || user.id !== userId) {
      return {
        error: "Please sign in to upgrade your subscription.",
        code: "authentication_required",
        redirectTo: "/sign-in",
      }
    }

    // Check if user already has an active subscription
    const { data: existingSubscription, error: subError } = await supabase
      .from("subscriptions")
      .select("id, tier, status")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle()

    if (subError) {
      console.error("Error checking subscription:", subError)
      return {
        error: "Unable to verify your current subscription. Please try again.",
        code: "subscription_check_failed",
      }
    }

    // Prevent downgrade to free tier
    if (planId === "free" && existingSubscription?.tier !== "free") {
      return {
        error: "To cancel your subscription, please contact our support team.",
        code: "downgrade_not_allowed",
      }
    }

    // Prevent upgrading to the same tier
    if (existingSubscription?.tier === planId) {
      return {
        error: "You're already on this plan.",
        code: "same_tier",
      }
    }

    // Here you would integrate with Stripe or your payment provider
    // For now, return a success message with next steps
    return {
      success: true,
      message: "Redirecting to checkout...",
      checkoutUrl: `/checkout?plan=${planId}&user=${userId}`,
    }
  } catch (error) {
    console.error("upgradeSubscriptionAction error:", error)
    return {
      error:
        "We encountered an unexpected issue processing your upgrade. Please try again in a few moments.",
      code: "unexpected_error",
    }
  }
}
