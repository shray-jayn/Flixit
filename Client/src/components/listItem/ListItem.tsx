import "./ListItem.scss";
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

interface Movie {
  trailer: string;
  duration: string;
  limit: string;
  year: string;
  desc: string;
  genre: string;
  imgSm: string;
}

interface ListItemProps {
  index: number;
  item: string;
}

const ListItem: React.FC<ListItemProps> = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get(`/movies/find/${item}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to="/watch" state={{ movie }}>
      <div
        className="listItem"
        style={{ left: isHovered ? index * 225 - 50 + index * 2.5 : 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {movie && (
          <>
            <img src={movie.imgSm} alt="" />
            {isHovered && (
              <>
                <video src={movie.trailer} autoPlay={true} loop />
                <div className="itemInfo">
                  <div className="icons">
                    <PlayArrow className="icon" />
                    <Add className="icon" />
                    <ThumbUpAltOutlined className="icon" />
                    <ThumbDownOutlined className="icon" />
                  </div>
                  <div className="itemInfoTop">
                    <span>{movie.duration}</span>
                    <span className="limit">+{movie.limit}</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className="desc">{movie.desc}</div>
                  <div className="genre">{movie.genre}</div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
