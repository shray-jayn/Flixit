import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import "./Home.scss";
import { BACKEND_URL } from "../../environment/config";

interface ListItem {
  _id: string;
  title: string;
  content: string[];
}

interface HomeProps {
  type?: string;
}

const Home: React.FC<HomeProps> = ({ type }) => {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [genre, setGenre] = useState<string | null>(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          throw new Error("User not found in localStorage");
        }

        const token = `Bearer ${JSON.parse(user).accessToken}`;
        const res = await axios.get(
          `${BACKEND_URL}/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers: { Authorization: token },
          },
        );

        setLists(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
