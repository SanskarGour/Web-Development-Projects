import {React , useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

const Coin = (prop) => {
  const coin = prop.coin;
  const {setCurrency , currency} = useContext(AppContext);
  const profit = coin.price_change_percentage_24h>0;

  const changeCurrency = () => {
    if(currency === 'usd') setCurrency('inr');
    else setCurrency('usd');
  };

  const symbol = ()=>{
    if(currency === 'usd') return '$';
    else return '₹';
  };

  return (
    <div className="bg-black w-[100%]">
      <div className="py-[3rem] text-lg uppercase text-white flex h-[4.5rem] justify-between mx-auto items-center max-w-[1000px]">
        {/* Coin Logo */}
        <div className="w-[4rem] max-w-[10%]">
          <img
            className=" rounded-full"
            src={coin.image}
            width="100%"
            alt="Coin Logo"
          />
        </div>

        {/* Coin Name */}
        <div className="flex min-w-[20%] justify-start hover:cursor-pointer">
          <NavLink to={`/coins/${coin.id}`}>
            <h2>{coin.id}</h2>
          </NavLink>
        </div>

        {/* Coin Price */}
        <div className="flex min-w-[10%] justify-end" onClick={changeCurrency}>
          <h2>{symbol()}{coin.current_price}</h2>
        </div>

        {/* Coin Market Cap Rank */}
        <div className="flex min-w-[2%] justify-start">
          <h2 className={profit ? ("text-green-600 hover:cursor-pointer") : ("text-red-600 hover:cursor-pointer")} >
            {profit ? "+" + coin.price_change_percentage_24h : coin.price_change_percentage_24h }
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Coin;
