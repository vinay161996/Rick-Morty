import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ name, species, image, id }) => {
  const navigate = useNavigate();

  return (
    <article onClick={() => navigate(`/${id}`)} id={id} className="card">
      <div className="card-image">
        <img src={image} alt="characterLogo" />
      </div>
      <div className="card-data">
        <h1 className="fs-600 fw-bold">{name}</h1>
        <p>{species}</p>
      </div>
    </article>
  );
};

export default Card;
