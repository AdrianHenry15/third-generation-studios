import { IFeatureProps } from "@/components/layout/plans/available-plans/plan";
// Icons
import {
    MdAccountBalance,
    MdAttachMoney,
    MdFilterListAlt,
    MdFormatIndentIncrease,
    MdMobileFriendly,
    MdOutlineEmail,
    MdOutlineInventory2,
    MdOutlineSecurity,
    MdPayments,
} from "react-icons/md";
import { FaDownload, FaRecycle, FaRegUserCircle, FaSearchengin } from "react-icons/fa";
import { GrHost, GrHostMaintenance, GrMoney } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { IoShareSocial, IoSpeedometerOutline } from "react-icons/io5";
import { FcSupport } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { CiMoneyBill } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";

export const StudioBasicFeatures: IFeatureProps[] = [
    {
        icon: <MdMobileFriendly color="green" />,
        feature: "Responsive Design",
        description: "Your site will look great on all devices, including desktop, tablet, and mobile",
    },
    {
        icon: <FaSearchengin color="green" />,
        feature: "Basic SEO Optimization",
        description: "Improve visibility on search engines with foundational SEO practices",
    },
    {
        icon: <FaDownload color="green" />,
        feature: "Standard Performance Optimization",
        description: "Faster load times to enhance user experience and retention",
    },
    {
        icon: <GrHost color="green" />,
        feature: "One Year Hosting Support",
        description: "Reliable hosting and basic support for a full year",
    },
    {
        icon: <RiPagesLine color="green" />,
        feature: "Up to 3 pages",
        description: "Essential pages like Home, About, and Services",
    },
    {
        icon: <IoShareSocial color="green" />,
        feature: "Social Media Integration",
        description: "Seamless integration with social media platforms like Facebook, Instagram, and Twitter",
    },
];

export const StudioPlusFeatures: IFeatureProps[] = [
    {
        icon: <FaRecycle color="green" />,
        feature: "All Studio Basic Features",
        description: "Includes everything in the Studio Basic plan for a strong foundation",
    },
    {
        icon: <FaSearchengin color="green" />,
        feature: "Advanced SEO Optimization",
        description: "Enhanced SEO to improve search engine ranking and drive more organic traffic",
    },
    {
        icon: <IoSpeedometerOutline color="green" />,
        feature: "Performance & Speed Boost",
        description: "Advanced optimization for faster page loading and improved user experience",
    },
    {
        icon: <MdFormatIndentIncrease color="green" />,
        feature: "Customizable Forms",
        description: "Custom forms for lead generation, feedback, or subscriptions, tailored to your business needs",
    },
    {
        icon: <RiPagesLine color="green" />,
        feature: "Up to 5 Pages",
        description: "Assistance with updating content, images, or minor changes monthly",
    },
    {
        icon: <FcSupport color="green" />,
        feature: "Monthly Content Update Support",
        description: "Expand your website with additional pages for services, testimonials, or portfolios",
    },
];

export const StudioProFeatures: IFeatureProps[] = [
    {
        icon: <FaRecycle color="green" />,
        feature: "All Studio Plus Features",
        description: "Includes everything in Studio Basic and Studio Plus for a comprehensive setup",
    },
    {
        icon: <IoIosLogIn color="green" />,
        feature: "User Authentication",
        description: "Secure login and account management, ideal for member-exclusive content or user profiles",
    },
    {
        icon: <MdOutlineEmail color="green" />,
        feature: "Advanced Email Marketing & Automation",
        description: "Integrated email automation for customer onboarding, retention, and engagement campaigns",
    },
    {
        icon: <CiMoneyBill color="green" />,
        feature: "E-commerce Ready",
        description: "Support for product listings, inventory management, and an integrated shopping cart (excludes payment processing)",
    },
    {
        icon: <RiPagesLine color="green" />,
        feature: "Up to 10 Pages",
        description: "More pages for expanded offerings, such as product catalogs, case studies, or landing pages",
    },
    {
        icon: <MdOutlineSecurity color="green" />,
        feature: "Enhanced Security Features",
        description: "SSL encryption, firewall integration, and regular security audits for data protection",
    },
    {
        icon: <GrHostMaintenance color="green" />,
        feature: "Priority Support & Maintenance",
        description: "Fast-track support with priority for troubleshooting, monthly updates, and maintenance",
    },
    {
        icon: <FaSearchengin color="green" />,
        feature: "Premium SEO & Content Strategy Consultation",
        description: " In-depth SEO setup and ongoing strategy recommendations to boost visibility and engagement",
    },
    {
        icon: <IoSpeedometerOutline color="green" />,
        feature: "Advanced Performance Optimization",
        description: "Top-tier performance enhancements, including caching, image optimization, and code minification for maximum speed",
    },
];

export const StudioCommerceFeatures: IFeatureProps[] = [
    {
        icon: <FaRecycle color="green" />,
        feature: "All Studio Pro Features",
        description: "Includes everything in Studio Basic, Studio Plus, and Studio Pro, plus enhanced e-commerce capabilities",
    },
    {
        icon: <MdPayments color="green" />,
        feature: "Integrated Payment Processing (Square)",
        description:
            "Secure payment processing with Square, including setup and support for credit card, digital wallet, and local payment options",
    },
    {
        icon: <MdAttachMoney color="green" />,
        feature: "Full E-Commerce Functionality",
        description: "Product catalog, shopping cart, checkout process, and order management for seamless online sales",
    },
    {
        icon: <MdOutlineInventory2 color="green" />,
        feature: "Inventory & Stock Management",
        description: "Real-time inventory tracking and management tools to monitor product levels and avoid stockouts",
    },
    {
        icon: <AiOutlineShoppingCart color="green" />,
        feature: "Abandoned Cart Recovery",
        description: "Automated email reminders for customers who leave items in their cart, helping to boost conversions",
    },
    {
        icon: <FaRegUserCircle color="green" />,
        feature: "Customer Accounts & Order History",
        description: "Customer login area with access to order history, wish lists, and saved items",
    },
    {
        icon: <MdFilterListAlt color="green" />,
        feature: "Advanced Product Filtering and Search",
        description: "Enhanced search and filtering options to help customers find products by categories, sizes, colors, etc",
    },
    {
        icon: <GrMoney color="green" />,
        feature: "Sales Tax and Shipping Calculations",
        description: "Real-time sales tax calculation and customizable shipping options to streamline the checkout experience",
    },
    {
        icon: <TbMoneybag color="green" />,
        feature: "Promotions & Discount Management",
        description: "Create discount codes, seasonal sales, and special promotions directly from the website",
    },
    {
        icon: <MdAccountBalance color="green" />,
        feature: "Priority Support with Dedicated Account Manager",
        description: "Access to priority support with a dedicated account manager for ongoing assistance and strategy",
    },
];
