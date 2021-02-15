import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import LoginPage from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { keepLoginAction } from "./redux/actions";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			console.log(token);
			dispatch(keepLoginAction(token));
		}
	}, []);
	return (
		<div>
			<Route path="/" exact component={Landing} />
			<Route path="/login" component={LoginPage} />
		</div>
	);
}

export default App;
