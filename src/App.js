import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

// Generate random points to plot on X-axis (sensor data)
const getData = () => {
  // Points generated between 0 - 10
  return Math.round(Math.random() * 10);
};

// Create the Plot
const MyPlot = () => {
  const maxDataPoints = 8; // Show max point on X-axis

  // Initial Plot
  const [trace1, setTrace1] = useState({
    x: [0, 1, 2, 3, 4, 5],
    y: [getData(), getData(), getData(), getData(), getData(), getData()],
    type: 'line',
    mode: 'lines+markers',
  });

  // Initial Layout
  const [layout, setLayout] = useState({
    width: 600,
    height: 500,
    title: 'My Plot',
    xaxis: {
      range: [maxDataPoints - 8, maxDataPoints],
    },
  });

  // Update the graph
  useEffect(() => {

    // Interval Logic
    const intervalId = setInterval(() => {
      setTrace1((prevTrace) => {
        // Generate new data to plot further
        const newX = [...prevTrace.x, prevTrace.x.length];
        const newY = [...prevTrace.y, getData()];

        return { ...prevTrace, x: newX, y: newY };
      });

      setLayout((prevLayout) => {
        // Shift the layout further
        const newRange = [prevLayout.xaxis.range[0] + 1, prevLayout.xaxis.range[1] + 1];
        return { ...prevLayout, xaxis: { ...prevLayout.xaxis, range: newRange } };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const data = [trace1];

  return (
    <Plot
      data={data}
      layout={layout}
    />
  );
};

const App = () => {
  return (
    <div>
      <MyPlot />
    </div>
  );
};

export default App;
