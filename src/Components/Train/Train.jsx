import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
const Train = ({ trains, headers }) => {
    const navigate = useNavigate();
    const onBookTicket = (selectedTrain) => {
        // Implement your booking logic here
        console.log(`Booking ticket for train: ${selectedTrain.trainName}`);
        navigate(`/booking/${selectedTrain.trainName}`);
                  
        // You can also navigate to a booking page or perform other actions
    };    
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
                      <td key={header}>{train[header]}</td>
                    ))}
                    <td>
                    {/* Use Link for navigation to a booking page */}
                    {/* <Link to={`/booking/${train.trainId}`}> */}
                        <button className='bookbtn' type='button' onClick={() => onBookTicket(train)}>
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
    )
}

export default Train