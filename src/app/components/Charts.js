import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const Charts = ({ presentDays, absentDays, totalWorkingDays }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartElement = chartRef.current.getContext("2d");
    const attendanceChart = new Chart(chartElement, {
      type: "bar",
      data: {
        labels: ["Present", "Absent"],
        datasets: [
          {
            label: "Teacher Attendance",
            data: [presentDays, absentDays],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            borderColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: totalWorkingDays, // Set the y-axis maximum to totalWorkingDays
          },
        },
      },
    });

    return () => {
      attendanceChart.destroy(); // Clean up the chart on unmounting the component
    };
  }, [presentDays, absentDays, totalWorkingDays]);

  return (
    <div className="canvas-graph-div">
      <canvas className="canvas-graph" ref={chartRef} />
    </div>
  );
};

export default Charts;
