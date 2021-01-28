import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions";
import { Redirect } from "react-router-dom";

let data = {
	username: "",
	email: "",
	password: "",
};

function LoginPage(props) {
	const [input, setInput] = useState(data);

	const onChangeInput = (e) => {
		setInput({ ...input, [e.target.id]: e.target.value });
	};
	const handleLogin = () => {
		props.loginAction(input);
	};

	if (props.userID) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<Input
				placeholder="username"
				type="text"
				id="username"
				onChange={onChangeInput}
			/>
			<Input
				placeholder="email"
				type="email"
				id="email"
				onChange={onChangeInput}
			/>
			<Input
				placeholder="password"
				type="password"
				id="password"
				onChange={onChangeInput}
			/>
			<Button onClick={handleLogin}>Login</Button>
		</div>
	);
}

const mapStateToProps = ({ user }) => {
	return {
		userID: user.id,
	};
};
export default connect(mapStateToProps, { loginAction })(LoginPage);
