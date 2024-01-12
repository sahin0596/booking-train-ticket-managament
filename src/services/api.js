import axios from "axios";

// /*sample data*/
// const  fetchTrainDetails = [
//     {
//       Type: 'AC',
//       Train_Coach: 'ABC123',
//       From: 'Howrah',
//       To: 'Durgapur',
//     //   Passenger: 40,
//       Check_In_Date: '01-01-2024',
//     },
//     {
//       Type: 'General',
//       Train_Coach: 'EFG123',
//       From: 'Howrah',
//       To: 'Digha',
//     //   Passenger: 50,
//       Check_In_Date: '01-04-2024',
//     },
//     {
//         Type: 'AC',
//         Train_Coach: 'HIJ123',
//         From: 'Howrah',
//         To: 'Digha',
//       //   Passenger: 50,
//         Check_In_Date: '01-04-2024',
//     },
  
// ];

// export default fetchTrainDetails;

//All api calls ======>

/* Get deyails of all trains */
const base_url ="https://freeapi.miniprojectideas.com/api/TrainApp";

export const getAllTrains = () => {
    return axios.get(`${base_url}/GetAllTrains`)
      .then((response) => {
        return response.data.data.sort((a, b) => a.trainId - b.trainId);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
};

export const getAllUserDetails = () => {
    return axios.get(`${base_url}/GetAllPassengers`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
};

// Function to add a new passenger
export const addPassenger = (passengerData) => {
    return axios.post(`${base_url}/AddPassenger`, passengerData)
      .then((response) => {
        return response.data; // You can customize the return based on your API response
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

export const createBooking = (bookingData) => {
    return axios.post(`${base_url}/CreateBooking`, bookingData)
      .then((response) => {
        return response.data; // You can return the response if needed
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
};