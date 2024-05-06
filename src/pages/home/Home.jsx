import "./Home.css";
import banner from "../../assets/banner.png";
import Card from "../../components/card/Card";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import NoCharacter from "../../components/noCharacter/NoCharacter";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    name: "",
    status: "",
    gender: "",
  });

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const handleFilterData = (data) => {
    setCurrentPage(0);
    setFilterData((prev) => ({ ...prev, [data.target.id]: data.target.value }));
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${
            currentPage + 1
          }&name=${filterData.name}&status=${filterData.status}&gender=${
            filterData.gender
          }`
        );
        if (!res.ok) throw new Error("Failed to fetch character");
        const data = await res.json();
        setTotalPage(data.info.pages);
        setCharacters(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filterData, currentPage]);

  return (
    <main>
      <section className="container banner">
        <img src={banner} alt="banner" />
      </section>
      <section className="container">
        <div className="search-filter fs-400">
          <input
            id="name"
            value={filterData.name}
            onChange={handleFilterData}
            placeholder="Search by name"
            type="text"
          />
          <select
            id="status"
            value={filterData.status}
            onChange={handleFilterData}
            name="status"
            className="select-box"
          >
            <option value="">Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            id="gender"
            value={filterData.gender}
            onChange={handleFilterData}
            className="select-box"
            name="gender"
          >
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </section>
      {loading && <Loading />}
      {!error ? (
        <>
          <section className="container characters">
            {characters.map((item) => (
              <Card
                id={item.id}
                key={item.id}
                image={item.image}
                name={item.name}
                species={item.species}
              />
            ))}
          </section>
          <div className="container pagination">
            <ReactPaginate
              breakLabel={"..."}
              pageCount={totalPage}
              forcePage={currentPage}
              marginPagesDisplayed={3}
              containerClassName={"pagination fs-400"}
              pageClassName={"page-item"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              breakClassName={"page-item"}
              activeClassName={"pagination-active"}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <NoCharacter />
      )}
    </main>
  );
};

export default Home;
