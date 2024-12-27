import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Landing from "./pages/Landing";

function AppContent() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
