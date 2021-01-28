import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import Axios from "axios";
import { api_url } from "../helpers";

let data = {
  username: "",
  email: "",
  password: "",
};

function LoginPage() {
  const [input, setInput] = useState(data);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const loginPost = async () => {
    try {
      const response = await Axios.post(`${api_url}/users/login`, input);
    } catch (err) {}
  };

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
      <Button>Login</Button>
    </div>
  );
}

export default LoginPage;
