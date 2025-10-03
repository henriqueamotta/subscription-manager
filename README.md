# Subscription Manager

A full-stack web application designed to provide a centralized and intuitive way to manage recurring digital subscriptions, offering clear insights into spending habits.

## The Problem

In the current digital landscape, with dozens of services like streaming, software, and news, people easily lose track of their subscriptions. This leads to unexpected expenses, payments for unused services, and difficulty in visualizing monthly and annual financial commitments.

## The Solution

Subscription Manager is a secure, user-centric platform where individuals can register, track, and analyze all their subscriptions in one place. With an interactive dashboard and data visualization, users gain a clear and immediate understanding of their spending, helping them make informed financial decisions.

---

## Key Features

-   **Secure User Authentication:** Full registration and login system using JWT (JSON Web Tokens) for secure, session-based access.
-   **Full CRUD Functionality:** Users can Create, Read, Update, and Delete their personal subscriptions.
-   **Pre-defined Service Catalog:** Subscriptions are linked to a pre-defined catalog of services (e.g., Netflix, Spotify), ensuring data consistency and enabling brand-specific features.
-   **Interactive Dashboard:** A central dashboard that calculates and displays the total monthly cost of all active subscriptions.
-   **Data Visualization:** An interactive doughnut chart (built with Chart.js) that visually represents the spending distribution across different services, including percentage-based tooltips.
-   **Professional UI/UX:** A clean, responsive, dark-themed interface built with modern CSS (Flexbox & Grid) and featuring interactive components like modals and custom-styled forms.

## Tech Stack

| Category      | Technology / Library                                       |
| ------------- | ---------------------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, React Router, Chart.js            |
| **Backend** | Node.js, Express.js                                        |
| **Database** | PostgreSQL, Prisma (ORM)                                   |
| **Auth** | JWT (jsonwebtoken), bcryptjs (Password Hashing)            |
| **Styling** | Modern CSS (Flexbox, Grid, Custom Properties)              |
| **Dev Tools** | ESLint, TypeScript                                         |

---

## Running Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/henriqueamotta/subscription-manager
    cd subscription-manager
    ```

2.  **Setup Backend:**
    ```bash
    cd server
    npm install
    ```
    -   Create a `.env` file based on `.env.example` (if you have one) and configure your PostgreSQL `DATABASE_URL`.
    -   Set a `JWT_SECRET` in your `.env` file.
    -   Run the database migrations: `npx prisma migrate dev`
    -   (Optional) Populate the services table: `npx prisma db seed`
    -   Start the server: `npm start`

3.  **Setup Frontend:**
    ```bash
    cd client
    npm install
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
