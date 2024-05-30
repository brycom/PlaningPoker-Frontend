import { useState } from "react";
import "./register.css"

interface Props {
  url:string;
  selectedOption:string;
  setSelectedOption:Function;
}
export function Register(props:Props) {
    const [userName, setUserName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
  
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
  
      try {
        const response = await fetch(props.url+"/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: userName, firstName: firstName, lastName: lastName, password: password, email: email })
        });
  
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          props.setSelectedOption("Login")
          
        } else {
          console.log("FEL!");
          
        }
      } catch (error) {
        console.error("Error during the login process", error);
        
      }
    };
  
    return (
      <form className="register-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="userName">Userame</label>
          <input
            name="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
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
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
  
        <button type="submit">Register</button>
      </form>
    );
  }
  
  export default Register;
  