# CLO-SET Product Listing App

This is a responsive product listing web app built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Redux (no Toolkit)**. It fetches data from a remote API and provides powerful features such as:

- 🔍 Search with debounce
- ✅ Filters by pricing options (Paid, Free, View Only)
- 🎚️ Dynamic price range slider
- 🔁 Infinite scroll with pagination (client-side)
- 🧠 State management via Redux
- 🔗 URL query parameter syncing (no localStorage)
- 🧪 Tested using **Vitest** and **Testing Library**

---

## 🚀 Tech Stack

- **React + Vite + TypeScript**
- **Tailwind CSS**
- **Redux** (manually configured, no Toolkit)
- **React Router**
- **Vitest + React Testing Library**

---

## 📦 Installation

> Requires Node.js `v20.19+`

```bash
git clone https://github.com/your-username/closet-product-listing.git
cd closet-product-listing
npm install
```

## To run tests

npm run test

## To run server locally

npm run dev

src/
│
├── pages/
│ └── Home.tsx # Main product listing page
│
├── components/
│ ├── CustomSlider.tsx # Dual range slider
│ └── ... # Reusable components
│
├── hooks/
│ ├── useDebounce.ts # Debounced search input
│ ├── useThrottle.ts # (If used) Throttled scroll
│
├── redux/
│ ├── actions.ts
│ ├── reducers.ts
│ └── store.ts
│
├── models/
│ ├── Item.ts
│ └── pricing.ts # PricingOption enum and labels
│
└── tests/
└── Home.test.tsx # Unit tests for Home page
