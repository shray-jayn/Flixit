import React from 'react';

interface HomeProps {
  type?: string;
}

const Home: React.FC<HomeProps> = ({ type }) => {
  return (
    <div>
      <h1>This is Home</h1>
      {type && <p>Type: {type}</p>}
    </div>
  );
}

export default Home;
