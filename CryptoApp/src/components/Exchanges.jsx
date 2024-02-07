import Exchange from "./Exchange";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Exchanges = () => {
  const url = "https://api.coingecko.com/api/v3/exchanges";
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setExchanges(response.data);
        console.log(exchanges);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black w-[100%]">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[100%] h-[100vh] bg-black">
          {exchanges.map((exchange, index) => (
            <Exchange exchange={exchange} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Exchanges;
