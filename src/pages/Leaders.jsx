import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Leaders() {
   const [data, setData] = useState([])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('http://localhost:3001/redis')
            setData(response.data)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }
      fetchData()
   }, [])

   data.sort((a, b) => {
      return b.value - a.value
   })

   return (
      <div className="flex h-[100vh] w-[100wh] items-center justify-center bg-[var(--dark)]">
         <div className="m-8 h-[80vh] w-[100vh] rounded-md bg-[var(--grey)] p-4 shadow-xl">
            <h2 className="mb-2 text-2xl text-[var(--white)]">
               👑 Leader Board
            </h2>
            <table className="w-full text-[var(--white)]">
               <thead className="text-[var(--blue)]">
                  <tr>
                     <th className="py-2 text-left font-normal">Leaders</th>
                     <th className="py-2 text-right font-normal">Wins</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((item, index) => (
                     <tr key={index}>
                        <td className="py-2 text-left">
                           {index + 1 + ' - ' + item.key.replace('leader', '')}
                        </td>
                        <td className="py-2 text-right">{item.value}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default Leaders
