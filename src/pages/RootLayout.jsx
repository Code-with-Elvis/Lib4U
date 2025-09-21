import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="auto-height">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
