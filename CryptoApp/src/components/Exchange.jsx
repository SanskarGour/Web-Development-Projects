import {React} from "react";

const Exchange = (prop) => {
  const exchange = prop.exchange;  

  return (
    <div className="bg-black w-[100%]">
      <div className="py-[3rem] text-lg text-white flex h-[4.5rem] justify-between mx-auto items-center max-w-[1000px]">
        {/* Coin Logo */}
        <div className="w-[4rem] max-w-[10%]">
          <img
            className=" rounded-full"
            src={exchange.image}
            width="100%"
            alt="Coin Logo"
          />
        </div>

        {/* Coin Name */}
        <div className="flex min-w-[20%] max-w-[20%] justify-start">
          <h2>{exchange.name}</h2>
        </div>

        {/* Coin Price */}
        <div className="flex min-w-[10%] justify-end">
          <h2>{exchange.trade_volume_24h_btc.toFixed(2)}</h2>
        </div>

        {/* Coin Market Cap Rank */}
        <div className="flex min-w-[2%] justify-start">
          <h2>{exchange.trust_score_rank}</h2>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
