import Link from "next/link";
import {
    ArrowRight,
    Check,
    Code2,
    Cuboid,
    Database,
    Gamepad2,
    Gauge,
    Layers3,
    Music2,
    Palette,
    Users,
    Workflow,
    type LucideIcon,
} from "lucide-react";

type PrimaryService = {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
    features: string[];
    href: string;
};

type SupportingService = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const primaryServices: PrimaryService[] = [
    {
        eyebrow: "Web design & development",
        title: "Websites built to do more than look good.",
        description:
            "We design fast, responsive websites and web applications around your brand, your customers, and the actions that grow your business.",
        icon: Code2,
        features: [
            "Custom website design",
            "Responsive development",
            "E-commerce and payments",
            "Booking and lead-generation flows",
            "SEO and performance foundations",
            "Ongoing support and improvements",
        ],
        href: "/contact?service=web-design",
    },
    {
        eyebrow: "CRM & business systems",
        title: "One system for the work behind your business.",
        description:
            "We build custom CRM platforms that replace scattered spreadsheets and disconnected tools with one workflow designed for your team.",
        icon: Database,
        features: [
            "Lead and customer management",
            "Estimates, invoices, and payments",
            "Scheduling and job tracking",
            "Email and workflow automation",
            "Dashboards and reporting",
            "Role-based team access",
        ],
        href: "/contact?service=crm",
    },
];

const supportingServices: SupportingService[] = [
    {
        title: "Graphic Design",
        description: "Brand graphics, marketing assets, social content, and interface visuals that keep your business consistent.",
        icon: Palette,
    },
    {
        title: "Music & Audio",
        description: "Original music, sound design, mixing, and audio created for brands, games, videos, and digital experiences.",
        icon: Music2,
    },
    {
        title: "Unity Development",
        description: "Interactive prototypes, product experiences, visualizers, and game development using Unity.",
        icon: Gamepad2,
    },
    {
        title: "3D Modeling",
        description: "Custom 3D assets and visual concepts for products, environments, animation, and interactive media.",
        icon: Cuboid,
    },
];

const advantages = [
    {
        title: "Built around your workflow",
        description: "Your business should shape the technology—not the other way around.",
        icon: Workflow,
    },
    {
        title: "Designed for real people",
        description: "Every screen is made to feel clear for customers, staff, and administrators.",
        icon: Users,
    },
    {
        title: "Ready to grow",
        description: "We create flexible foundations that can expand as your needs change.",
        icon: Layers3,
    },
    {
        title: "Performance matters",
        description: "Fast load times and thoughtful architecture are part of the product—not extras.",
        icon: Gauge,
    },
];

const process = [
    {
        number: "01",
        title: "Discover",
        description: "We learn how your business works, where friction exists, and what success should look like.",
    },
    {
        number: "02",
        title: "Design",
        description: "We map the experience and establish a visual direction before development begins.",
    },
    {
        number: "03",
        title: "Build",
        description: "We develop, test, and refine the product with clear checkpoints along the way.",
    },
    {
        number: "04",
        title: "Launch & support",
        description: "We handle deployment and remain available for improvements, maintenance, and future phases.",
    },
];

export default function ServicesPage() {
    return (
        <main className="overflow-hidden bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
            {/* Hero */}
            <section className="relative isolate border-b border-gray-200 dark:border-white/10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                    <div className="max-w-4xl">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
                            Third Generation Studios · Services
                        </p>

                        <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                            Digital tools built for the way your business works.
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
                            We specialize in custom websites and CRM systems, supported by creative services that help businesses build a
                            complete digital presence.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 dark:hover:bg-violet-400"
                            >
                                Start a project
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>

                            <Link
                                href="/#work"
                                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-3.5 text-sm font-semibold transition hover:border-gray-950 hover:bg-gray-50 dark:border-white/20 dark:hover:border-white dark:hover:bg-white/5"
                            >
                                View our work
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Primary services */}
            <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">What we do best</p>

                    <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Your website brings people in. Your CRM keeps everything moving.
                    </h2>

                    <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
                        These services can stand alone or work together as one connected system—from the first customer visit to the final
                        completed job.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {primaryServices.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-50 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-950/10 sm:p-10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:shadow-black/30"
                            >
                                <div
                                    className={`absolute inset-x-0 top-0 h-1 ${
                                        index === 0
                                            ? "bg-gradient-to-r from-violet-500 to-blue-500"
                                            : "bg-gradient-to-r from-blue-500 to-cyan-400"
                                    }`}
                                />

                                <div className="flex size-12 items-center justify-center rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                                    <Icon className="size-5" aria-hidden="true" />
                                </div>

                                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
                                    {service.eyebrow}
                                </p>

                                <h3 className="mt-3 text-3xl font-semibold tracking-tight">{service.title}</h3>

                                <p className="mt-5 leading-7 text-gray-600 dark:text-gray-400">{service.description}</p>

                                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                                                <Check className="size-3" aria-hidden="true" />
                                            </span>

                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={service.href}
                                    className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-950 transition-colors hover:text-violet-600 dark:text-white dark:hover:text-violet-400"
                                >
                                    Discuss this service
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Why TGS */}
            <section className="border-y border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.025]">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                                The TGS approach
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Creative thinking backed by practical development.
                            </h2>
                        </div>

                        <div className="grid gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
                            {advantages.map((advantage) => {
                                const Icon = advantage.icon;

                                return (
                                    <div key={advantage.title} className="bg-white p-7 dark:bg-gray-950">
                                        <Icon className="size-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />

                                        <h3 className="mt-5 font-semibold">{advantage.title}</h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{advantage.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Supporting creative services */}
            <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                            Creative capabilities
                        </p>

                        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">More ways to bring the idea to life.</h2>
                    </div>

                    <p className="max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400">
                        Available as standalone work or as part of a larger website, application, or brand experience.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {supportingServices.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="rounded-3xl border border-gray-200 p-7 transition duration-300 hover:border-violet-300 hover:bg-violet-50/40 dark:border-white/10 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/5"
                            >
                                <Icon className="size-6 text-violet-600 dark:text-violet-400" aria-hidden="true" />

                                <h3 className="mt-7 text-lg font-semibold">{service.title}</h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{service.description}</p>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Process */}
            <section className="bg-gray-950 text-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">How we work</p>

                        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A clear path from concept to launch.</h2>
                    </div>

                    <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map((step) => (
                            <article key={step.number}>
                                <p className="font-mono text-sm text-violet-400">{step.number}</p>

                                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>

                                <p className="mt-3 text-sm leading-6 text-gray-400">{step.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden rounded-[2rem] bg-violet-600 px-7 py-16 text-white sm:px-12 lg:flex lg:items-end lg:justify-between lg:px-16">
                    <div className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-blue-400/35 blur-3xl" />
                    <div className="absolute -bottom-32 left-1/3 -z-10 size-80 rounded-full bg-fuchsia-500/30 blur-3xl" />

                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">Have something in mind?</p>

                        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let’s build something useful.</h2>

                        <p className="mt-5 max-w-xl leading-7 text-violet-100">
                            Tell us what you are trying to improve, launch, or simplify. We will help identify the right place to start.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="mt-9 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-600 lg:mt-0"
                    >
                        Tell us about your project
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
