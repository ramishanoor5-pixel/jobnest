# JobNest - Multi-Page React Job Portal Application

**Task 5 Deliverable | Frontend Internship**

JobNest is a modern, responsive multi-page web application built with **React 19**, **React Router v7**, and **Google Firebase (Cloud Firestore)**. It serves as a comprehensive career platform connecting talented job seekers with verified employers across engineering, design, marketing, and business intelligence domains.

---

## 📌 Project Overview

JobNest allows job seekers to:
- **Discover Opportunities**: Browse curated job openings with salary ranges, experience levels, and location modes (Remote, On-site, Hybrid).
- **Interactive Multi-Filter & Search**: Filter jobs in real-time by keyword (title/skill/company), category, employment type, and work mode.
- **Dynamic Job Details**: View detailed job specifications, responsibilities, requirements, benefits, and company profiles on dynamic routes (`/jobs/:id`).
- **One-Click Application Modal**: Apply for jobs through an interactive modal form featuring field validation, instant local state feedback, and direct cloud persistence in Firebase Cloud Firestore.
- **Contact & Inquiry Support**: Submit inquiries via a validated contact form with categorized reason selection, saved to Firebase Firestore.
- **Interactive FAQ & Company Vision**: Learn about the platform's mission and browse an interactive accordion FAQ on the About page.

---

## 🚀 Key Requirements & Focus Met

| Requirement | Implementation Details |
| :--- | :--- |
| **Functional Components** | 100% modern React functional components with clean modular code. |
| **Props & Basic State** | Controlled inputs, multi-filter state, modal visibility, and accordion states managed via `useState`. |
| **Routing** | Client-side routing with `react-router-dom` (`<BrowserRouter>`, `<Routes>`, `<Route>`, `<NavLink>`, dynamic `:id` params via `useParams`, programmatic redirection via `useNavigate`). |
| **Component Reusability** | Reusable `Navbar`, `Footer`, `JobCard`, `JobFilter`, `ApplyModal`, `ContactForm`, `LoadingSpinner`, and `ErrorMessage`. |
| **Backend & API Handling** | **Google Firebase Cloud Firestore** integration with native `fetch` fallback for 100% reliability both online and offline. |
| **Loading & Error States** | Dedicated animated `LoadingSpinner`, structured `ErrorMessage` with interactive retry actions, and empty search fallback states. |
| **Proper Folder Structure** | Clear separation of concerns into `components/`, `pages/`, `services/`, `firebase/`, and static assets. |

---

## 🛠️ Technologies Used

- **React 19** (`react`, `react-dom`)
- **React Router v7** (`react-router-dom`)
- **Google Firebase (v12)** (Cloud Firestore for cloud database persistence)
- **JavaScript (ES6+)** (Async/Await, Promises, Destructuring, Array methods)
- **Modern CSS3** (Custom Properties / CSS Variables, Flexbox, CSS Grid, Media Queries, Keyframe Animations)
- **HTML5** (Semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`)

---

## 🔥 Firebase Cloud Firestore Architecture

JobNest connects directly to Google Cloud Firestore under Project ID `jobnest-de4e5`:

1. **`jobs` Collection**: Contains all live job postings, categorized by engineering, design, marketing, and data analytics. Automatically seeded on first load from `/jobs.json`.
2. **`applications` Collection**: Stores candidate applications submitted through the Apply Modal (candidate name, email, phone number, experience, portfolio, cover note, timestamp).
3. **`contacts` Collection**: Stores inquiries submitted via the Contact Us form (name, email, inquiry reason, subject, message, timestamp).
4. **Dual Persistence & Offline Support**: All writes are synchronized with both Firestore and the browser's `localStorage` backup so the application works seamlessly under any network conditions.

---

## 📂 Project Structure

```text
jobnest/
├── public/
│   ├── index.html
│   └── jobs.json               # Seed & offline API dataset for jobs
├── src/
│   ├── components/
│   │   ├── ApplyModal.js       # Reusable job application form modal
│   │   ├── ContactForm.js      # Reusable validated contact inquiry form
│   │   ├── ErrorMessage.js     # Reusable error alert with retry button
│   │   ├── Footer.js           # Reusable global footer
│   │   ├── JobCard.js          # Reusable job listing card
│   │   ├── JobFilter.js        # Reusable multi-attribute search and filter bar
│   │   ├── LoadingSpinner.js   # Reusable animated loading state
│   │   ├── Navbar.js           # Reusable navigation header with active states
│   │   └── ScrollToTop.js      # Utility component for smooth page transitions
│   ├── firebase/
│   │   └── config.js           # Firebase app & Firestore initialization
│   ├── pages/
│   │   ├── About.js            # About page with mission, values & FAQ accordion
│   │   ├── Contact.js          # Contact page with office info & contact form
│   │   ├── Home.js             # Hero, search, metrics, categories & featured jobs
│   │   ├── JobDetail.js        # Dynamic page (/jobs/:id) with full job specs
│   │   ├── Jobs.js             # Main dynamic jobs catalogue with API & filters
│   │   └── NotFound.js         # 404 page for unmatched routes
│   ├── services/
│   │   └── jobsApi.js          # Asynchronous service for Firestore & REST operations
│   ├── App.js                  # Master router and page wrapper
│   ├── index.css               # Design system & responsive styles
│   └── index.js                # React DOM entry point
├── package.json
└── README.md
```

---

## 💻 How to Run the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16.x or newer recommended).

### 1. Clone or Open the Repository
```bash
git clone < https://github.com/ramishanoor5-pixel/jobnest >
cd jobnest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```
The application will open automatically in your browser at:
```text
http://localhost:3000
```

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

---

## 🔗 Repository & Deliverables

- **GitHub Repository**: https://github.com/ramishanoor5-pixel/jobnest `
- **Author**: (Hafiza Ramisha Noor)

---

## 📄 License
This project was developed for educational and internship evaluation purposes.
