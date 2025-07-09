# Elite Gamezone

Elite Gamezone is a sleek, interactive front-end web application for showcasing premium gaming products including consoles, keyboards, controllers, and accessories. The design emphasizes an immersive user experience with modern UI, filtering, and dynamic product handling via JavaScript.

---

## Frontend-Only Notice

This project is **100% frontend**. It does **not** include:
- Backend logic (e.g., authentication, payment processing, product storage)
- Database or API integration
- Persistent state management (e.g., localStorage, session handling)

All data such as products, user profiles, and orders are **mocked directly in JavaScript**. It’s built to demonstrate UI/UX flow, interaction logic, and frontend structure.

---

## Features

- Responsive Design – Works smoothly on desktop, tablet, and mobile devices.
- Dynamic Product Grid – JavaScript-driven rendering of product cards with ratings, prices, and categories.
- Search & Filter – Real-time filtering by category, sorting options (name, price, rating), and a search box.
- Modals – Login, registration, and user profile forms are implemented using modal components.
- Shopping Cart – Toggleable cart sidebar with dynamic price totals and product tracking.
- User Profile – Editable form with mock order history display.
- Newsletter Section – Styled UI for email signup (visual only).
- Mock Product Data – Static JS array simulates a real backend.

---

## Project Structure

```bash
elite-gamezone/
├── index.html          # Main HTML layout and components
├── script.js           # JS logic: product rendering, search, cart, forms
├── styles.css          # CSS styles (linked but not included in this repo)
└── README.md           # Project documentation
