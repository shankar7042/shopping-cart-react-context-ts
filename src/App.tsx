import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import CartContextProvider from "./context/CartContext";

function App() {
  return (
    <CartContextProvider>
      <div className="w-full lg:w-4/5 mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </CartContextProvider>
  );
}

export default App;
