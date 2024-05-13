


const model1 = {
  id: "1",
  type: "Simple Linear Regression",
  name: "Exam Score Prediction",
  description: "Predicts score based on study hours.",
  img: "https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?q=80&w=3522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const model2 = {
  id: "2",
  type: "Multiple Linear Regression",
  name: "Exam Score Prediction",
  description: "Predicts score based on study hours and sleep hours.",
  img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Nob29sfGVufDB8fDB8fHww"
};

const model3 = {
  id: "3",
  type: "Multiple Linear Regression",
  name: "Salary Prediction",
  description: "Predicts salary based on age and years of experience",
  img: "https://plus.unsplash.com/premium_photo-1661281350976-59b9514e5364?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmaWNlfGVufDB8fDB8fHww"
}

const model4 = {
  id: "4",
  type: "Multiple Linear Regression",
  name: "Car Prediction",
  description: "Predicts car based on multiple categories",
  img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=3683&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}

const models = [model1, model2, model3, model4];


function ModelSelection({onChange, activeId}) {
  return (
    <div className="model-container">
      {models.map(model =>
        <div
          key={model.id}
          className={`model-item ${model.id === activeId ? "active" : ""}`}
        >
          <div>{model.name}</div>
          <img
            onClick={() => {
              onChange(model.id);
            }}
            src={model.img}
            alt=""
          />
          <div><b>Type:</b> {model.type}</div>
          <i>{model.description}</i>
        </div>
      )}
    </div>
  )
}

export default ModelSelection;
