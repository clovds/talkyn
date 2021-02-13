import React from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function App() {
	return (
		<div>
			<Header />
			<Route path="/" exact component={Landing} />
			<Route path="/login" component={LoginPage} />
		</div>
	);
}

export default App;
