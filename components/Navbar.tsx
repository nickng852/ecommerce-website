import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="bg-white p-4 2xl:px-[15rem]">
      <div className="flex items-center justify-between">
        <Link href="/">Logo</Link>
        <div className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-3 lg:p-4">
          <ShoppingBagIcon className="h-4 w-4 lg:h-5 lg:w-5" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
