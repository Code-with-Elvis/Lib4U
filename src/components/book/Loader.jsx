const Loader = () => {
  return (
    <section>
      <div className="lib-container pt-10 grid grid-cols-[1.5fr_2fr] max-[740px]:grid-cols-1 gap-6">
        <article className="">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-3">
            <span className="skeleton h-4 w-18"></span>
            <span className="skeleton h-4 w-12"></span>
            <span className="skeleton h-4 w-20"></span>
          </div>
          {/* Image Skeleton */}
          <div className="relative max-[740px]:w-[50%] max-[520px]:w-full mx-auto">
            <div className="h-60 sm:h-90 skeleton mt-4"></div>
          </div>
        </article>

        {/* Book Info Skeleton */}
        <article className="blog-info pt-14 max-[740px]:pt-0">
          <h4 className="skeleton h-4 w-3/6 mb-4"></h4>
          <h2 className="skeleton h-8 mb-4"></h2>
          <div>
            <h4 className="skeleton h-4 w-2/6 mb-2"></h4>
            <ul className=" mb-4">
              <li className="skeleton h-4 w-1/4 mb-2"></li>
              <li className="skeleton h-4 w-1/4 mb-1"></li>
            </ul>
            <h4 className="skeleton h-4 w-2/6 mb-2"></h4>
            <ul className=" mb-4">
              <li className="skeleton h-4 w-1/4 mb-2"></li>
              <li className="skeleton h-4 w-1/4 mb-2"></li>
              <li className="skeleton h-4 w-1/4 mb-1"></li>
            </ul>
          </div>

          <div className="my-6 overflow-x-auto">
            <table className="table w-full border-1 border-border">
              <thead>
                <tr className="border-1 border-border">
                  <th className="border-1 border-border py-1 px-2" colSpan={3}>
                    <span className="skeleton block h-4 w-full"></span>
                  </th>
                  <th className="border-1 border-border py-1 px-2">
                    <span className="skeleton block h-4  w-20"></span>
                  </th>
                  <th className="border-1 border-border py-1 px-2">
                    <span className="skeleton block h-4 w-12"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-1 border-border">
                  <td className="border-1 border-border py-1 px-2">
                    <span className="skeleton block h-4 w-full"></span>
                  </td>
                  <td className="border-1 border-border py-1 px-2">
                    <span className="skeleton block h-4 w-20"></span>
                  </td>
                  <td className="border-1 border-border py-1 px-2">
                    <span className="skeleton block h-4 w-20"></span>
                  </td>
                  <td className="border-1 border-border py-1 px-2"></td>
                  <td className="border-1 border-border py-1 px-2"></td>
                </tr>
                <tr>
                  <td className="border-1 border-border py-1 px-2">
                    <span className="skeleton block h-4 w-20"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="w-2/6 skeleton h-4 mb-2"></h4>
          <p className="skeleton h-40 mb-4"></p>
        </article>
      </div>
      {/* Comments Section Skeleton */}
      <div className="lib-container pb-10 mt-8 pt-8 border-t-1 border-border">
        <h3 className="skeleton h-4 w-2/6 mb-8"></h3>
        <ul className="space-y-4 mb-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex gap-3 items-start">
              <span className="skeleton block size-10 flex-shrink-0 rounded-full"></span>
              <div className="flex-1">
                <p className="skeleton h-3 w-1/6 mb-2"></p>
                <p className="skeleton h-3 w-full"></p>
                <span className="mt-1.5 h-2 skeleton block w-10"></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Loader;
