import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const { setCurrency, currency , days, setDays} = useContext(AppContext);
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
  
  const fetchData = async () => {
    try {
      const {data} = await axios.get(url);
      setChartData(data.prices);
      console.log(chartData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {  
    fetchData();
  }, []);

  const myData = {
    labels: chartData.map((value)=>{
     const date = new Date(value[0])
     const time = 
     date.getHours()> 12 
     ? `${date.getHours() -12} : ${date.getMinutes()} PM` 
     : `${date.getHours()} : ${date.getMinutes()} AM`
      return days===1 ? time : date.toLocaleDateString() 
    }), 
    datasets:[
      {
        label: ` Price in Past Days ${days} in ${currency} `,
        data: chartData.map((value)=>value[1]),
        borderColor: 'orange',
        borderWidth: '3' 
      }
    ]
  }

  return (
    <div>
      {
        chartData.length === 0 ? ( <Loader  />) : 
        (
          <div className="min-w-[800px]">
            <Line data={myData} options={{
              elements:{
                point:{
                  radius:0.5,
                }
              }
            }}/>
          </div>
        )
      }
    </div>
  );
};

export default CoinChart;
