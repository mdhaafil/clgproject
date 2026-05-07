import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/contact.jsx";
import Admin from "./pages/Admin.jsx";
import Addproduct from "./pages/Addproduct.jsx";
import Menu from "./pages/Menu.jsx";
import UpdateProduct from "./pages/updateProduct.jsx";
import Update from "./pages/Update.jsx";
import PaymentPage from "./pages/Payment.jsx";
import SeatSelection from "./pages/SeatSelection.jsx";
import CartPage from "./pages/CartPage.jsx";
import ReceiptPage from "./pages/ReciptPage.jsx";
import FoodTracking from "./pages/FoodTracking.jsx";
import Orderview from "./pages/Orderview.jsx";
import Login from "./pages/Login.jsx";
import OrderIssue from "./supports/OrderIssue.jsx";
import RefundPolicy from "./supports/Refund.jsx";
import TermsConditions from "./supports/TermsAndConditions.jsx";
import HelpCenter from "./supports/Help.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/updates/:id" element={<UpdateProduct />} />
        <Route path="/update" element={<Update />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/orderissue" element={<OrderIssue />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        <Route path="/termsandconditions" element={<TermsConditions />} />
        <Route path="/receipt/:id" element={<ReceiptPage />} />
        <Route path="/cartnew" element={<CartPage />} />
        <Route path="/orders" element={<Orderview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/track/:id" element={<FoodTracking />} />
        <Route path="/seatselection" element={<SeatSelection />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
