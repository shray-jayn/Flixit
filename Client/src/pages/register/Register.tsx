import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/authAtom";
import axiosPublic from "../../api/axiosPublic";
import "./Register.scss";
import { AxiosError } from "axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleStart = () => {
    if (emailRef.current) {
      setEmail(emailRef.current.value);
    }
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    if (username && password) {
      try {
        const res = await axiosPublic.post("/auth/register", { email, username, password });
        const { user, accessToken } = res.data;
        setUser({ ...user, accessToken });
        localStorage.setItem("user", JSON.stringify({ ...user, accessToken }));
        navigate("/");
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          console.error("Registration failed", err.response.data);
        } else {
          console.error("An unknown error occurred", err);
        }
      }
    } else {
      console.error("Username and password are required");
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
          <button className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input" onSubmit={handleFinish}>
            <input type="text" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" type="submit">
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
