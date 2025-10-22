export async function verifyHCaptcha(token: string): Promise<{ success: boolean; [key: string]: any }> {
    const secret = process.env.HCAPTCHA_SECRET as string;
    if (!secret) {
        return { success: false, error: "hCaptcha secret not configured." };
    }
    const res = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${token}&secret=${secret}`,
    });
    const data = await res.json();
    return data;
}

export async function verifyHCaptchaClient(token: string): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch("/api/hcaptcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });
        return await res.json();
    } catch {
        return { success: false, error: "hCaptcha verification failed. Please try again." };
    }
}
