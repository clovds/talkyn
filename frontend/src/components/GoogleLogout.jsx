import React from "react";
import { useGoogleLogout } from "react-google-login";
import google from "../assets/img/google.svg";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions";
const clientId =
	"219326736476-lphp40b8k60kep1b0iqck8qdss64klet.apps.googleusercontent.com";

function GoogleLogout() {
	const dispatch = useDispatch();
	const onLogoutSuccess = (res) => {
		console.log("Logged out Success");
		alert("Logged out Successfully ✌");
	};

	const onFailure = () => {
		console.log("Handle failure cases");
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});
	const handleLogout = async () => {
		try {
			await dispatch(logoutAction());
			signOut();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<button
			className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
			style={{ transition: "all .15s ease" }}
			onClick={handleLogout}
		>
			<img alt="..." className="w-5 mr-1" src={google} />
			Logout
		</button>
	);
}

export default GoogleLogout;
