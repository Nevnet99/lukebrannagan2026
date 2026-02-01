# Luke Brannagan | Senior Frontend Engineer Portfolio

![System Status](https://img.shields.io/badge/System_Status-Online-4ade80?style=flat-square)
![Astro](https://img.shields.io/badge/Built_with-Astro-orange?style=flat-square&logo=astro)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8?style=flat-square&logo=tailwindcss)

A high-performance personal portfolio built with **Astro** and **React**, modeled after a terminal/system interface. This project emphasizes clean architecture, accessibility (a11y), and privacy-first observability.

## ⚡️ Key Features

* **Privacy-First Analytics:** Custom-built Cookie Consent integrating **PostHog** with strict GDPR compliance (Opt-in only).
* **High Performance:** Statically generated (SSG) for 100/100 Lighthouse scores.
* **Strict CSP:** configured `Content-Security-Policy` for production security.

## 🛠 Tech Stack

* **Core:** [Astro 5.0](https://astro.build/)
* **Styling:** Tailwind CSS + Lucide Icons
* **Scripting:** TypeScript
* **State:** Nano Stores / LocalStorage
* **Telemetry:** PostHog (Analytics)

## 📂 Architecture

The project follows a domain-driven structure to keep the codebase modular and maintainable.

```text
src/
├── components/         # Reusable UI components
│   ├── UI/             # Composite components (Navbar, Projects, CommandPalette)
│   ├── DS/             # Design System primitives (Avatar, Tag, Button)
│   └── Structure/      # Layout containers (PageSection, Grid)
├── layouts/            # Page layouts (BaseLayout)
├── pages/              # File-based routing
└── utils/              # Pure helper functions
