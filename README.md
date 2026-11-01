# Devkrupa Jewellers 💎

**Devkrupa Jewellers** is a modern, responsive web application for an exclusive jewelry store. Built with **React 18**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, and **Firebase**, this full-stack application provides an elegant shopping and showcase experience for gold, silver, and customized jewelry collections.

---

## 🚀 Features

- **✨ Royal UI & Luxury Experience**: Styled with custom Tailwind CSS aesthetics, luxury themes, and animated components (e.g., Interactive Welcome Doors).
- **💍 Product Catalog & Showcase**: Explore collections of Gold, Silver, and Customized Jewelry with real-time price highlights, search filters, and detailed view pages.
- **🛒 Shopping Cart**: Seamless cart experience allowing users to add, update quantity, and manage selected items.
- **🎨 Custom Jewelry Requests**: Dedicated customization form for bespoke jewelry ordering.
- **🔐 User Authentication**: Dual-authentication setup supporting **Firebase Auth** and a dedicated **Node.js / Express + MongoDB (JWT)** backend for user signup, login, and protected profiles.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **📍 Store Contact & Location**: Contact section integrated with business inquiry forms and interactive map links.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Firebase**: [Firebase v10](https://firebase.google.com/) (Auth, Firestore, Storage)
- **Analytics**: Vercel Speed Insights & Analytics

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with [Mongoose ORM](https://mongoosejs.com/)
- **Auth & Security**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs` hashing, CORS, `dotenv`

---

## 📂 Project Structure

```
Devkrupa-Jewellers/
├── public/                 # Static assets
├── assets/                 # Brand images & banners
├── server/                 # Express backend server
│   ├── models/             # Mongoose schemas (e.g., User model)
│   ├── routes/             # Express API routes (e.g., auth routes)
│   ├── index.js            # Express server entry point
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── src/                    # Frontend source code
│   ├── assets/             # Images, logos, and UI assets
│   ├── components/         # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── WelcomeDoors.jsx
│   ├── context/            # Global context state (e.g., Auth, Cart context)
│   ├── firebase/           # Firebase configuration & initialization
│   ├── pages/              # App page views
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── SilverCollection.jsx
│   │   ├── CustomizeCollection.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserSignup.jsx
│   │   └── UserProfile.jsx
│   ├── App.jsx             # Main router component
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind & custom CSS imports
├── index.html              # Base HTML template
├── package.json            # Frontend dependencies & scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment configuration
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or `yarn`
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

---

### 📥 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/25csdaksh/devkrupajwellers.git
   cd devkrupajwellers
   ```

2. **Frontend Setup**
   Install frontend dependencies:
   ```bash
   npm install
   ```

   Configure Environment Variables:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

3. **Backend Setup**
   Navigate to the `server` directory and install server dependencies:
   ```bash
   cd server
   npm install
   ```

   Configure Backend Environment Variables:
   Create a `.env` file inside the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devkrupa_db
   JWT_SECRET=your_jwt_secret_key
   ```

---

## 🏃 Running the Application

### Start Backend Server
From the root directory:
```bash
cd server
npm start
```
*The server runs by default on `http://localhost:5000`.*

### Start Frontend Dev Server
Open a new terminal window in the root project directory:
```bash
npm run dev
```
*The Vite frontend server will launch at `http://localhost:5173`.*

---

## 📜 Available Scripts

### Frontend (`/`)
- `npm run dev` – Launch Vite development server.
- `npm run build` – Build production distribution bundle.
- `npm run preview` – Preview production build locally.
- `npm run lint` – Run ESLint code quality check.

### Backend (`/server`)
- `npm start` – Start Node.js Express server.

---

## 🌐 Deployment

The application is pre-configured for seamless deployment on **Vercel**:
- `vercel.json` is included for SPA route rewrites.
- Ensure environment variables (`VITE_FIREBASE_*`, backend URLs) are configured in the Vercel dashboard.

---

## 📄 License

This project is private and maintained for **Devkrupa Jewellers**. All rights reserved.
