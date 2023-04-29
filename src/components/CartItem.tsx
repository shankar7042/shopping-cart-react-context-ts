import { Product, useCart } from "../context/CartContext";
import deleteIcon from "../assets/delete.svg";

type CartItemProps = {
  prod: Product;
};

const CartItem: React.FC<CartItemProps> = ({ prod }) => {
  const {
    getItemQunatity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useCart();

  return (
    <div className="rounded-md border border-black mb-4 p-4 shadow-lg">
      <div className="flex gap-10 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <img
              src={prod.thumbnail}
              alt={prod.title}
              loading="lazy"
              height={100}
              width={100}
            />
          </div>
          <div className="flex flex-col">
            <span>{prod.title}</span>
            <span>{prod.description}...</span>
            <span>Price: {prod.price}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => decreaseItemQuantity(prod.id)}
              className="border-2 px-3 font-semibold cursor-pointer hover:bg-neutral-400 text-2xl rounded-md"
            >
              -
            </button>
            <span>{getItemQunatity(prod.id)}</span>
            <button
              onClick={() => increaseItemQuantity(prod.id)}
              className="flex justify-center items-center border-2 px-3 font-semibold cursor-pointer hover:bg-neutral-400 text-2xl rounded-md"
            >
              +
            </button>
          </div>
          <div>
            <button
              onClick={() => removeItem(prod.id)}
              className="h-8 w-12 flex justify-center items-center border-2 px-3 py-4 text-white cursor-pointer bg-rose-500 hover:bg-rose-400 text-2xl rounded-md"
            >
              <img
                src={deleteIcon}
                alt="Remove Item from cart"
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
