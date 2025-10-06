# Lib4U

A modern book discovery application that allows users to search, discover, and manage their favorite books using the Google Books API. Built with React, Firebase, and modern UI components.

## 🌟 Features

- **Book Search**: Search through millions of books using Google Books API
- **User Authentication**: Secure Google authentication with Firebase
- **Favorites Management**: Save and organize your favorite books
- **User Profiles**: Personalized user profiles with customizable settings
- **Comments System**: Add and manage comments on books
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Fully responsive design that works on all devices
- **Book Categories**: Browse books by different categories
- **Search Filters**: Advanced search and filtering options

## 🧰 Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Accessible UI components
- **React Hook Form** - Form management
- **React Icons & Lucide Icons** - Icon libraries for a clean and modern interface.
- **Bad words** - Profanity Filter Library.
- **Google Fonts** - To enhance typography and ensure consistent design across the app.
- **JS Cookie** - For session/local storage.
- **Nanoid** - For generating unique IDs (strings).

### Backend & Services

- **Firebase Authentication** - User authentication
- **Firebase Firestore** - Database
- **Google Books API** - Book data source

### Development Tools

- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **Axios** - HTTP client
- **Zod** - Schema validation

## 📒 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Firebase account** for authentication and database
- **Google Books API** access (free with Google account)

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Code-with-Elvis/Lib4U.git
cd Lib4U
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication with Google provider
4. Create a Firestore database
5. Copy the configuration keys to your `.env` file

### 5. Google Books API

The app uses the Google Books API which doesn't require an API key for basic usage. For production use or higher rate limits, you may want to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Books API
3. Create credentials if needed

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8000](http://localhost:8000) to view the application in your browser.

## 🧩 Project Structure

```
Lib4U/
├── public/                     # Static assets
│   └── favicon.png
├── src/
│   ├── assets/                 # Images and static files
│   │   ├── Diverse_lib.png
│   │   ├── Diverse_lib_blurred.png
│   │   ├── Logo.jsx
│   │   └── Playful_learning.png
│   ├── components/             # Reusable UI components
│   │   ├── auth/              # Authentication components
│   │   │   ├── AccountModal.jsx
│   │   │   ├── GoogleAuthButton.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── book/              # Book-related components
│   │   │   ├── Comments.jsx
│   │   │   ├── DeleteCommentBtn.jsx
│   │   │   └── PostCommentForm.jsx
│   │   ├── favorite/          # Favorites functionality
│   │   │   ├── BookCard.jsx
│   │   │   ├── FavoriteBtn.jsx
│   │   │   └── SortDropdown.jsx
│   │   ├── footer/            # Footer components
│   │   ├── global/            # Shared components
│   │   ├── header/            # Header and navigation
│   │   ├── home/              # Home page components
│   │   ├── profile/           # User profile components
│   │   ├── search/            # Search functionality
│   │   ├── settings/          # Settings components
│   │   └── ui/                # Base UI components (Radix UI)
│   ├── hooks/                 # Custom React hooks
│   │   ├── useGetBook.jsx
│   │   ├── useGetBooks.jsx
│   │   └── useGetSearchedBooks.jsx
│   ├── icons/                 # Custom icon components
│   ├── lib/                   # Utility functions
│   │   ├── data.js
│   │   ├── format.js
│   │   └── utils.js
│   ├── pages/                 # Page components
│   │   ├── BookDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   ├── RootLayout.jsx
│   │   ├── Search.jsx
│   │   ├── Settings.jsx
│   │   └── index.js
│   ├── App.jsx               # Main App component
│   ├── firebase.js           # Firebase configuration
│   ├── index.css             # Global styles
│   ├── main.jsx              # App entry point
│   └── store.js              # Zustand state management
├── components.json            # Shadcn/ui configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── jsconfig.json             # JavaScript configuration
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

## 💅 Styling and UI

The application uses:

- **Tailwind CSS** for utility-first styling
- **Shadcn/Radix UI** for accessible, unstyled UI primitives
- **Custom CSS** for additional styling and animations
- **Dark/Light theme** support with system preference detection

## 🔐 Authentication Flow

1. Users can sign in with Google using Firebase Auth
2. User data is stored in Firestore database
3. Authentication state is managed with Zustand
4. Protected routes require authentication

## 📊 Data Management

- **TanStack Query** for server state management and caching
- **Zustand** for client state (auth, theme, modals)
- **Firestore** for user data, favorites, and comments
- **Local Storage** for theme preferences

## 🌐 API Integration

### Google Books API

- Search books by title, author, or ISBN
- Get book details and metadata
- No API key required for basic usage
- Rate limits apply for heavy usage

### Firebase Services

- **Authentication**: Google OAuth
- **Firestore**: User profiles, favorites, comments
- **Security Rules**: Protect user data

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## 🔐 Environment Variables Reference

| Variable                            | Description                  | Required |
| ----------------------------------- | ---------------------------- | -------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API key             | Yes      |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         | Yes      |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID          | Yes      |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      | Yes      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes      |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID              | Yes      |
| `VITE_FIREBASE_MEASUREMENT_ID`      | Firebase measurement ID      | No       |

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on [GitHub](https://github.com/Code-with-Elvis/Lib4U/issues)
- Check the existing documentation
- Review the Firebase and Google Books API documentation

---

**Made with ❤️ by [Elvis Okumu](https://elvis-o-dev.com/about)**
