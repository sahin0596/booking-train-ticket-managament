import React, { useState, useEffect } from 'react';
import { getAllTrains } from '../services/api';
import Train from '../Components/Train/Train';

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getAllTrains().then((data) => {
      console.log(data);
      setTrains(data);
      const newHeaders = data.length > 0 ? Object.keys(data[0]) : [];
      setHeaders(newHeaders);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);


  return (
    <>
      <div className='trains'>
        <div className="trainsmaintext">
          <h1>All Trains</h1>
        </div>
        <Train trains={trains} headers={headers} />
      </div>
    </>
  );
};

export default Trains;
