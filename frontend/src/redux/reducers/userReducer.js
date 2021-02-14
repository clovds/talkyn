const INITIAL_STATE = {
	id: null,
	email: "",
	google_login: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.user_email,
				google_login: action.payload.user_google_login,
			};
		case "LOGOUT":
			return {
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};
