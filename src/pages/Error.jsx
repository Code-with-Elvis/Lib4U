import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const handleTryAgain = () => {
    navigate(0);
  };

  if (error.status === 404) {
    return (
      <>
        <Header />
        <section className="py-10 pt-20 text-center auto-height">
          <article className="lib-container">
            <h1 className="text-5xl mb-2 font-bold bg-gradient-to-r from-destructive via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              404
            </h1>

            <h3 className="mb-4 text-xl font-bold text-neutral-700 dark:text-neutral-200">
              That page can’t be found.
            </h3>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              It looks like nothing was found at this location. Please navigate
              back home
            </p>

            <Button
              onClick={() => navigate("/")}
              className="mt-2  bg-yellow-500 "
            >
              Go Back Home
            </Button>
          </article>
        </section>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <section className="py-10 pt-20 text-center auto-height">
          <article className="lib-container">
            <h1 className="text-5xl mb-2 font-bold bg-gradient-to-r from-destructive via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              Oops!
            </h1>
            <p className="mb-8 common-par max-[600px]:text-sm">
              We encountered an unexpected error. {error.message}!
            </p>
            <Button
              onClick={handleTryAgain}
              className="gap-2 hover:bg-primary/90 text-primary-foreground  rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </article>
        </section>
        <Footer />
      </>
    );
  }
};
export default Error;
