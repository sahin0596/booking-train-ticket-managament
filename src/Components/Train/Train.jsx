import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Train = ({ trains, headers }) => {
  const navigate = useNavigate();
  const onBookTicket = (selectedTrain) => {
    // Implement your booking logic here
    console.log(`Booking ticket for train: ${selectedTrain.trainName}`);
    navigate(`/booking/${selectedTrain.trainDescription}`);

    // You can also navigate to a booking page or perform other actions
  };

  const renderObject = (obj) => {
    // Example: Render classes array
    if (Array.isArray(obj) && obj.length > 0) {
      return obj.map((item, index) => (
        <div key={index}>
          Class: {item.className}, Seats: {item.totalSeats}
        </div>
      ));
    }

    // Example: Render stops array
    if (Array.isArray(obj) && obj.length > 0) {
      return obj.map((item, index) => (
        <div key={index}>
          Station: {item.stationName}, Arrival: {item.arrivalTime}, Departure:{" "}
          {item.departureTime}
        </div>
      ));
    }

    // Handle other cases or nested structures as needed
    return JSON.stringify(obj);
  };

//   return (
//     <div>
//       {trains.length > 0 ? (
//         <table className="details-table">
//           <thead>
//             <tr>
//               {headers.map((header) => (
//                 <th key={header}>{header}</th>
//               ))}
//               <th>Book Ticket</th>
//             </tr>
//           </thead>
//           <tbody>
//             {trains.map((train, index) => (
//               <tr key={index}>
//                 {headers.map((header) => (
//                   <td key={header}>
//                     {/* Check if the current value is an object, and render accordingly */}
//                     {typeof train[header] === "object"
//                       ? renderObject(train[header])
//                       : train[header]}
//                   </td>
//                 ))}
//                 <td>
//                   {/* Use Link for navigation to a booking page */}
//                   {/* <Link to={`/booking/${train.trainId}`}> */}
//                   <button
//                     className="bookbtn"
//                     type="button"
//                     onClick={() => onBookTicket(train)}
//                   >
//                     Book Ticket
//                   </button>
//                   {/* </Link> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No train details available.</p>
//       )}
//     </div>
//   );
// };

return (
  <div>
    {trains.length > 0 ? (
      <table className="details-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            
            <th>Book Ticket</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>
                  {/* Check if the current value is an object, and render accordingly */}
                  {typeof train[header] === "object"
                    ? renderObject(train[header])
                    : train[header]}
                </td>
              ))}
              <td>
                {/* Use Link for navigation to a booking page */}
                {/* <Link to={`/booking/${train.trainId}`}> */}
                <button
                  className="bookbtn"
                  type="button"
                  onClick={() => onBookTicket(train)}
                >
                  Book Ticket
                </button>
                {/* </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No train details available.</p>
    )}
  </div>
);
};

export default Train;
