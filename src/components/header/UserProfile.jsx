import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { profileLinks } from "@/lib/data";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useAuth } from "@/store";
import LogoutBtn from "./LogoutBtn";

const UserProfile = () => {
  const { user } = useAuth((state) => state);
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <Popover open={cardOpen} onOpenChange={setCardOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1">
          <span>
            <MdOutlineArrowDropDown size={20} />
          </span>
          <Avatar className="cursor-pointer select-none bg-gray-300">
            <AvatarImage src={user?.img_url} />
            <AvatarFallback className="bg-neutral-900 text-white font-bold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 mr-7 max-[600px]:mr-3.5 px-0">
        <nav className="px-2">
          {profileLinks.map(({ id, name, path, icon: Icon }) => (
            <Link
              key={id}
              to={path}
              onClick={() => setCardOpen(false)} // Close popover on link click
              className="flex group header__profile--link items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-all"
            >
              <Icon className="size-5.5 icon text-neutral-700 dark:text-neutral-100 group-hover:text-yellow-500 dark:group-hover:text-yellow-500 group-active:fill-yellow-500 transition duration-100" />
              <span className="dark:group-hover:text-neutral-800 ">{name}</span>
            </Link>
          ))}
        </nav>
        <Separator className="my-3" />
        <LogoutBtn />
      </PopoverContent>
    </Popover>
  );
};
export default UserProfile;
