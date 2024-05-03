
import { useEffect, useState } from 'react';
import './App.css';
import Plot from "react-plotly.js";

const studyHoursData = [1, 2, 3, 4, 5];
const examScoresData = [55, 70, 80, 85, 90];

function App() {
  const [regressionLine, setRegressionLine] = useState([]);

  const data = [{
    x: studyHoursData,
    y: examScoresData,
    mode: "markers",
    type: "scatter",
    marker: { color: "blue" }
  }, {
    x: studyHoursData,
    y: regressionLine,
    mode: "lines",
    type: "scatter",
    name: "Regression Line",
    line: {color: "red"}
  }];

  const layout = {
    title: "Study hours vs Exam Scores",
    xaxis: {
      title: "Study hours",
      autorange: true,
    },
    yaxis: {
      title: "Exam scores",
      autorange: true,
    },
  }

  useEffect(() => {
    trainModel();
  }, []);

  const trainModel = () => {

    // Step 1 - Compute means
    const meanStudyHours = studyHoursData.reduce((sum, val) => sum + val, 0) / studyHoursData.length;
    const meanExamScores = examScoresData.reduce((sum, val) => sum + val, 0) / examScoresData.length;


    // Step 2 - Compute Slope (B1, m)
    const numerator = studyHoursData.reduce((sum, hour, i) => sum + (hour - meanStudyHours) * (examScoresData[i] - meanExamScores), 0);
    const denominator = studyHoursData.reduce((sum, hour) => sum + Math.pow(hour - meanStudyHours, 2) ,0);
    const b1 = numerator / denominator;
    const b0 = meanExamScores - b1 * meanStudyHours;

    const regressionYs = studyHoursData.map(x => b0 + b1 * x);
    setRegressionLine(regressionYs);
  }


  return (
    <div className="App">
      <Plot
        data={data}
        layout={layout}
      />
    </div>
  );
}

export default App;
