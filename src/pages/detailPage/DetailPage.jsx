import "./DetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

const DetailPage = () => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch character");
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        alert("Failed to fetch character info");
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) return <Loading />;
  return (
    <section>
      <article className="container character-page">
        <div className="character-header">
          <div className="character-img">
            <img src={character.image} alt="character-image" />
          </div>
          <h1 className="character-name fw-semi-bold fs-primary-heading">
            {character.name}
          </h1>
        </div>
        <article className="character-info">
          <h2 className="fs-600">Informations</h2>
          <div className="info-items">
            <div className="info-item">
              <h3 className="fw-semi-bold fs-500">Gender</h3>
              <span>{character.gender}</span>
            </div>
            <div className="info-item">
              <h3 className="fw-semi-bold fs-500">Status</h3>
              <span>{character.status}</span>
            </div>
            <div className="info-item">
              <h3 className="fw-semi-bold fs-500">Species</h3>
              <span>{character.species}</span>
            </div>
            <div className="info-item">
              <h3 className="fw-semi-bold fs-500">Origin</h3>
              <span>{character.origin?.name}</span>
            </div>
            <div className="info-item">
              <h3 className="fw-semi-bold fs-500">Type</h3>
              <span>{character.type || "unknown"}</span>
            </div>
            <div className="info-item">
              <h3 className="fw-semi-bold fs-500">Location</h3>
              <span>{character.location?.name}</span>
            </div>
          </div>
        </article>
      </article>
    </section>
  );
};

export default DetailPage;
