import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/Coindetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </div>
  );
}

export default App;
