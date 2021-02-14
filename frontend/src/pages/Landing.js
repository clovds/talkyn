import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { api_url } from "../helpers";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { GoogleLogout } from "../components";
import { useGoogleLogout } from "react-google-login";
import { logoutAction } from "../redux/actions";
const clientId =
	"219326736476-lphp40b8k60kep1b0iqck8qdss64klet.apps.googleusercontent.com";
const socket = io(api_url, { transports: ["websocket"], upgrade: false });
// const messageInfo = {
// username:"",
// message:""
// }
function Landing(props) {
	const [count, setCount] = useState(0);
	const [chat, setChat] = useState([]);
	const [user, setUser] = useState(props.username ? props.username : "anon");
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		socket.on("JumlahUser", updateUserCount);
		socket.on("chat", updateChat);
		return () => {
			socket.off();
		};
	}, []);

	const updateUserCount = (num) => {
		setCount(num);
	};

	const updateChat = (obj) => {
		setChat((chat) => [...chat, obj]);
	};

	const click = (e) => {
		e.preventDefault();
		socket.emit("chat", { user, message });
		setMessage("");
	};
	const onLogoutSuccess = (res) => {
		console.log("Logged out Success");
		alert("Logged out Successfully ✌");
		dispatch(logoutAction());
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
		await signOut();
	};

	const { id } = useSelector((state) => state.user);
	if (id === null) {
		return <Redirect to="/login" />;
	}
	return (
		<div className="container">
			<button onClick={handleLogout}>logout</button>
			<h3 className=" text-center">Online User: {count}</h3>
			<div className="messaging">
				<div className="inbox_msg">
					<div className="mesgs">
						<div>
							{chat.map((val) => (
								<div>
									{val.user}:{val.message}
								</div>
							))}
						</div>
						<div className="type_msg">
							<form onSubmit={click}>
								<div className="input_msg_write">
									<input
										type="text"
										className="write_msg"
										placeholder="Type a message"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									<button className="msg_send_btn">Send</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
const mapStateToProps = ({ user }) => {
	return {
		userID: user.id,
		username: user.username,
	};
};
export default connect(mapStateToProps)(Landing);
