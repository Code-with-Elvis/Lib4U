const AsideBookCardLoader = () => {
  return (
    <div className="flex gap-4">
      <div className="w-24 h-20 max-[1024px]:h-32 max-[1024px]:w-28 shrink-0 skeleton"></div>
      <div className="flex flex-col gap-4 w-full">
        <h4 className="skeleton mt-1 h-8 w-full"></h4>
        <small className="skeleton h-4 w-4/6"></small>
      </div>
    </div>
  );
};
export default AsideBookCardLoader;
