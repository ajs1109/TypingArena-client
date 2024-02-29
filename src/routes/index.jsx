import AuthPage from "../components/Pages/AuthPage.jsx";
import CreateRoom from "../components/Pages/CreateRoom.jsx";
import HomePage from "../components/Pages/HomePage.jsx";
import MultiPlayer from "../components/Pages/MultiPlayer.jsx";
import SinglePlayer from "../components/Pages/SinglePlayer.jsx";

const AuthProtectedRoutes = [
    {path:'/game', component: <HomePage/>},
    {path:'/singlePlayer', component: <SinglePlayer/>},
    {path:'/multiPlayer', component: <MultiPlayer/>},
    {path:'/multiPlayer/:id', component: <CreateRoom/>},
]
const publicRoutes = [
    {path:'/', component: <AuthPage/>},
]

export {publicRoutes, AuthProtectedRoutes};