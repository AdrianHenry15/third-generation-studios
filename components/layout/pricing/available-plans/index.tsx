import React from "react";
import Plan from "./plan";
import { StudioBasicFeatures, StudioPlusFeatures, StudioProFeatures, StudioCommerceFeatures } from "@/lib/features";

export default function AvailablePlans() {
  const plans = [
    { title: "Studio Basic", desc: "Get started quickly", features: StudioBasicFeatures },
    { title: "Studio Plus", desc: "Enhanced tools & email services", features: StudioPlusFeatures },
    { title: "Studio Pro", desc: "Full auth & advanced integrations", features: StudioProFeatures },
    { title: "Studio Commerce", desc: "Complete e-commerce platform", features: StudioCommerceFeatures, popular: true },
  ];

  return (
    <section id="plans" className="py-16">
      <h2 className="text-center text-white text-3xl sm:text-4xl font-bold mb-12">Available Plans</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {plans.map((p) => (
          <Plan key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}