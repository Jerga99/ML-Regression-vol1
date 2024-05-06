


const model1 = {
  id: "1",
  type: "Simple Linear Regression",
  name: "Exam Score Prediction",
  description: "Predicts score based on study hours.",
  img: "https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?q=80&w=3522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}

const models = [model1];


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
