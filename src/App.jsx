import React, { useState, useEffect } from "react";

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat && lng) {
    fetchData();
    }
  }, [lat, lng]);
        

  const handleClick = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setLoading(false);
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          setLoading(false);
          setError(error.message);
        }
      );
    }
  };

  const fetchData = async () => {
    if (!lat || !lng) {
      return;
    }
    setFetching(true);
    try {
      const response = await fetch(
        `/.netlify/functions/fetchData?lat=${lat}&lng=${lng}`
      );
      const data = await response.json();
      setResults(data.results);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  return (
    <div className="md:min-w-[400px] w-full p-6 flex flex-col items-center">
      <button 
      onClick={handleClick}
      className='bg-violet-900 rounded-xl py-2 px-4 mx-auto flex md:mt-4 text-2xl'>
        Start
      </button>
      {loading && 
      <h2 className="py-2 px-2">Loading...</h2>
      }
      {fetching && 
      <h2 className="py-2 px-2">Fetching...</h2>
      }
      {error && <p>Error: {error}</p>}
      {results.map((result) => (
        <div key={result.lastChannel}>
          <h1 className="mt-4">Brugbare Frekvenser</h1>
          <p className="text-xs font-light italic mb-2">Med Guard Band</p>
          <ul>
            {result.frequencyAreas.map((frequencyArea, index) => (
              <li key={index}>{frequencyArea[0]} MHz - {frequencyArea[1]} MHz</li>
            ))}
          </ul>
          <h1 className="mt-4">Brugbare TV Kanaler</h1>
          <p className="text-xs font-light italic mb-2">Uden Guard Band</p>
          <ul>
            {result.tvChannelsNoGuardBand.map((tvChannel, index) => (
              <li key={index}>{tvChannel[0]} - {tvChannel[1]}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
