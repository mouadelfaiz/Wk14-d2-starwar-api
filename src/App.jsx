import React, { useEffect, useState } from "react";
import "./App.css";
import { getUrl } from "../services/sw-api";
import Cards from "./components/Cards";
import Box from "./components/Box";

function App() {
  const [ships, setShips] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUrl("https://swapi.dev/api/starships/");
        setData(response);
        setShips(response.results); // Set the ships state
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  const getNextSet = async () => {
    try {
      if (data && data.next) {
        const response = await getUrl(data.next);
        setData(response);
      } else {
        alert("No more Pages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stepBack = async () => {
    try {
      if (data && data.previous) {
        const response = await getUrl(data.previous);
        setData(response);
      } else {
        alert("You are on the first page");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayData = () => {
    return (
      <div className="cards-container">
        {ships.map((ship, i) => (
          <Cards key={i} ship={ship.name} />
        ))}
      </div>
    );
  };

  const displayLoading = () => {
    return (
      <div className="loading-container">
        <dialog open>
          <article aria-busy="true">Please wait</article>
        </dialog>
      </div>
    );
  };

  return (
    <div className="container">
        <nav className="navbar">
        <h1>STAR WARS STARSHIPS</h1>
      </nav>
      {showBox && <Box />}
      <h1>Star Wars</h1>
      <div>{loading ? displayLoading() : <p></p>}</div>
      {data !== null ? displayData() : <p></p>}
      <div className="button">
        <button className="outline" onClick={stepBack}>
          Go Back
        </button>
        <button className="outline" onClick={getNextSet}>
          See more
        </button>
      </div>
    </div>
  );
}

export default App;
