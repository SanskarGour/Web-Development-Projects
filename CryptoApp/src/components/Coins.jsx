import axios from "axios";
import React, { useEffect, useState , useRef , useContext} from "react";
import Coin from "./Coin";
import Loader from "./Loader";
import { AppContext } from "../context/AppContext";

const Coins = () => {
  const {currency} = useContext(AppContext);
  const url =
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setCoins(response.data);
        console.log(coins);
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
        <Loader className='w-full h-[100vh]'/>
      ) : (
        
        <div className="w-[100%] h-[100vh] bg-black">
          {/* <div className="w-[1000px] bg-black text-white mx-auto h-[2.5rem] flex justify-end items-center rounded-lg ">
          <input
            className="min-w-[23rem] min-h-full pl-2 rounded-xl bg-black border-slate-800 border-[0.5px] placeholder-slate-400"
            type="text"
            placeholder="  Search Coin..."
            id="msg"
            name="msg"
            onChange={(e)=>setSearch(e.target.value)}
          />
          </div> */}

          {coins.map((coin, index) => (
            <Coin coin={coin} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Coins;
