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
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)", // Green for Present
              "rgba(255, 99, 132, 0.6)", // Red for Absent
              "rgba(54, 162, 235, 0.6)", // Blue for Total Working Days
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
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
      <canvas ref={chartRef} />
    </div>
  );
};

export default Charts;
