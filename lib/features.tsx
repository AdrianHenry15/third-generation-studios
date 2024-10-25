import { IFeatureProps } from "@/components/layout/plans/available-plans/plan";
// Icons
import { MdMobileFriendly } from "react-icons/md";
import { FaDownload, FaSearchengin } from "react-icons/fa";
import { GrHost } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";

export const StudioBasicFeatures: IFeatureProps[] = [
    {
        icon: <MdMobileFriendly />,
        feature: "Responsive Design",
        description: "Your site will look great on all devices, including desktop, tablet, and mobile",
    },
    {
        icon: <FaSearchengin />,
        feature: "Basic SEO Optimization",
        description: "Improve visibility on search engines with foundational SEO practices",
    },
    {
        icon: <FaDownload />,
        feature: "Standard Performance Optimization",
        description: "Faster load times to enhance user experience and retention",
    },
    {
        icon: <GrHost />,
        feature: "One Year Hosting Support",
        description: "Reliable hosting and basic support for a full year",
    },
    {
        icon: <RiPagesLine />,
        feature: "Up to 3 pages",
        description: "Essential pages like Home, About, and Services",
    },
    {
        icon: <IoShareSocial />,
        feature: "Social Media Integration",
        description: "Seamless integration with social media platforms like Facebook, Instagram, and Twitter",
    },
];

export const StudioPlusFeatures: IFeatureProps[] = [
    {
        icon: <MdMobileFriendly />,
        feature: "Standard Performance Optimization",
        description: "Faster load times to enhance user experience and retention",
    },
    {
        icon: <MdMobileFriendly />,
        feature: "Google Analytics Setup",
        description: "Track website traffic and gain insights with a Google Analytics integration",
    },
    {
        icon: <MdMobileFriendly />,
        feature: "Basic Contact Form",
        description: "Easily collect visitor inquiries with a simple, customizable contact form",
    },
];

export const StudioProFeatures: IFeatureProps[] = [
    {
        icon: <MdMobileFriendly />,
        feature: "Responsive Design",
        description: "Your site will look great on all devices, including desktop, tablet, and mobile",
    },
];

export const StudioCommerceFeatures: IFeatureProps[] = [
    {
        icon: <MdMobileFriendly />,
        feature: "Responsive Design",
        description: "Your site will look great on all devices, including desktop, tablet, and mobile",
    },
];
