


import React, { useEffect, useMemo, useState } from 'react';
import Plot from 'react-plotly.js';

const MrSalaryPrediction = () => {
  const [regression, setRegression] = useState(null);
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [prediciton, setPrecition] = useState(null);

  useEffect(() => {
    fetch("/salaryCoefficients.json")
      .then(response => response.json())
      .then(data => setRegression(data))
      .catch(error => console.error("Error fetching coefficients: ", error))
  }, []);

  useEffect(() => {
    if (age === 0 || experience === 0) {
      setPrecition(null);
      return;
    }

    if (regression && age !== "" && experience !== "") {
      const income = regression.intercept + regression.slopes[0] * age + regression.slopes[1] * experience;
      setPrecition(income.toFixed(2));
    }
  }, [age, experience, regression])

  const regressionPlane = useMemo(() => {
    if (regression) {
      const allAges = regression.trainData.map(d => d.age);
      const allExperiences = regression.trainData.map(d => d.experience);

      const x1Range = [Math.min(...allAges), Math.max(...allAges)];
      const x2Range = [Math.min(...allExperiences), Math.max(...allExperiences)];

      const x1Step = (x1Range[1] - x1Range[0]) / 10;
      const x2Step = (x2Range[1] - x2Range[0]) / 10;

      const x1Points = [], x2Points = [], yPoints = [];

      for (let x1 = x1Range[0]; x1 < x1Range[1]; x1 += x1Step) {
        for (let x2 = x2Range[0]; x2 < x2Range[1]; x2 += x2Step){
          x1Points.push(x1);
          x2Points.push(x2);
          const y = regression.intercept + regression.slopes[0] * x1 + regression.slopes[1] * x2;
          yPoints.push(y);
        }
      }

      return {x1Points, x2Points, yPoints};
    }
  }, [regression]);

  if (!regression) {
    return <div>Loading...</div>
  }

  console.log(regressionPlane);

  const regressionPlaneData = {
    x: regressionPlane.x1Points,
    y: regressionPlane.x2Points,
    z: regressionPlane.yPoints,
    type: "mesh3d",
    color: "lightpink",
    name: "regression plane"
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
    <div>
      <div style={{textAlign: "center"}}>
        <div style={{marginBottom: 10}}>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="age"
          />
          <input
            type="number"
            onChange={(e) => setExperience(Number(e.target.value))}
            placeholder="experience"
          />
        </div>
        <div>
          Predicted Income: {
            prediciton ? `${prediciton}$` :
            <span style={{color: "red"}}>Enter Values to get prediction</span>
          }
        </div>
      </div>
      <Plot
        data={[trainData, testData, predictions, regressionPlaneData]}
        layout={layout}
        style={{ width: '100%', height: 800 }}
      />
    </div>
  );
};

export default MrSalaryPrediction;
