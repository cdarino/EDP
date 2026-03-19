import Card from "./Card/Card.jsx"
import Button from "./Button.jsx"
import UserGreetings from "./UserGreetings.jsx"
import ProductList from "./ProductList.jsx"

function App() {

  const products = [
    {id: 1, name: 'milk', calories: 100},
    {id: 2, name: 'egg', calories: 150}, 
    {id: 3, name: 'rice', calories: 1000}, 
    {id: 4, name: 'bread', calories: 250},
    {id: 5, name: 'milk', calories: 90}, 
  ]
  
  const food = [
    {id: 1, name: 'adobo', calories: 100},
    {id: 2, name: 'sinigang', calories: 150}, 
    {id: 3, name: 'kare-kare', calories: 1000}, 
    {id: 4, name: 'pansit', calories: 250},
    {id: 5, name: 'lechon', calories: 90},
  ]

  return (
    <>
      {/* <UserGreetings username="Alejandro" isLoggedIn={true}></UserGreetings>
      <UserGreetings></UserGreetings> */}
      {food.length > 0 && 
        <ProductList items={food} category="Food"></ProductList>
      }
      <ProductList items={products} category="Grocery"></ProductList>
    </>
  )
}

export default App
