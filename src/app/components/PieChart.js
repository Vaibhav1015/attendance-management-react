import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ presentDays, absentDays, workingDays }) => {
  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [presentDays, absentDays],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="pie-graph-div">
      <Pie className="pie-canvas" data={data} />
    </div>
  );
};

export default PieChart;
