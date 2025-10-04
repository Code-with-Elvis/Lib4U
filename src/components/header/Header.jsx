import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchBtn from "./SearchBtn";
import Theme from "./Theme";
import AuthButtons from "./AuthButtons";
import { useAuth } from "@/store";
import UserProfile from "./UserProfile";
import Logo from "@/assets/Logo";

const Header = () => {
  const user = useAuth((state) => state.user);

  return (
    <header className="py-3 bg-background shadow-sm  dark:shadow-accent border-border dark:shadow-none dark:border-1 top-0 sticky z-40">
      <div className="lib-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SearchBtn />

          <Link to="/" className="flex items-center gap-1 select-none">
            <Logo className="size-9.5" />
            <span className="font-bold hidden sm:inline-block font-saira bg-gradient-to-r from-yellow-700 via-black dark:via-white to-yellow-600 bg-clip-text text-transparent">
              Lib4U
            </span>
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
