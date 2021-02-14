import axios from "axios";
import { api_url } from "../../helpers";

export const loginAction = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/login`, data);
			localStorage.setItem("token", response.data.token);
			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
};

export const loginWithGoogleAction = (token) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/google-login`, {
				token,
			});
			console.log(response);
			localStorage.setItem("token", response.data.token);
			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const keepLoginAction = (token) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/keep-login`, {
				token,
			});
			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const logoutAction = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: "LOGOUT",
			});
			localStorage.clear();
		} catch (err) {
			console.log(err);
		}
	};
};
