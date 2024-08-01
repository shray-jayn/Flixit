import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import "./Home.scss";

interface HomeProps {
  type?: string;
}

const Home: React.FC<HomeProps> = ({ type }) => {
  return (
    <div>
      <Navbar/>
    </div>
  );
}

export default Home;
