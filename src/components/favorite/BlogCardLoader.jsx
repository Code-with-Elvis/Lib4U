import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const BlogCardLoader = () => {
  return (
    <Card className="rounded-sm shadow-none pt-0  overflow-clip hover:shadow-sm break-inside-avoid">
      <CardHeader className="px-0">
        <div className="h-34 sm:h-54 mb-4 skeleton"></div>
        <CardTitle className="px-3 text-sm sm:text-base">
          <div className="h-4 skeleton mb-2"></div>
          <div className="h-4 skeleton"></div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
export default BlogCardLoader;
