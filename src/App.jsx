import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  BookDetails,
  Favorites,
  Home,
  Profile,
  RootLayout,
  Search,
  Settings,
} from "./pages";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useAuth } from "./store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="book/:id" element={<BookDetails />} />
      <Route path="search" element={<Search />} />
    </Route>
  )
);

function App() {
  const login = useAuth((state) => state.login);
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, "profiles", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            login({
              name: userData.full_name,
              uid: user.uid,
              email: user.email,
              img_url: userData.img_url || "",
              favoriteBooks: userData.favorites || [],
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
