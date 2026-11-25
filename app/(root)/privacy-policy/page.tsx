import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata } from "@/features/marketing/site";

const description = "How Third Generation Studios handles information collected through its marketing website.";

const headingClass = "mb-2 text-xl font-semibold text-white";

export const metadata = pageMetadata("/privacy-policy", "Privacy Policy", description);

export default function PrivacyPolicyPage() {
    return (
        <DetailPage title="Privacy Policy" intro={description}>
            <p className="text-sm text-gray-400">
                Effective <time dateTime="2026-11-25">November 25, 2026</time>
            </p>

            <section aria-labelledby="information-we-collect">
                <h2 id="information-we-collect" className={headingClass}>
                    Information we collect
                </h2>
                <p>
                    When you submit an inquiry, we receive the information you provide, including your name, email address, company, service
                    interest, budget range, and project details. We use it to respond, discuss your project, and follow up about your
                    inquiry.
                </p>
                <p className="mt-3">
                    We also use technical information to operate and protect the site and understand how people use it. This may include
                    browser and device information, pages visited, and interactions with the site.
                </p>
            </section>

            <section aria-labelledby="analytics-and-cookies">
                <h2 id="analytics-and-cookies" className={headingClass}>
                    Google Analytics and cookies
                </h2>
                <p>
                    We use Google Analytics to understand how visitors find and use the site and to measure successful inquiries. Google
                    Analytics may use cookies or similar identifiers and process information such as page URLs, device and browser
                    information, and site interactions. Our inquiry event records that a submission succeeded without sending the contents
                    of the form with that event.
                </p>
                <p className="mt-3">
                    You can manage cookies in your browser settings. Learn more about{" "}
                    <a href="https://policies.google.com/technologies/partner-sites">
                        how Google uses information from sites that use its services
                    </a>{" "}
                    and Google’s <a href="https://tools.google.com/dlpage/gaoptout">Analytics opt-out add-on</a>.
                </p>
            </section>

            <section aria-labelledby="service-providers">
                <h2 id="service-providers" className={headingClass}>
                    Service providers and external sites
                </h2>
                <p>
                    We use Vercel to host the site, Resend to deliver inquiry emails, and Cloudflare Turnstile to protect the contact form
                    from spam. Turnstile may process browser or device signals to verify a submission. See{" "}
                    <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Cloudflare’s Turnstile Privacy Addendum</a>.
                </p>
                <p className="mt-3">
                    This site links to external services, including Cal.com for booking and Spotify for Studio Sessions. Those services
                    describe their own data practices in their privacy policies. We may also disclose information when required by law.
                </p>
            </section>

            <section aria-labelledby="retention-and-choices">
                <h2 id="retention-and-choices" className={headingClass}>
                    Retention and your choices
                </h2>
                <p>
                    We keep inquiry information as needed to respond, follow up, and maintain relevant business records. To ask about your
                    information or request access, correction, or deletion, email{" "}
                    <a href="mailto:ahenry@thirdgenerationstudios.com">ahenry@thirdgenerationstudios.com</a>.
                </p>
                <p className="mt-3">
                    You can also call Third Generation Studios at <a href="tel:+14076309320">(407) 630-9320</a>.
                </p>
            </section>

            <section aria-labelledby="policy-changes">
                <h2 id="policy-changes" className={headingClass}>
                    Changes to this policy
                </h2>
                <p>We’ll post updates on this page and revise the effective date.</p>
            </section>
        </DetailPage>
    );
}
