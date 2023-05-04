import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Profile from "./pages/Profile";
import LocalStorage from "./pages/Profile/LocalStorage";
import Login from "./components/db/Login.js";
import Register from "./components/db/Register.js";
import PokemonDetailsNewPage from "./components/PokemonDetailsNewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/LocalStorage" element={<LocalStorage />} />
          <Route path="/Login/" element={<Login />} />
          <Route path="/Register/" element={<Register />} />
          <Route path='/id/:pokemonid' element={<PokemonDetailsNewPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);