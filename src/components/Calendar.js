import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";

export default function Trainingcalendar() {
  const localizer = momentLocalizer(moment);

  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content));
  };

  const calendarEvents = trainings.map((training) => {
    return {
      title: training.activity,
      start: new Date(training.date),
      end: moment(training.date).add(training.duration, "m").toDate(),
    };
  });

  return (
    <div>
      <Calendar
        style={{ height: 800, width: "95%" }}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        events={calendarEvents}
        defaultView={"week"}
        defaultDate={new Date()}
      />
    </div>
  );
}
