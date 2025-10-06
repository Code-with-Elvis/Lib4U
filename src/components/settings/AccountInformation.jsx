import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { UserCog } from "lucide-react";
import { useAuth } from "@/store";

const AccountInformation = () => {
  const user = useAuth((state) => state.user);

  return (
    <Card className="shadow-none rounded-md mb-5">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCog className="mr-2 h-5 w-5" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-neutral-400">
              Full Name
            </span>
            <span className="text-sm font-semibold">{user?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-neutral-400">
              Email
            </span>
            <span className="text-sm font-semibold">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-neutral-400">
              Member Since
            </span>
            <span className="text-sm font-semibold">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountInformation;
