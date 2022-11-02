import Image from "next/image";
import ClickAwayListener from "react-click-away-listener";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
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

  const handleCheckout = async () => {
    if (cartItems.length == 0) return;

    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <motion.div
      className="top-0 z-10 flex h-screen w-full"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="hidden h-full w-full md:block"></div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-50 p-2 shadow-xl md:w-11/12 xl:w-2/5 2xl:p-6">
          <header className="flex w-full shrink-0 items-center justify-end">
            <div
              className="flex cursor-pointer items-center justify-center p-1 md:p-2"
              onClick={handleClickAway}
            >
              <FiX size={25} />
            </div>
          </header>

          <div className="flex h-full w-full flex-1 flex-col overflow-auto md:items-center md:justify-center">
            {cartItems.length === 0 && (
              <div className="flex h-full items-center justify-center">
                Your cart is empty.
              </div>
            )}

            {cartItems.length >= 1 && (
              <div className="flex w-full flex-col gap-2 xl:gap-4">
                {cartItems.map((cartItem: IProduct) => {
                  return (
                    <div
                      className="flex w-full items-center gap-2 rounded-3xl bg-white p-4 xl:gap-4"
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

                      <div className="flex w-full flex-col justify-between text-sm text-gray-600 md:text-base">
                        <div>{cartItem.name}</div>
                        <div>
                          $
                          {cartItem.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>

                        <div className="flex items-center gap-2 xl:gap-4">
                          <div>Quantity</div>

                          <div className="flex">
                            <div
                              className="cursor-pointer p-4"
                              onClick={() => decrement(cartItem)}
                            >
                              <MinusCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                            </div>
                            <div className="flex w-6 items-center justify-center">
                              {cartItem.quantity}
                            </div>
                            <div
                              className="cursor-pointer p-4"
                              onClick={() => increment(cartItem)}
                            >
                              <PlusCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="cursor-pointer p-1 md:p-2"
                        onClick={() => removeCart(cartItem)}
                      >
                        <FiX size={25} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <footer className="flex w-full shrink-0 flex-col gap-4 text-sm md:text-base">
            {totalQuantity > 0 && (
              <div className="flex w-full flex-col gap-4 text-gray-600">
                <div className="flex w-full justify-end">
                  Total Quantity: {totalQuantity}
                </div>
                <div className="flex w-full justify-end font-semibold">
                  Grand Total: $
                  {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            )}

            <ActionButton
              btnColor="light"
              btnText="Checkout"
              onClick={handleCheckout}
            />
          </footer>
        </div>
      </ClickAwayListener>
    </motion.div>
  );
};

export default Sidebar;
