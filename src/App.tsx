import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:code" element={<Detail />} />
        <Route path="/indicators/:code" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
