import axios from "axios";
import { api_url } from "../../helpers";

export const loginAction = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/login`, data);
			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
};
