
import { useState } from 'react';
import './App.css';
import ExamScorePrediction from './components/ExamScorePrediction';
import ModelSelection from './components/ModelSelection';

const modelMap = {
  "1": ExamScorePrediction
}

function App() {
  const [activeModelId, setActiveModelId] = useState(null);

  const ActiveModelComponent = modelMap[activeModelId];

  return (
    <div className="App">
      <ModelSelection
        activeId={activeModelId}
        onChange={(modelId) => {
          if (modelId === activeModelId) {
            setActiveModelId(null)
          } else {
            setActiveModelId(modelId);
          }
        }}
      />
      { activeModelId && ActiveModelComponent &&
        <>
          <ActiveModelComponent />
        </>
      }
    </div>
  );
}

export default App;
