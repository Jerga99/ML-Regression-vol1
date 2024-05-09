import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const MrExamScorePrediction = () => {
  const studyHours = [1, 2, 3, 4, 5];
  const sleepHours = [6, 2, 1, 5, 7];
  const score = [60, 55, 50, 70, 85];
  const [coefficients, setCoefficients] = useState([]);

  useEffect(() => {
    fetch("/mr-example-coefficients.json")
      .then(response => response.json())
      .then(data => setCoefficients(data.coefficients.map(Number)))
      .catch(error => console.error("Error fetching coefficients: ", error))
  }, []);

  let x1Surface = [], x2Surface = [], ySurface = [];

  if (coefficients.length > 0) {
    for (let x1 = 0; x1 < 5; x1 += 0.5) {
      for (let x2 = 0; x2 < 7; x2 += 0.5) {
        x1Surface.push(x1);
        x2Surface.push(x2);
        ySurface.push(coefficients[0] + coefficients[1] * x1 + coefficients[2] * x2);
      }
    }
  }

  const regressionPlane = {
    x: x1Surface,
    y: x2Surface,
    z: ySurface,
    type: "mesh3d",
    opacity: 0.5,
    color: "blue",
    name: "Plane"
  };

  const trace = {
    x: studyHours,
    y: sleepHours,
    z: score,
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 8,
      color: score,  // Optional: color code markers by score for visual segmentation
      colorscale: 'Viridis',  // Optional: use a color scale for marker colors
      opacity: 0.8
    }
  };

  const layout = {
    title: 'Study and Sleep Hours vs Score',
    scene: {
      xaxis: { title: 'Study Hours' },
      yaxis: { title: 'Sleep Hours' },
      zaxis: { title: 'Score' }
    },
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 50
    }
  };

  return (
    <Plot
      data={[trace, regressionPlane]}
      layout={layout}
      style={{ width: '100%', height: 800 }}
    />
  );
};

export default MrExamScorePrediction;
