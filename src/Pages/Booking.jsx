import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Button, Table } from "reactstrap";
import TicketService from "../services/api";

const Booking = () => {
  const { trainName } = useParams();
  const [trains, setTrains] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [passengerList, setPassengerList] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainsAndPassengers = async () => {
      try {
        const trainsData = await TicketService.getAllTrains();
        const response = await TicketService.getAllPassengers();

        // Check if the response has a 'data' property that is an array before updating the state
        if (Array.isArray(response.data)) {
          setPassengers(response.data);
        } else {
          console.error("Invalid data for passengers:", response);
        }

        // Update the state for trains (assuming trainsData is an array)
        setTrains(trainsData);
      } catch (error) {
        console.error("Error fetching trains and passengers:", error);
      }
    };

    fetchTrainsAndPassengers();
  }, []);

  const handleAddPassenger = () => {
    // Check if there is a matching passenger before adding to the list
    const selectedPassenger = passengers.find((passenger) => {
      const fullName = `${passenger.firstName} ${passenger.lastName}`;
      return fullName.toLowerCase() === passengerName.trim().toLowerCase();
    });

    if (selectedPassenger) {
      const newPassenger = {
        passengerName: passengerName,
        age: passengerAge,
      };
      setPassengerList([...passengerList, newPassenger]);
    //   setPassengerName("");
    //   setPassengerAge("");
    } else {
      // Display an alert if no matching passenger found
      alert("No matching passenger found. Please check the passenger name.");
    }
  };

  const handleCreateBooking = () => {
    console.log("All Trains:", trains);
    console.log(trainName);
    const selectedTrain = trains.find((train) => train.trainName === trainName);

    if (!selectedTrain) {
      console.error("Selected train not found");
      return;
    }

    console.log("passengerName:", passengerName);
    const selectedPassenger = passengers.find((passenger) => {
      const fullName = `${passenger.firstName} ${passenger.lastName}`;
      return fullName.toLowerCase() === passengerName.trim().toLowerCase();
    });

    console.log(selectedPassenger);

    if (selectedPassenger) {
      const bookingData = {
        bookingId: selectedPassenger.passengerID,
        trainId: selectedTrain.trainId,
        passengerId: selectedPassenger.passengerID,
        travelDate: new Date().toISOString(),
        bookingDate: new Date().toISOString(),
        totalSeats: passengerList.length,
        TrainAppBookingPassengers: passengerList.map((passenger, index) => ({
          bookingPassengerId: index + 1,
          bookingId: selectedPassenger.passengerID,
          passengerName: passenger.passengerName,
          seatNo: index + 1,
          age: passenger.age,
        })),
      };

      console.log("Booking Data:", bookingData);

      TicketService.bookTrain(bookingData)
        .then((response) => {
          console.log("Train booked successfully:", response);
        })
        .catch((error) => {
          console.error("Error booking train:", error);
        });
      // Clear input fields after the booking is created
    //   setPassengerName("");
    //   setPassengerAge("");
      if(bookingData.TrainAppBookingPassengers.length>0){
        navigate(`/payment/${bookingData.bookingId}/${bookingData.TrainAppBookingPassengers.length}`);
      }else{
        alert("Select passengers!");
      }
    } else {
      console.error("No matching passenger found for the provided name");
    }
  };

  return (
    <div className="booking">
      <p>Booking for train: {trainName}</p>
      <Form>
        <FormGroup className="bookinginput">
          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Passenger Age"
            value={passengerAge}
            onChange={(e) => setPassengerAge(e.target.value)}
            required
          />
          <Button type="button" onClick={handleAddPassenger}>
            Add Passenger
          </Button>
        </FormGroup>
      </Form>
      {passengerList.length > 0 && (
        <Table className="booking-table"> 
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {passengerList.map((passenger, index) => (
              <tr key={index}>
                <td>{passenger.passengerName}</td>
                <td>{passenger.age}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button type="button" onClick={handleCreateBooking}>
        Create Booking
      </Button>
    </div>
  );
};

export default Booking;
