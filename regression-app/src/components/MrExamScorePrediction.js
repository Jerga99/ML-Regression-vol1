import React from 'react';
import Plot from 'react-plotly.js';

const MrExamScorePrediction = () => {
  const studyHours = [1, 2, 3, 4, 5];
  const sleepHours = [6, 2, 1, 5, 7];
  const score = [60, 55, 50, 70, 85];

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
      data={[trace]}
      layout={layout}
      style={{ width: '100%', height: 800 }}
    />
  );
};

export default MrExamScorePrediction;
