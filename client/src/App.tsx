import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import BookingForm from "./pages/BookingForm";
import EditProperty from "./pages/EditProperty";
import AddProperty from "./pages/AddProperty";
import LoginElement from "./pages/Login";
import PropertyForm from "./pages/PropertyForm";
import AdminView from "./pages/AdminView";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Properties />} />
          <Route path="/login" element={<LoginElement />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/add-property" element={<PropertyForm />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
