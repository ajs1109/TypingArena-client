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
import CreateRoom from "./components/Pages/CreateRoom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header";
import { AuthProtectedRoutes, publicRoutes } from "./routes";
import AuthMiddleware from "./routes/route";

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
          {publicRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={route.component}
              exact={true}
            />
          ))}
          {AuthProtectedRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={
                <AuthMiddleware>
                  <Layout>{route.component}</Layout>
                </AuthMiddleware>
              }
              // exact={true}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
