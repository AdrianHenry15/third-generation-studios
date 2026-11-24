import DetailPage from "@/features/marketing/detail-page";
import { pageMetadata } from "@/features/marketing/site";

const description = "Contact Third Generation Studios for help accessing this website.";
export const metadata = pageMetadata("/accessibility", "Accessibility", description);

export default function AccessibilityPage() {
    return (
        <DetailPage title="Accessibility" intro="We want visitors to be able to use the TGS website and get in touch with us.">
            <p>If you run into a barrier, email <a href="mailto:ahenry@thirdgenerationstudios.com">ahenry@thirdgenerationstudios.com</a> with the page address and what you were trying to do.</p>
        </DetailPage>
    );
}
