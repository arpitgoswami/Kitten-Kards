import React from "react";

function Leaders() {
  const leaders = [
    { username: "user1", wins: 10 },
    { username: "user2", wins: 20 },
    { username: "user3", wins: 30 },
    { username: "user4", wins: 40 },
  ];

  return (
    <div className="w-[100wh] h-[100vh] bg-[#222831] flex justify-center items-center">
      <div className="bg-[#393E46] rounded-md shadow-xl p-4 m-8 w-[100vh] h-[80vh]">
        <h2 className="text-2xl text-[#EEEEEE] mb-2">Leader Board</h2>
        <table className="w-full text-[#EEEEEE]">
          <thead>
            <tr>
              <th className="text-left py-2 font-normal">Username</th>
              <th className="text-right py-2 font-normal">Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader.username}>
                <td className="text-left py-2">{leader.username}</td>
                <td className="text-right py-2">{leader.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaders;
