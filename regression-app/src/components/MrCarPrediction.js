import { useEffect, useState } from "react";
import Plot from "react-plotly.js";


const MrCarPrediction = () => {
  const [model, setModel] = useState(null);
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    fetch("carPrediction.json")
      .then(response => response.json())
      .then(modelData => {
        setModel(modelData);
        createPlots(modelData.trainData);
      })
      .catch(error => console.error("Error loading the model: ", error));
  }, []);

  const createPlots = (trainData) => {
    if (!trainData) {return;}

    const newPlots = Object.keys(trainData[0])
      .filter(key => key !== "price")
      .map(category => {
        const x = trainData.map(item => item[category]);
        const y = trainData.map(item => item.price);

        return {
          x,
          y,
          type: "scatter",
          mode: "markers",
          name: category,
          marker: {size: 8}
        };
      });

    setPlots(newPlots);
  }


  return (
    <div>
      <div>
        { plots.map((plotData, index) =>
          <div key={plotData.name} style={{width: "100%", height: 400, marginBottom: 20}}>
            <Plot
              data={[plotData]}
              layout={{
                title: plotData.name,
                xaxis: {title: plotData.name},
                yaxis: {title: "Price"},
                margin: {t: 30}
              }}
              style={{width: "100%", height: "100%"}}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MrCarPrediction;
