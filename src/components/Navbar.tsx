import { NavLink } from "react-router-dom";
import cartImg from "../assets/shopping-cart.png";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  const totalItems = () => {
    return cartItems.reduce((acc, curr) => curr.qty + acc, 0);
  };

  return (
    <div className="flex justify-between items-center shadow-md bg-neutral-200">
      <div className="p-4">
        <ul className="flex gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "bg-gray-500 p-2 rounded-sm text-white" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "bg-gray-500 p-2 rounded-sm text-white" : ""
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "bg-gray-500 p-2 rounded-sm text-white" : ""
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-12 h-12 mr-4 cursor-pointer rounded-full border-2 border-black p-3 relative">
        <img src={cartImg} alt="Cart" className="w-full h-full" />
        <span className="absolute text-xs right-[-5px] bottom-[-5px] bg-blue-500 rounded-full p-1 text-white font-bold">
          {totalItems()}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
