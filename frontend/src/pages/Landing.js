import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { api_url } from "../helpers";

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
	console.log(chat);
	return (
		<div className="container">
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
