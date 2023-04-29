import { createContext, useContext, ReactNode } from "react";
import { useLocalstorage } from "../hooks/useLocalstorage";
import { useFetch } from "../hooks/useFetch";

type CartItemData = {
  id: number;
  qty: number;
};

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[] | null;
}

type CartContextType = {
  cartItems: CartItemData[];
  getItemQunatity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  getCartItemsProduct: () => Product[];
};

const CartContext = createContext({} as CartContextType);

type CartContextProviderProps = {
  children: ReactNode;
};

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useLocalstorage<CartItemData[]>(
    "cartItems",
    []
  );

  function getItemQunatity(id: number): number {
    let item = cartItems.find((item) => item.id === id);
    if (item) return item.qty;
    return 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems((currCartItems) => {
      if (!currCartItems.find((item) => item.id === id)) {
        return [...currCartItems, { id, qty: 1 }];
      } else {
        return currCartItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currCartItems) => {
      if (currCartItems.find((item) => item.id === id)?.qty === 1) {
        return currCartItems.filter((item) => item.id !== id);
      } else {
        return currCartItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        });
      }
    });
  }

  function removeItem(id: number) {
    setCartItems((currCartItems) => {
      return currCartItems.filter((item) => item.id !== id);
    });
  }

  function getCartItemsProduct(): Product[] {
    const [{ data }] = useFetch();
    const ids = cartItems.map((item) => item.id);
    const idsSet = new Set(ids);
    return data?.products?.filter((prod: { id: number }) =>
      idsSet.has(prod.id)
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getItemQunatity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        getCartItemsProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContextProvider;
