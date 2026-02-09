import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";
import Profile from "./pages/profile/[id]";
import ProtectedRoute, { AuthListener } from "./firebase/auth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthListener />}>
                    <Route path="/" element={<Auth />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile/:id" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
