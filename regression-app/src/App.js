
import './App.css';
import Plot from "react-plotly.js";

const studyHours = [1, 2, 3, 4, 5];
const examScores = [55, 70, 80, 85, 90];

function App() {

  const data = [{
    x: studyHours,
    y: examScores,
    mode: "markers",
    type: "scatter",
    marker: { color: "blue" }
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
