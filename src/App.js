import "./App.css";
import Header from "./My Components/Header";
import { Footer } from "./My Components/Footer";
import { Todos } from "./My Components/Todos";
import { AddTodo } from "./My Components/AddTodo";
import { About } from "./My Components/About";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am on delete todo.", todo);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am addding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      let sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
    <Router>
      <Header title="My todos-List" />
      <Switch>
          <Route exact path="/" render={()=>{
          return( 
          <>
          <AddTodo AddTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
       </>)
       }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>

      <Footer />
      </Router>
    </>
  );
}

export default App;
