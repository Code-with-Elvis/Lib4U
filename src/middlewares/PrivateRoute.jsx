import { useAuth } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useAuth((state) => state.user);
  const loading = useAuth((state) => state.loading);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center flex-col gap-5 justify-center bg-white dark:bg-black">
        <div class="wave-container">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <p className="text-sm animate-pulse">Loading...</p>
      </div>
    ); // Prevent redirect during loading

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
