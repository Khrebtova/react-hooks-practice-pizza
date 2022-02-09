import React from "react";

function PizzaForm({chosenPizza, setChosenPizza, onSubmitChanges}) {
  const handleChange =(e)=>{    
    const key = e.target.name
    const value = e.target.value
    setChosenPizza({...chosenPizza, [key]: value})
  }

  const handleVegUpdate=(e)=> {
    if(e.target.value === "false"){
      setChosenPizza({...chosenPizza, vegetarian: false})
    }else{
      setChosenPizza({...chosenPizza, vegetarian: true})
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("you submitted", chosenPizza)
    fetch(`http://localhost:3001/pizzas/${chosenPizza.id}`, {
      method: "PATCH",
      headers: {"content-type":"application/json"},
      body: JSON.stringify({
        "topping": chosenPizza.topping,
        "size": chosenPizza.size,
        "vegetarian": chosenPizza.vegetarian
      })
    })
    .then((res)=>res.json())
    .then((updatedPizza)=> onSubmitChanges(updatedPizza))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            value={chosenPizza.topping}
            placeholder="Pizza Topping"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={chosenPizza.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value = {true}
              checked = {chosenPizza.vegetarian === true}
              onChange={handleVegUpdate}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value = {false}
              checked = {chosenPizza.vegetarian === false}
              onChange={handleVegUpdate}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
