# 🎧💻 Third Generation Studios — Official Platform

Welcome to **Third Generation Studios** — a next-generation creative technology platform combining **web development**, **music production**, and **creator tools**.  
We build digital experiences, develop modern web applications, and produce music content for artists, creators, and brands.

---

## 🌐 Live Platforms

> **Website:** https://thirdgenerationstudios.com  
> _(Currently evolving — full relaunch in progress)_

---

## 🚀 What We Do

Third Generation Studios provides a hybrid ecosystem of creative and technical services:

### **🎶 Music Production & Streaming**

- Music production for artists across genres
- Remixes, original tracks & sound design
- Curated streaming, mixes, and future releases
- AI-assisted music tools (coming soon)

### **💻 Web & App Development**

- Full-stack app development (Next.js, Supabase, React Native, Node.js)
- AI-powered tools and interactive user experiences
- UX/UI design systems for startups & creators
- Custom dashboards, media platforms, and digital products

### **🧠 AI-Driven Creative Tech (In Development)**

- AI text-to-image generation for music & media
- Smart e-reader with highlight-to-image generation
- AI-powered music analytics & social discovery platform

---

## 🏗️ Tech Stack (Current + In-Progress)

| Area     | Tools                                        |
| -------- | -------------------------------------------- |
| Frontend | Next.js, React, Tailwind CSS                 |
| Backend  | Supabase, Node.js, PostgreSQL                |
| Mobile   | React Native                                 |
| AI/ML    | OpenAI, custom prompt & generation pipelines |
| Design   | Figma, Framer, Adobe Suite, FL Studio        |

---

## 📍 Roadmap (2025)

- ✅ Core platform + Dev environment setup
- 🚧 Music streaming mini-platform
- 🚧 AI reader app with text-to-image generation
- 🔥 Creator dashboards & fan engagement tools
- 🎤 Digital releases + Artist collaboration portal

---

## 👤 Creator

Built by **Adrian Henry** & **Sahil Khan**  
Full-stack developers • Music producers • Founder & Co-founder of Third Generation Studios

---

## 🤝 Contact & Social

| Platform  | Link                                    |
| --------- | --------------------------------------- |
| Website   | https://thirdgenerationstudios.com      |
| Email     | *adrianhenry2115@gmail.com*             |
| Instagram | *https://www.instagram.com/adrhenners/* |
| GitHub    | *https://github.com/AdrianHenry15*      |

---

### 📄 License

© 2025 Third Generation Studios. All rights reserved.

## Promo site setup

Use Node 22. Run `npm ci` to install the locked dependencies and `npm run build` to verify the production build.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend key for the existing contact form. |
| `TGS_CONTACT_FROM` | Verified sender for contact notifications and confirmations. |
| `TGS_CONTACT_TO` | TGS inbox for new inquiries. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 measurement ID. Mark `generate_lead` as a key event after testing a delivered inquiry. |
| `GOOGLE_SITE_VERIFICATION` | Optional meta verification for a Search Console URL-prefix property. |
| `STUDIO_SESSIONS_SPOTIFY_URL` | Public Spotify playlist URL for Studio Sessions Tryouts. |

Verify the Search Console Domain property through DNS, then submit `https://www.thirdgenerationstudios.com/sitemap.xml` and inspect the homepage, Services, and Eckert Golf case study. The canonical hostname is `www.thirdgenerationstudios.com`.

The contact form continues to use `POST /api/contact` and Resend. Test both the team notification and the sender confirmation on the deployed site. If CoffeeShop CRM intake is added later, connect the validated submission server-side through that route. Website Manager is introduced on the Website Care page as coming soon.
