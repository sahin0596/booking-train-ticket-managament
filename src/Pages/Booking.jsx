import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createBooking } from "../services/api";
import { Form, FormGroup, Button } from "reactstrap";

const Booking = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Fetch booking details using bookingId (Assuming you have an endpoint to get individual booking details)
    // Example: create another API function in api.js to get booking details by ID
    // const fetchBookingDetails = async () => {
    //   try {
    //     const response = await axios.get(`${base_url}/GetBooking/${bookingId}`);
    //     setBookingDetails(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // Uncomment the line below if you have a function to fetch booking details
    // fetchBookingDetails();
  }, [bookingId]);

  const dynamicBookingData = {
    bookingId: 1,
    trainId: 123,
    passengerId: 456,
    travelDate: "2024-01-12T05:28:28.231Z",
    bookingDate: "2024-01-12T05:28:28.231Z",
    totalSeats: 2,
    TrainAppBookingPassengers: [
      {
        bookingPassengerId: 12,
        bookingId: 1,
        passengerName: "John Doe",
        seatNo: 1,
        age: 30,
      },
    ],
  };

  const handleCreateBooking = () => {
    // Call the createBooking function with the dynamicBookingData
    createBooking(dynamicBookingData)
      .then((response) => {
        // Handle success, e.g., redirect to a confirmation page
        console.log("Booking created successfully:", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating booking:", error);
      });
  };

  return (
    <div className="booking">
      <h2>Booking Page</h2>
      <p>Booking for train: {bookingId}</p>
      {/* Display booking details if available */}
      {bookingDetails && (
        <div>
          <h3>Booking Ticket</h3>
          {/* Display booking details here */}
        </div>
      )}
      <div className="bookinginput row pt-1">
        <input
          type="text"
          placeholder="Name"
          required
          className="col-md-6 mr-md-2"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="col-md-6"
        />
        <button className="btn col-md-6">add</button>
      </div>
      <div>
        <table class="booking-table table-bordered">
          <thead>
            <tr>
              <th>Sr </th>
              <th>Passenger Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{{sr+1}}</td>
                                    <td>{{paswenger.passengerName}}</td>
                                    <td>{{paswenger.age}}</td> */}
              <td>14</td>
              <td>adad</td>
              <td>25</td>
              <td>
                <button className="bookbtn"> Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn col-md-6">Create Booking</button>
    </div>
  );
};

export default Booking;
