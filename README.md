# Team New Sun Foundation — REST API

Backend service for **Team New Sun Foundation (TNSF)**, supporting member management, contributions, donations, feedback, queries, authentication, and payment processing for the organization's web platform.

The service is implemented as a Node.js/Express monolith with MongoDB persistence and integrations for Cloudinary, Mailgun, Razorpay, and PDF/receipt generation.

## Features

* **Authentication & Authorization** — signup with OTP verification, signin, persistent authentication, password recovery, JWT-based authorization, and admin access control.
* **Member Management** — manage member profiles, profile images, membership status, and member information.
* **Contributions** — record and retrieve member contributions with payment and end-date information.
* **Donations** — accept and persist donation requests.
* **Online Payments** — create Razorpay payment orders, verify payments, and handle Razorpay webhooks.
* **Administration** — admin-only endpoints for viewing members, contributions, and donations.
* **Media Management** — Cloudinary-based image uploads.
* **Email Communication** — Mailgun-backed email workflows.
* **Receipt Generation** — generate PDF receipts using `pdf-lib`.
* **Security** — Helmet, CORS, request validation, JWT authorization, password hashing, and structured middleware.

## Tech Stack

| Layer          | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js 20+        |
| Framework      | Express 4          |
| Database       | MongoDB + Mongoose |
| Authentication | JWT + bcrypt       |
| Validation     | express-validator  |
| Payments       | Razorpay           |
| Media          | Cloudinary         |
| Email          | Mailgun            |
| Documents      | pdf-lib            |
| Security       | Helmet, CORS       |
| Logging        | Morgan             |

## Architecture

```text
                        ┌──────────────────┐
                        │      Client      │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ Express Server   │
                        └────────┬─────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
       ┌───────────┐       ┌────────────┐      ┌───────────┐
       │  Routers  │       │ Middleware │      │Controllers│
       └───────────┘       └────────────┘      └─────┬─────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │   Mongoose   │
                                              │    Models    │
                                              └──────┬───────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │    MongoDB   │
                                              └──────────────┘

                       External Integrations
                              │
              ┌───────────────┼────────────────┐
              ▼               ▼                ▼
          Razorpay        Cloudinary         Mailgun
```

## API Overview

| Route            | Purpose                     |
| ---------------- | --------------------------- |
| `/`              | API root / health response  |
| `/members`       | Member management           |
| `/contributions` | Contribution management     |
| `/feedbacks`     | Feedback operations         |
| `/queries`       | User queries                |
| `/payments`      | Razorpay payment operations |
| `/donate`        | Donation operations         |
| `/admin`         | Administrative operations   |

### Authentication

```http
POST /signup
POST /signup-verify
POST /signin
GET  /authenticate
POST /forgot-password
POST /forgot-password-verify
POST /reset-password
```

### Members

```http
GET    /members/:id
PUT    /members/:id
PUT    /members/:id/image
DELETE /members/:id
```

### Contributions

```http
GET  /contributions
POST /contributions
```

### Donations

```http
POST /donate
```

### Payments

```http
POST /payments/order
POST /payments/verify
POST /payments/razorpay/webhook
```

### Administration

```http
GET /admin/allDonation
GET /admin/allMember
GET /admin/allContribution
```

Protected endpoints require authorization, while administrative endpoints additionally require admin privileges.
