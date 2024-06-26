import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const MrCarPrediction = () => {
  const [model, setModel] = useState(null);
  const [plots, setPlots] = useState([]);
  const [inputs, setInputs] = useState({});
  const [carBrands, setCarBrands] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetch("carPrediction.json")
      .then(response => response.json())
      .then(modelData => {
        setModel(modelData);
        createPlots(modelData.trainData, modelData.categories);

        const brands = modelData.categories
          .filter(name => name.startsWith("CarName"))
          .map(name => name.split(" ")[1]);

        setCarBrands(brands);

        const inputs = {};

        const oneEncodedCat = ["CarName", "drivewheel", "enginelocation", "enginetype", "fuelsystem"];
        modelData.categories.forEach(category => {
          const avg = modelData.trainData.reduce((sum, row) => sum + row[category], 0) / modelData.trainData.length;

          inputs[category] = oneEncodedCat.includes(category.split(" ")[0]) ? "" : avg.toFixed(2);
        });

        setInputs(inputs);

      })
      .catch(error => console.error("Error loading the model: ", error));
  }, []);

  useEffect(() => {
    if (!model) { return; }

    const {intercept, slopes} = model;
    let sum = intercept;

    model.categories.forEach((category, index) => {
      const inputValue = parseFloat(inputs[category]) || 0;
      sum += inputValue * slopes[index];
    });

    setPrediction(sum.toFixed(2));
  }, [inputs, model])

  const createPlots = (trainData, categories) => {
    if (!trainData) {return;}

    const newPlots = categories
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

  const handleBrandChange = (e) => {
    const brand = e.target.value;

    const brandInputs = carBrands.reduce((inputs, b) => ({...inputs, [`CarName ${b}`]: 0}) ,{});
    brandInputs[`CarName ${brand}`] = 1;

    setInputs({...inputs, ...brandInputs});
  }

  if (!model) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{textAlign: "center"}}>
        <div>
          <select
            value={carBrands.find(brand => inputs[`CarName ${brand}`] === 1) || ""}
            onChange={handleBrandChange}
          >
            <option value="">Select a brand</option>
            { carBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          { model.categories
            .filter(category => !category.startsWith("CarName"))
            .map((category, index) =>
            <div key={`${category}-${index}`}>
              <label>{category}:</label>
              <input
                type="number"
                name={category}
                value={inputs[category] || ""}
                onChange={(e) => {
                  setInputs({...inputs, [category]: e.target.value})
                }}
              />
            </div>
          )}
          <div style={{margin: 40, fontSize: 30}}>
            Predicted price: <b>${prediction}</b>
          </div>
        </div>
      </div>
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
