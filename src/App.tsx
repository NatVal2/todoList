import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodolist}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      removeTask={removeTask}/>


        </div>
    )
}

export default App;
