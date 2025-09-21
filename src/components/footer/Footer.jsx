const Footer = () => {
  return (
    <footer className="py-5 border-t border-border text-center text-muted-foreground">
      <div className="lib-container">
        <p>
          Built by{" "}
          <a
            href="https://elvis-o-dev.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500"
          >
            Elvis
          </a>{" "}
          at{" "}
          <a
            href="https://app.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500"
          >
            Netlify
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/Code-with-Elvis/Lib4U"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
