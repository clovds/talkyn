const INITIAL_STATE = {
	id: null,
	username: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				id: action.payload.id,
				username: action.payload.username,
			};
		default:
			return state;
	}
};
