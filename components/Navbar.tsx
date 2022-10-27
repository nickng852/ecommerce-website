import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../contexts/AppContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { totalQuantity, showCart, setShowCart } = useAppContext();

  const handleClick = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="sticky top-0 z-10 w-full bg-white p-4 shadow-sm 2xl:px-[15rem]">
      <div className="flex items-center justify-between">
        <Link href="/">Logo</Link>
        <div
          className="flex cursor-pointer items-center justify-center rounded-full p-3 lg:p-4"
          onClick={handleClick}
        >
          <div className="relative">
            <ShoppingBagIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            {totalQuantity >= 1 && (
              <div className="absolute bottom-2 left-3 flex h-1 w-1 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-gray-50 lg:bottom-3">
                {totalQuantity}
              </div>
            )}
          </div>
        </div>
      </div>

      {showCart && <Sidebar />}
    </div>
  );
};

export default Navbar;
