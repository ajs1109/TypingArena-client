import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthPage from "./components/Pages/AuthPage";
import HomePage from "./components/Pages/HomePage";
import SinglePlayer from "./components/Pages/SinglePlayer";
import MultiPlayer from "./components/Pages/MultiPlayer";

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [localStorage]);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={!user ? <AuthPage /> : <Navigate to="/game" />}
          />
          <Route
            path="/game"
            element={user ? <HomePage /> : <Navigate to="/" />}
          />
          <Route path="/singlePlayer" element={<SinglePlayer />} />
          <Route path="/multiPlayer" element={<MultiPlayer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
