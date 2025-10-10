import AccountModal from "@/components/auth/AccountModal";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useAccountModal, useAuth } from "@/store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const user = useAuth((state) => state.user);
  const location = useLocation();
  const { open, close } = useAccountModal();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const form = params.get("form");

    if (form === "login" || form === "signup") {
      if (user) {
        // === Logged in — clean up the URL
        params.delete("form");
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });
        close();
      } else {
        // === Not logged in — open modal
        open();
      }
    } else {
      // === No ?form param — ensure modal closed
      close();
    }
  }, [location.search, user]);

  return (
    <>
      <Header />
      <AccountModal />
      <main className="auto-height">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
