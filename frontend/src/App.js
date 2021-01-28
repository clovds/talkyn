import React from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";

function App() {
	return (
		<div>
			<Route path="/" exact component={Landing} />
		</div>
	);
}

export default App;
