import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import moment from 'moment';


export default function Calendar() {

  const [training, setTraining] = useState([]);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setTraining(data.content))
    .catch((err) => console.error(err));
}

  useEffect(() => fetchData(), []);

  const months=
    {
    weekDays: [0, 1, 2, 3, 4, 5, 6], 
    weekStartOn: 1, 
    startHour: 5, 
    endHour: 24,
    }

  const weeks =
    { 
    weekDays: [0, 1, 2, 3, 4, 5, 6], 
    weekStartOn: 1, 
    startHour: 5, 
    endHour: 24,
    step: 60
    }
  

  return (
    <div>
    
      
      <Scheduler
        view="week"
        events={training.map((training, id) =>({
          event_id: id,
          title: training.activity,
          start: new Date(training.date),
          end: moment(training.date).add(training.duration, 'minute')._d,
        }))}
        //selectedDate={new Date(moment())}
        week={weeks}
        month={months}
      />
      </div>
  );
}
