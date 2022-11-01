import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IProduct } from "../interfaces/product";

interface ChildrenProps {
  children: React.ReactNode;
}

interface AppContextInterface {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  totalQuantity: number;
  setTotalQuantity: (value: number) => void;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  addCart: (product: IProduct, quantity: number) => void;
  removeCart: (product: IProduct) => void;
  cartItems: IProduct[];
  setCartItems: (value: IProduct[]) => void;
}

const Context = createContext({} as AppContextInterface);

export const AppContext = ({ children }: ChildrenProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  useEffect(() => {
    // Total quantity
    let cartItemQty = cartItems.map((item) => item.quantity);
    let cartTotalQty = cartItemQty.reduce((a, b) => a + b, 0);
    setTotalQuantity(cartTotalQty);

    // Total price
    let cartItemPrice = cartItems.map((item) => item.price * item.quantity);
    let cartTotalPrice = cartItemPrice.reduce((a, b) => a + b, 0);
    setTotalPrice(cartTotalPrice);
  }, [cartItems]);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addCart = (product: IProduct, quantity: number) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      const updatedItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );

      setCartItems(updatedItems);
      toast.success(
        `${product.name} x ${quantity} has been added to your cart.`
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success(
        `${product.name} x ${quantity} has been added to your cart.`
      );
    }
  };

  const removeCart = (product: IProduct) => {
    const updatedItems = cartItems.filter((item) => item != product);

    setCartItems(updatedItems);
    toast.success(`${product.name} has been removed from your cart.`);
  };

  return (
    <Context.Provider
      value={{
        quantity,
        increment,
        decrement,
        totalQuantity,
        setTotalQuantity,
        totalPrice,
        setTotalPrice,
        showCart,
        setShowCart,
        addCart,
        removeCart,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
