import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Error from "./components/Error";
import About from "./components/About";
import Admin from "./components/Admin";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import "./style/app.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import PaymentSuccess from "./components/PaymentSuccess";
import MyItems from "./components/MyItems";

function App() {
  const isAdmin = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token")).isAdmin
    : false;

  const Protected = ({ children }) => {
    const isToken = localStorage.getItem("token") ? true : false;
    if (!isToken)
      return (
        <Navigate
          to={"/login"}
          replace={true}
        ></Navigate>
      );
    return children;
  };

  const AdminProtect = ({ children }) => {
    const isToken = localStorage.getItem("token") ? true : false;
    if (!isToken) {
      return (
        <Navigate
          to={"/login"}
          replace={true}
        ></Navigate>
      );
    } else {
      if (!jwtDecode(localStorage.getItem("token")).isAdmin) {
        return (
          <Navigate
            to={"/login"}
            replace={true}
          ></Navigate>
        );
      }
    }
    return children;
  };

  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/products"
          element={<AllProducts />}
        />
        <Route
          path="/product/:id"
          element={<SingleProduct />}
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/myitems"
          element={
            <Protected>
              <MyItems />
            </Protected>
          }
        />
        <Route
          path="/paymentsuccess"
          element={
            <Protected>
              <PaymentSuccess />
            </Protected>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <AdminProtect>
              <Admin type={"users"} />
            </AdminProtect>
          }
        />
        <Route
          path="/dashboard/items"
          element={
            <AdminProtect>
              <Admin type={"items"} />
            </AdminProtect>
          }
        />
        <Route
          path="/dashboard/createitem"
          element={
            <AdminProtect>
              <Admin type={"createitem"} />
            </AdminProtect>
          }
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
      {!isAdmin && <Footer />}
    </Router>
  );
}

export default App;
