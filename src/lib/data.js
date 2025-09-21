import FavoriteIcon from "@/icons/FavoriteIcon";
import SettingsIcon from "@/icons/SettingsIcon";
import UserIcon from "@/icons/UserIcon";
import { nanoid } from "nanoid";

const profileLinks = [
  {
    id: nanoid(),
    name: "Profile",
    path: "/profile",
    icon: UserIcon,
  },
  {
    id: nanoid(),
    name: "Favorites",
    path: "/favorites",
    icon: FavoriteIcon,
  },
  {
    id: nanoid(),
    name: "Settings",
    path: "settings",
    icon: SettingsIcon,
  },
];
const commonQueryParams = [
  { id: nanoid(), label: "Fiction", url: "/search?q=fiction" },
  { id: nanoid(), label: "Science", url: "/search?q=science" },
  { id: nanoid(), label: "History", url: "/search?q=history" },
  { id: nanoid(), label: "J.K. Rowling", url: "/search?q=j.k.+rowling" },
  { id: nanoid(), label: "Stephen King", url: "/search?q=stephen+king" },
  { id: nanoid(), label: "Chinua Achebe", url: "/search?q=chinua+achebe" },
  { id: nanoid(), label: "Best Sellers", url: "/search?q=best+sellers" },
];

const topCategories = [
  { id: nanoid(), label: "Fiction", url: "/search?q=fiction" },
  { id: nanoid(), label: "Non-Fiction", url: "/search?q=non-fiction" },
  { id: nanoid(), label: "Fantasy", url: "/search?q=fantasy" },
  { id: nanoid(), label: "Science", url: "/search?q=science" },
  { id: nanoid(), label: "Technology", url: "/search?q=technology" },
  { id: nanoid(), label: "History", url: "/search?q=history" },
  { id: nanoid(), label: "J.K. Rowling", url: "/search?q=j.k.+rowling" },
  { id: nanoid(), label: "Stephen King", url: "/search?q=stephen+king" },
  { id: nanoid(), label: "Chinua Achebe", url: "/search?q=chinua+achebe" },
  { id: nanoid(), label: "Paulo Coelho", url: "/search?q=paulo+coelho" },
  { id: nanoid(), label: "Agatha Christie", url: "/search?q=agatha+christie" },
  { id: nanoid(), label: "George Orwell", url: "/search?q=george+orwell" },
  { id: nanoid(), label: "JavaScript", url: "/search?q=javascript" },
  { id: nanoid(), label: "Python", url: "/search?q=python" },
];

export { profileLinks, commonQueryParams, topCategories };
