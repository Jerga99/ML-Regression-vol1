


import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const MrSalaryPrediction = () => {
  const [regression, setRegression] = useState(null);

  useEffect(() => {
    fetch("/salaryCoefficients.json")
      .then(response => response.json())
      .then(data => setRegression(data))
      .catch(error => console.error("Error fetching coefficients: ", error))
  }, []);

  if (!regression) {
    return <div>Loading...</div>
  }

  const trainData = {
    x: regression.trainData.map(d => d.age),
    y: regression.trainData.map(d => d.experience),
    z: regression.trainData.map(d => d.income),
    mode: "markers",
    type: "scatter3d",
    name: "Train Data",
    marker: {
      color: "blue",
      size: 3
    }
  };

  const testData = {
    x: regression.testData.map(d => d.age),
    y: regression.testData.map(d => d.experience),
    z: regression.testData.map(d => d.income),
    mode: "markers",
    type: "scatter3d",
    name: "Test Data",
    marker: {
      color: "red",
      size: 3
    }
  };

  const predictions = {
    x: regression.predictions.map(d => d.age),
    y: regression.predictions.map(d => d.experience),
    z: regression.predictions.map(d => d.income),
    mode: "markers",
    type: "scatter3d",
    name: "Prediction",
    marker: {
      color: "green",
      size: 4
    }
  };


  const layout = {
    title: 'Age, Experience vs Income',
    scene: {
      xaxis: { title: 'Age' },
      yaxis: { title: 'Years of Experience' },
      zaxis: { title: 'Income' }
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
      data={[trainData, testData, predictions]}
      layout={layout}
      style={{ width: '100%', height: 800 }}
    />
  );
};

export default MrSalaryPrediction;
