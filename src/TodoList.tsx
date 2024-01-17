import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App'

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TaskType []
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changesStatus: (taskId: string, isDone: boolean)=> void
    filter: FilterValuesType
}
export const TodoList = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle((" "))
        }
    }

    const addToTask = ()=> {
        if(newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle(" ")
        } else {
            setError("Title is required")
        }
    }
    const onAllClickHandler = ()=> props.changeFilter("all")
    const onActiveClickHandler = ()=> props.changeFilter("active")
    const onCompletedClickHandler = ()=> props.changeFilter("completed")


        return (
            <div>
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input value={newTaskTitle}
                               onChange={onNewTitleChangeHandler}
                               onKeyPress={onKeyPressHandler}
                               className={ error ? "error" : ""}
                        />

                        <button onClick={addToTask}>+</button>
                        {error && <div className="error-message">{error}</div>}

                    </div>
                    <ul>
                        {
                            props.tasks.map((t) => {
                                const onRemoveHandler = () =>props.removeTask(t.id)
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
                                    props.changesStatus( t.id, e.currentTarget.checked)

                                }

                                return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                    <input  onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>
                            })
                        }
                    </ul>
                    <div>
                        <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                        <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>completed</button>
                        <button className={props.filter === 'active' ? "active-filter" : ""}  onClick={onActiveClickHandler}>active</button>
                    </div>
                </div>
            </div>
        );
    };