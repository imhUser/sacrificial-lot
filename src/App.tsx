import "./App.css";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Confirmation from "./pages/Confirmation";
import Finalization from "./pages/Finalization";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/confirmation" element={<Confirmation/>}/>
          <Route path="/finalization" element={<Finalization/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
