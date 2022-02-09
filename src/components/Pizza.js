import React from "react";

function Pizza({pizza, onEditPizza}) {
  
  function handleEdit(){
    onEditPizza(pizza)
  }
  
  return (
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      {pizza.vegetarian ?  <td>Yes</td> : <td>No</td>}
      <td>
        <button type="button" className="btn btn-primary" onClick={handleEdit}>
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
