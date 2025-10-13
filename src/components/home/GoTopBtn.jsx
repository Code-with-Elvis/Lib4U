import { useEffect, useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import { Button } from "../ui/button";

const GoTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // === Handle scroll event to toggle button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        // === Show button after 1000px of scrolling
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // === Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // === Smooth scroll animation
    });
  };

  return (
    isVisible && (
      <Button
        className="fixed hidden sm:flex right-4 bottom-18 animate-pulse hover:scale-110 transition-transform z-30 shadow-[1px_1px_5px_#aaa]"
        size="icon"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <IoChevronUp />
      </Button>
    )
  );
};
export default GoTopBtn;
