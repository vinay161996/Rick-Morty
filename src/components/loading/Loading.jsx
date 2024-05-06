import "./Loading.css";
import loadingImg from "../../assets/loading.png";

const Loading = () => {
  return (
    <div className="fs-primary-heading fw-semi-bold container loading">
      <div className="loading-img">
        <img src={loadingImg} alt="loading" />
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
