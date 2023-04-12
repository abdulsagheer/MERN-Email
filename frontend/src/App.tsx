/** importing dependencies **/
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";

const { user } = useAppSelector((state) => state.auth.data);

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={!user && <Auth />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
};

export default App;
