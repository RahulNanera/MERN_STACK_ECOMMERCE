import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer/Footer";
import Mens_banner from "./components/assets/banner_mens.png";
import Womens_banner from "./components/assets/banner_women.png";
import Kids_banner from "./components/assets/banner_kids.png";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={Mens_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={Womens_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={Kids_banner} category="kid" />}
        />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
