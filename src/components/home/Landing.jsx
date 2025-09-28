import { useAccountModal, useAuth } from "@/store";
import HeroImg from "../../assets/Diverse_lib.png";
import ElavatedImg from "../../assets/Playful_learning.png";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const user = useAuth((state) => state.user);
  const open = useAccountModal((state) => state.open);
  const navigate = useNavigate();
  return (
    <section
      style={{ backgroundImage: `url(${HeroImg})` }}
      className="lib-landing bg-cover bg-center relative flex items-center "
    >
      <div className="absolute bg-white/95 dark:bg-background/90  right-0 bottom-0 top-0 w-[65%] max-[800px]:w-full max-[800px]:top-[20%] "></div>
      <div className="lib-container w-full z-10 relative grid grid-cols-2 max-[800px]:grid-cols-1 gap-8 max-[800px]:gap-0 py-20 max-[800px]:py-10">
        <article>
          <img
            src={ElavatedImg}
            alt="hero image"
            className="w-full h-100 max-[1000px]:h-auto max-[800px]:w-1/2 max-[600px]:w-[80%] mx-auto"
          />
        </article>
        <article className="mt-10 max-[800px]:text-center">
          <h1 className="text-6xl  font-semibold mb-6 max-[1000px]:text-4xl">
            Your digital <br className="max-[1000px]:hidden" /> library, anytime
            anywhere
          </h1>
          <p className=" mb-6 text-muted-foreground w-[85%] max-[800px]:w-full">
            Search millions of books, save your favorites, and join a community
            of readers. Lib4U makes learning and reading accessible for
            everyone.
          </p>

          <div className="flex gap-4 max-[800px]:justify-center">
            <Button
              size="lg"
              asChild
              className="font-semibold bg-yellow-500 h-12"
            >
              <Link to="/search">Explore Library</Link>
            </Button>
            {!user ? (
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  open();
                  navigate("?form=signup");
                }}
                className="h-12 bg-transparent font-semibold"
              >
                Sign Up Free
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="h-12 bg-transparent font-semibold"
              >
                Learn More
              </Button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Landing;
