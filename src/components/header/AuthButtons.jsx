import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAccountModal } from "@/store";

const AuthButtons = () => {
  const navigate = useNavigate();
  const open = useAccountModal((state) => state.open);

  return (
    <div className="flex gap-3">
      <Button
        size="sm"
        className="font-semibold bg-yellow-500"
        onClick={() => {
          open();
          navigate("?form=login");
        }}
      >
        Login
      </Button>
      <Button
        variant="outline"
        size="sm"
        className=" font-semibold hidden sm:inline-flex"
        onClick={() => {
          open();
          navigate("?form=signup");
        }}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
