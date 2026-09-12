import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import Shop from "./pages/Shop";
import Character from "./pages/Character";
import Inventory from "./pages/Inventory";

import DashboardLayout from "./layouts/DashboardLayout";
import { GameProvider } from "./context/GameContext";

function App() {
    return (
        <GameProvider>

            <BrowserRouter>

                <Routes>

                    {/* PUBLIC PAGES */}

                    <Route
                        path="/"
                        element={<Landing />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* APPLICATION PAGES */}

                    <Route element={<DashboardLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/quests"
                            element={<Quests />}
                        />

                        <Route
                            path="/shop"
                            element={<Shop />}
                        />

                        <Route
                            path="/character"
                            element={<Character />}
                        />

                        <Route
                            path="/inventory"
                            element={<Inventory />}
                        />

                    </Route>

                </Routes>

            </BrowserRouter>

        </GameProvider>
    );
}

export default App;