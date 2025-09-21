const HomeTitle = ({ title }) => {
  return (
    <h2 className="mb-6 border-b-2 border-accent-foreground">
      <span className="bg-accent-foreground select-none inline-block text-accent py-2 px-5 max-[400px]:px-3 text-sm font-semibold">
        {title}
      </span>
    </h2>
  );
};

export default HomeTitle;
