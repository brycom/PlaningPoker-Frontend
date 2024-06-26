import React, { useState } from "react";
import "../css/login.css"

const setAuthHeader = (token: string | null): void => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};
interface Props {
  url: string;
}

export function Login(props: Props) {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const response = await fetch(props.url + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setAuthHeader(data["token"]);
        localStorage.setItem("userId", data.user.userId);
        window.location.href = "/";
      } else {
        setAuthHeader(null);
      }
    } catch (error) {
      console.error("Error during the login process", error);
      setAuthHeader(null);
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
  <div>
    <label htmlFor="login">Login</label>
    <input
      name="login"
      value={username}
      onChange={(event) => setUserName(event.target.value)}
    />
  </div>

  <div>
    <label htmlFor="password">Password</label>
    <input
      name="password"
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
  </div>

  <button type="submit">Sign In</button>
</form>

  );
}

export default Login;
