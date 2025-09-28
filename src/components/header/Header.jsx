import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchBtn from "./SearchBtn";
import Theme from "./Theme";
import AuthButtons from "./AuthButtons";
import { useAuth } from "@/store";
import UserProfile from "./UserProfile";

const Header = () => {
  const user = useAuth((state) => state.user);

  return (
    <header className="py-3 bg-background shadow-sm  dark:shadow-accent border-border dark:shadow-none dark:border-1 top-0 sticky z-40">
      <div className="lib-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SearchBtn />
          <Link
            to="/"
            className="font-saira select-none text-2xl font-extrabold"
          >
            LI<span className="text-yellow-500">B</span>4U
          </Link>
        </div>
        <SearchForm />
        <div className="flex items-center gap-4">
          <Theme />
          {user ? <UserProfile /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
};

export default Header;
