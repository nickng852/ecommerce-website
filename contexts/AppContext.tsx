import React, { createContext, useContext, useState } from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

interface AppContextInterface {
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

const Context = createContext({} as AppContextInterface);

export const AppContext = ({ children }: ChildrenProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <Context.Provider
      value={{
        quantity,
        increment,
        decrement,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
