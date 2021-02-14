import React from "react";
import { useGoogleLogin } from "react-google-login";
// import { refreshTokenSetup } from "../helpers/refreshToken";
// import googleicon from "../assets/google-icon.svg";
import { connect } from "react-redux";
import { loginWithGoogleAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "dotenv/config";
import google from "../assets/img/google.svg";
// import { Button } from "reactstrap";
const clientId =
	"219326736476-lphp40b8k60kep1b0iqck8qdss64klet.apps.googleusercontent.com";

function GoogleLogin(props) {
	const dispatch = useDispatch();
	const onSuccess = (res) => {
		console.log("Login Success: currentUser:", res.profileObj);
		const token = res.tokenId;
		// props.loginWithGoogleAction(token);
		dispatch(loginWithGoogleAction(token));
		// refreshTokenSetup(res);
	};
	const onFailure = (res) => {
		console.log("Login failed: res:", res);
		alert(`Failed to login.`);
	};
	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: "offline",
		// responseType: 'code',
		// prompt: 'consent',
	});
	return (
		// <Button onClick={signIn} className="button" color="light">
		// 	<img src={googleicon} alt="google login" className="icon" height="18px" />

		// 	<span className="buttonText "> Continue with Google</span>
		// </Button>
		<button
			className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
			style={{ transition: "all .15s ease" }}
			onClick={signIn}
		>
			<img alt="..." className="w-5 mr-1" src={google} />
			Google
		</button>
	);
}

export default GoogleLogin;
