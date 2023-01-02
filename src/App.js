import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Error from "./components/Error";
import About from "./components/About";
import "./style/app.css";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/ZenStore" element={<Home />} />
        <Route path="/ZenStore/contact" element={<Contact />} />
        <Route path="/ZenStore/about" element={<About />} />
        <Route path="/ZenStore/products" element={<AllProducts />} />
        <Route path="/ZenStore/product/:id" element={<SingleProduct />} />
        <Route path="/ZenStore/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
