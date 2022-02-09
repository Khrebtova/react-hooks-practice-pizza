import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [pizzaToEdit, setPizzaToEdit]= useState({
    "id": "",
    "topping": "",
    "size": "",
    "vegetarian": ""
  })

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then((res) => res.json())
    .then((data)=>setPizzas(data))

  }, [])

  const editPizza=(chosenPizza)=>{
    console.log("edit " , chosenPizza)
    setPizzaToEdit(chosenPizza)
  }
  
  const submitChanges=(updatedPizza)=>{
    const updatedArray = pizzas.map((pizza)=> pizza.id === updatedPizza.id ? updatedPizza : pizza)
    setPizzas(updatedArray)
  }

  return (
    <>
      <Header />
      <PizzaForm chosenPizza={pizzaToEdit} setChosenPizza={setPizzaToEdit} onSubmitChanges={submitChanges}/>
      <PizzaList pizzas={pizzas} onEditPizza={editPizza}/>
    </>
  );
}

export default App;
