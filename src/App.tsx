import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./(pages)/Auth";
import Profile from "./(pages)/profile/[id]";
import ProtectedRoute from "./firebase/auth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
