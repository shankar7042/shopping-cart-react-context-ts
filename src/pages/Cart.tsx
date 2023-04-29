import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { getCartItemsProduct, getItemQunatity } = useCart();
  const cartProducts = getCartItemsProduct();

  const totalSumMoney = (): number => {
    return cartProducts.reduce(
      (acc, curr) => acc + curr.price * getItemQunatity(curr.id),
      0
    );
  };

  return (
    <div className="mt-4 p-4 shadow-md">
      {cartProducts?.map((item) => (
        <CartItem key={item.id} prod={item} />
      ))}
      <div className="text-end font-bold text-xl">Total: {totalSumMoney()}</div>
    </div>
  );
};

export default Cart;
