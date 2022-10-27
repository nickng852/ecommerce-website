import Image from "next/image";
import { motion } from "framer-motion";
import ClickAwayListener from "react-click-away-listener";
import { FiX } from "react-icons/fi";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { urlFor } from "../lib/client";
import { useAppContext } from "../contexts/AppContext";
import { IProduct } from "../interfaces/product";
import ActionButton from "./button/ActionButton";

const Sidebar = () => {
  const {
    showCart,
    setShowCart,
    cartItems,
    setCartItems,
    totalQuantity,
    totalPrice,
    removeCart,
  } = useAppContext();

  const handleClickAway = () => {
    if (showCart) {
      setShowCart(!showCart);
    }
  };

  const increment = (cartItem: IProduct) => {
    const updatedItems = cartItems.map((item) =>
      item._id === cartItem._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedItems);
  };

  const decrement = (cartItem: IProduct) => {
    if (cartItem.quantity > 1) {
      const updatedItems = cartItems.map((item) =>
        item._id === cartItem._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      setCartItems(updatedItems);
    }
  };

  return (
    <motion.div
      className="absolute top-0 right-0 flex h-screen w-full"
      initial={{ opacity: 0.5, x: "1%" }}
      animate={{ opacity: 1, x: "0%" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="hidden h-full w-full md:block"></div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="static flex h-full w-full flex-col items-center justify-center bg-gray-50 shadow-xl md:w-11/12 xl:w-2/5">
          <div
            className="absolute top-4 right-4 cursor-pointer p-2 md:right-5 md:top-5 lg:right-6 lg:top-6"
            onClick={handleClickAway}
          >
            <FiX size={25} />
          </div>

          {cartItems.length === 0 && <div>Your cart is empty.</div>}
          {cartItems.length >= 1 && (
            <div className="flex w-full flex-col gap-4 p-2 2xl:p-6">
              {cartItems.map((cartItem: IProduct) => {
                return (
                  <div
                    className="flex w-full items-center justify-between gap-2 rounded-3xl bg-white p-4"
                    key={cartItem._id}
                  >
                    <div className="flex h-full items-center justify-center">
                      <Image
                        src={urlFor(cartItem?.image[0]).url()}
                        className="rounded-xl p-2"
                        alt=""
                        width={200}
                        height={200}
                      />
                    </div>

                    <div className="w-full">
                      <div className="text-gray-600">{cartItem.name}</div>
                      <div className="text-gray-600">
                        ${cartItem.price.toLocaleString()}
                      </div>

                      <div className="flex flex-col xl:flex-row xl:items-center">
                        <div className="flex items-center">
                          <div className="text-gray-600">Quantity</div>
                          <div
                            className="cursor-pointer p-4"
                            onClick={() => decrement(cartItem)}
                          >
                            <MinusCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                          </div>
                          <div className="flex w-6 items-center justify-center text-gray-600">
                            {cartItem.quantity}
                          </div>
                          <div
                            className="cursor-pointer p-4"
                            onClick={() => increment(cartItem)}
                          >
                            <PlusCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                          </div>
                        </div>

                        <div>
                          <ActionButton
                            btnColor="light"
                            btnText="Remove"
                            onClick={() => removeCart(cartItem)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalQuantity > 0 && (
            <div className="flex w-full flex-col items-center justify-center gap-4 p-6 text-gray-600">
              <div className="flex w-full justify-end">
                Total Quantity: {totalQuantity}
              </div>
              <div className="flex w-full justify-end text-lg font-semibold">
                Grand Total: ${totalPrice.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </motion.div>
  );
};

export default Sidebar;
