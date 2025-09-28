import { useAccountModal } from "@/store";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AccountModal = () => {
  const isOpen = useAccountModal((state) => state.isOpen);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get("form"); // 'login' or 'signup'

  if (!isOpen || !formType) return null;
  return (
    <div className="fixed inset-0 z-50 bg-white/80 dark:bg-black/80 flex items-center justify-center">
      <div className="w-full h-full overflow-y-auto">
        <div className="py-20 px-3 flex items-center justify-center min-h-full">
          {formType === "login" && <LoginForm />}
          {formType === "signup" && <RegisterForm />}
        </div>
      </div>
    </div>
  );
};
export default AccountModal;
