# Subscription Manager

## The Problem

In the current digital landscape, with dozens of services like streaming, software, and news, people easily lose track of their subscriptions. This leads to unexpected expenses, payments for unused services, and difficulty in visualizing monthly and annual financial commitments.

## My Solution

This project is a centralized web application that allows users to register, categorize, and monitor all their subscriptions in one place. With an intuitive dashboard, users get a clear view of their spending and receive proactive notifications about upcoming renewals, ensuring full control and aiding financial decision-making.

## Success Metrics

The success of the project will be measured by:

1.  **User Engagement:** The number of subscriptions registered per user.
2.  **Financial Impact:** A dashboard showing the total amount saved by users who canceled subscriptions after receiving a notification.
3.  **Qualitative Feedback:** User satisfaction surveys indicating ease of use and clarity of information.

## Key Features (MVP)

-   User Authentication (Sign-up and Login).
-   Full CRUD (Create, Read, Update, Delete) for subscriptions.
-   Main dashboard displaying total monthly cost and the list of subscriptions.
-   Email or in-app notifications a few days before the renewal date.

## Initial Tech Stack

-   **Frontend:** `React` with `TypeScript`. Chosen for creating reactive and component-based user interfaces, with the type safety of TypeScript to ensure code maintainability.
-   **Backend:** `Node.js` with `Express.js`. Selected for its high performance in I/O operations, robust ecosystem (NPM), and the use of JavaScript, allowing for a unified language across the entire stack.
-   **Database:** `PostgreSQL`. Chosen for its reliability, robustness for relational data (users, subscriptions), and advanced features that may be useful in the future.
