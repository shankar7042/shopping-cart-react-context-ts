import { useCart } from "../context/CartContext";

type ProductProps = {
  prod: Record<string, any>;
};

const Product: React.FC<ProductProps> = ({ prod }) => {
  const {
    increaseItemQuantity,
    getItemQunatity,
    decreaseItemQuantity,
    removeItem,
  } = useCart();

  return (
    <div
      key={prod.id}
      className="flex flex-col w-80 h-96 hover:scale-105 transition p-1 border border-neutral-500 shadow-xl rounded-lg"
    >
      <div className="h-1/2 w-full">
        <img
          loading="lazy"
          src={prod.thumbnail}
          alt={prod.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto flex flex-col h-1/2 w-full p-2 justify-end">
        <span className="text-lg font-semibold text-ellipsis mb-1">
          {prod.title}
        </span>
        <span className="text-sm font-light mb-4">Price: {prod.price}</span>
        {getItemQunatity(prod.id) === 0 ? (
          <button
            onClick={() => increaseItemQuantity(prod.id)}
            className="border-2 mb-3 bg-sky-500 hover:bg-sky-700 transition text-white rounded-lg py-2"
          >
            + Add to Cart
          </button>
        ) : (
          <>
            <div className="flex gap-4 justify-center items-center">
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
            <div className="mt-2 text-center">
              <button
                onClick={() => removeItem(prod.id)}
                className="flex justify-center items-center border-2 px-3 py-1 text-white w-full cursor-pointer bg-rose-500 hover:bg-rose-400 text-2xl rounded-md"
              >
                Remove Item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
