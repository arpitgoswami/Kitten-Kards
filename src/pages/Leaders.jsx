import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/redis");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  data.sort((a, b) => {
    return b.value - a.value;
  });

  return (
    <div className="w-[100wh] h-[100vh] bg-[#222831] flex justify-center items-center">
      <div className="bg-[#393E46] rounded-md shadow-xl p-4 m-8 w-[100vh] h-[80vh]">
        <h2 className="text-2xl text-[#EEEEEE] mb-2">Leader Board</h2>
        <table className="w-full text-[#EEEEEE]">
          <thead>
            <tr>
              <th className="text-left py-2 font-normal">Leaders</th>
              <th className="text-right py-2 font-normal">Wins</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="text-left py-2">
                  {item.key.replace("leader", "")}
                </td>
                <td className="text-right py-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaders;
