import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./(pages)/Auth";
import Profile from "./(pages)/profile/[id]";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
