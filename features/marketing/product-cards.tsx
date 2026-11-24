import Link from "next/link";

export default function ProductCards() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <p className="mb-2 text-sm font-semibold text-purple-300">Early beta</p>
                <h3 className="mb-3 text-2xl font-bold">CoffeeShop CRM</h3>
                <p className="mb-4 text-gray-300">Capture inquiries, keep track of follow-ups, and turn leads into customers.</p>
                <Link className="font-semibold text-green-300 hover:underline" href="/products/coffeeshop-crm">
                    Explore CoffeeShop CRM
                </Link>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <p className="mb-2 text-sm font-semibold text-purple-300">Coming soon</p>
                <h3 className="mb-3 text-2xl font-bold">TGS Website Manager</h3>
                <p className="mb-4 text-gray-300">
                    A client portal to request site updates, follow progress, and review completed maintenance.
                </p>
                <Link className="font-semibold text-green-300 hover:underline" href="/website-care#website-manager">
                    See what’s coming
                </Link>
            </article>
        </div>
    );
}
