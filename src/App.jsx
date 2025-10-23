import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Menu from "./components/Menu/Menu";
import Dashboard from "./pages/Dashboard/Dashboard";
import Clientes from "./pages/Clientes/Clientes";
import Advogados from "./pages/Advogados/Advogados";
import Processos from "./pages/Processos/Processos";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <div className="app">
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/advogados" element={<Advogados />} />
            <Route path="/processos" element={<Processos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
