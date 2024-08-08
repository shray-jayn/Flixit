import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/authAtom";
import axiosPublic from "../../api/axiosPublic";
import "./Register.scss";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
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
    if (passwordRef.current && usernameRef.current) {
      setPassword(passwordRef.current.value);
      setUsername(usernameRef.current.value);
      try {
        const res = await axiosPublic.post("/auth/register", { email, username, password });
        const { user, accessToken } = res.data;
        setUser({ ...user, accessToken });
        localStorage.setItem("user", JSON.stringify({ ...user, accessToken }));
        navigate("/");
      } catch (err) {
        console.error(err);
      }
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
