import { useTheme } from "@/store";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-8"
      onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default Theme;
