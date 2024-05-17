import React, { useState } from "react";

const getAuthToken = (): string | null => {
  return window.localStorage.getItem('auth_token');
};

const setAuthHeader = (token: string | null): void => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

export function Login() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: login, password: password })
      });

      if (response.status === 200) {
        const data = await response.json();
        setAuthHeader(data["token"]);
      } else {
        setAuthHeader(null);
      }
    } catch (error) {
      console.error("Error during the login process", error);
      setAuthHeader(null);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="login">Login</label>
        <input
          name="login"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
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
