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
  return <RouterProvider router={router} />;
}

export default App;
