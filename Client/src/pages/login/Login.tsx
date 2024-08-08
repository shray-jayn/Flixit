import { useState, FormEvent } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../../api/axiosPublic";
import { userState } from "../../recoil/atoms/authAtom";
import "./Login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.post("/auth/login", { email, password });
      const { user, accessToken } = res.data;
      setUser({ ...user, accessToken });
      localStorage.setItem("user", JSON.stringify({ ...user, accessToken }));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit">
            Sign In
          </button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
