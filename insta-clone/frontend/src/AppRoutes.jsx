import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register.jsx';
import Feed from './features/posts/pages/Feed.jsx'
import Createpost from "./features/posts/pages/Createpost.jsx";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<Createpost/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes