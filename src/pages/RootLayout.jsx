import AccountModal from "@/components/auth/AccountModal";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/global/ScrollTop";
import Header from "@/components/header/Header";
import { useAccountModal, useAuth } from "@/store";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const user = useAuth((state) => state.user);
  const location = useLocation();
  const { open, close } = useAccountModal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // === Simulate a loading delay of 5000ms

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Scroll to top on route change */}
      <ScrollTop />
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
