import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  BookDetails,
  Error,
  Favorites,
  Home,
  Profile,
  RootLayout,
  Search,
  Settings,
} from "./pages";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useAccountModal, useAuth, useTheme } from "./store";
import { PrivateRoute } from "./middlewares";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="favorites" element={<Favorites />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="book/:bookId" element={<BookDetails />} />
      <Route path="search" element={<Search />} />
    </Route>
  )
);

function App() {
  const login = useAuth((state) => state.login);
  const logout = useAuth((state) => state.logout);
  const theme = useTheme((state) => state.theme);
  const isOpen = useAccountModal((state) => state.isOpen);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, "profiles", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            login({
              name: userData.name || user.displayName || "No Name",
              uid: user.uid,
              email: user.email,
              img_url: userData.img_url || "",
              createdAt: userData.createdAt || new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        // No user logged in → clear state
        logout();
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [login, logout]);

  return <RouterProvider router={router} />;
}

export default App;
