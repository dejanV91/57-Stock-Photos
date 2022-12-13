import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
// key : l0s9AheB325heFe16vleHxLkfrDd5JRn1Eis3CABSBM;
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    const pageUrl = `&page=${page}`;
    const queryUrl = `&query=${query}`;

    let url = `${mainUrl}${clientID}${pageUrl}`;
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data];
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });

    return () => window.addEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
      </section>
      {loading && <h2 className="loading">Loading...</h2>}
    </main>
  );
}

export default App;
