# YOR Speciality Coffee

A bilingual, mobile-first showcase site for YOR Speciality Coffee in Mansoura, Egypt. The site is informational only: visitors can browse the menu, call, get directions, and open Instagram. There is no ordering, cart, checkout, or payment flow.

## Setup

```bash
pnpm install
pnpm dev
```

## Edit the menu

The structured menu source is `data/menu.json`. Update names, Arabic names, categories, descriptions, tags, and EGP prices there. The current UI renders the same data shape directly in `components/yor-site.tsx`; move the array import to `data/menu.json` when wiring the data source into the component.

## Useful routes

- `/` — bilingual home, origins, menu teaser, take-away information, and visit section.
- `/menu` — standalone, fast menu page for Instagram bios and QR codes.

## Before launch

- Replace the placeholder phone number `+201000000000` with the cafe number.
- Replace the Google Maps query with the verified business listing.
- Swap public image URLs for local optimized assets in `public/images` if desired.
- Add a generated favicon and OpenGraph image from the final YOR logo.
- Confirm Arabic font loading and final translations with the owner.

## QR code

Generate a QR code that points to the deployed `/menu` URL, then print it for tables and packaging. The menu page is intentionally display-only and has no ordering controls.

## Future extensions

Ordering, reservations, CMS editing, inventory, or payments can be added later behind the current structured menu data without changing the visual menu contract. Any future ordering flow should be implemented as a separate authenticated/server-backed feature rather than reintroducing client-only cart state.
