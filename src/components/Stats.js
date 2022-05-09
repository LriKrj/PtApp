import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Stats() {
  const [training, setTraining] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => getData(data.content))
      .then((stat) => setTraining(stat))
      .catch((err) => console.error(err));
  };
  const getData = (data) => {
    let statistics = _(data)
      .groupBy("activity")
      .map((id, key) => ({
        activity: key,
        duration: _.sumBy(id, "duration"),
      }))
      .value();
    return statistics;
  };

  return (
    <div>
      <div style={{ width: "90%" }}>
        <ResponsiveContainer width="80%" height={650}>
          <BarChart data={training} margin={{ top: 30 }}>
            <XAxis dataKey="activity" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name="Duration (min)" dataKey="duration" fill="blue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
