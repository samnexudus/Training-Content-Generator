# Nexudus Product Context — Reference for Content Generation

## What is Nexudus?

Nexudus is the leading management platform for flexible workspace operators (coworking spaces, serviced offices, innovation hubs). It provides:

- **Admin Panel** — web-based back-office for space operators/admins
- **Members Portal** — web-based self-service portal for members/customers
- **NexBoard** — tablet companion app for resource display and bookings
- **NexDelivery** — app for registering and managing parcel/mail deliveries
- **Nexudus API** — full REST API for integrations

## Key User Roles

| Role | Description |
|------|-------------|
| Space Owner | Full access, billing, subscription settings |
| Full Unrestricted Admin | Full access to Admin Panel, no billing |
| Admin | Standard admin access |
| Member / Customer | End-user, accesses Members Portal and apps |
| Contact | Non-paying person associated with a member company |

## Core Product Areas

### Admin Panel Sections
- **CRM** — Customers, contacts, identity checks, opportunities
- **Operations** — Bookings, deliveries, check-ins, invoices
- **Inventory** — Plans, products, resources, desks, offices
- **Settings** — General settings, companion apps, integrations, subscription
- **Reports** — Adoption rate, revenue, usage analytics

### Key Features Referenced in Training Content
- **Plans** — Membership plans (hot desk, dedicated desk, private office, virtual office)
- **Resources** — Bookable rooms and spaces
- **NexBoard** — Companion app for resource display
- **Virtual Offices (VO)** — Paid feature (€/£/$ 50 for 10 mailboxes/month)
- **Bulk Imports** — Data import tool for onboarding (customers, products, invoices)
- **Adoption Rate / Checkout flow** — Analytics showing explicit vs implicit check-ins
- **Global Resource Rules** — Rules controlling resource availability by location/combination
- **Booker Check-ins** — Check-in functionality within the Booker interface
- **Events** — Event management and ticketing

### Companion Apps
- **NexBoard** — Settings > Companion Apps > NexBoard
- **NexDelivery** — Delivery management

### Integrations
- **Stripe** — Payments and identity verification (Stripe Identity)

## Navigation Path Conventions

Always write navigation paths as: **Section > Sub-section > Page**
- Bold the entire path
- Use `>` as separator
- Match exact label as shown in the product UI

Examples:
- **Settings > Companion Apps > NexBoard**
- **Settings > Your Nexudus subscription**
- **CRM > Identity Checks**
- **Operations > Bookings**
- **Operations > Deliveries**
- **Inventory > Products**

## Pricing Context

- Virtual Offices: €/£/$ 50 for 10 mailboxes/month; +€/£/$ 5 per additional mailbox
- Global Branding (legacy feature): £750 fee mentioned in older updates
- Always use €/£/$ multi-currency format when citing prices (unless a specific currency is confirmed)

## Product Update Timing

- Most updates released as part of a sprint cycle
- Some updates marked "TO BE POSTED BEFORE THE RELEASE"
- Quarterly training content reviews; out-of-cycle for important features

## Common Terminology

| Term | Meaning |
|------|---------|
| AP | Admin Panel |
| MP | Members Portal |
| VO | Virtual Office |
| CRM | Customer Relationship Management section |
| Plan | Membership plan |
| Resource | Bookable room or space |
| Check-in | Confirming attendance / use of a booking |
| Beneficiary | Company director on a VO plan (must pass identity check) |
| Nominated recipient | Person who can receive post under VO (no identity check needed) |
| Adoption Rate | % of members who checked in explicitly vs implicitly |

## Brand Voice Principles

- **Clear and direct** — no ambiguity, no jargon beyond standard product terms
- **Instructional** — step-by-step guidance, action-oriented
- **Consistent** — always use exact product UI labels
- **Friendly but professional** — internal team tone, not formal corporate
- **Concise** — every word earns its place
- **Inclusive** — use "space operators", "members", not gendered terms
