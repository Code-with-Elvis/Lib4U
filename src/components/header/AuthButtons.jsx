import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3">
      <Button
        size="sm"
        className="font-semibold bg-yellow-500 rounded-full"
        onClick={() => navigate("?form=login")}
      >
        Login
      </Button>
      <Button
        variant="outline"
        size="sm"
        className=" font-semibold hidden sm:inline-flex rounded-full"
        onClick={() => navigate("?form=signup")}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
