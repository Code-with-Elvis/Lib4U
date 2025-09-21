import HomeTitle from "./HomeTitle";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";

const FollowUs = () => {
  return (
    <section className="mb-10">
      <HomeTitle title="Follow Us" />
      <div className="flex gap-5 ">
        <a
          href="#"
          className="block w-full border-1 border-border rounded-sm p-4 text-center hover:opacity-60 transition"
        >
          <BsInstagram size={28} className="text-red-400 mx-auto mb-2" />
          <h4 className="font-bold text-lg">20,000</h4>
          <p className="text-sm text-muted-foreground">Followers</p>
        </a>
        <a
          href="#"
          className="block w-full border-1 border-border rounded-sm p-4 text-center hover:opacity-60 transition"
        >
          <BsFacebook size={28} className="text-blue-600 mx-auto mb-2" />
          <h4 className="font-bold text-lg">15,000</h4>
          <p className="text-sm text-muted-foreground">Followers</p>
        </a>
        <a
          href="#"
          className="block w-full border-1 border-border rounded-sm p-4 text-center hover:opacity-60 transition"
        >
          <BsPinterest size={28} className="text-red-400 mx-auto mb-2" />
          <h4 className="font-bold text-lg">10,000</h4>
          <p className="text-sm text-muted-foreground">Followers</p>
        </a>
      </div>
    </section>
  );
};

export default FollowUs;
