import React, { useEffect } from "react";
import Reducer from "./reducer/index";
import { createStore } from "redux";
import { useDispatch, useSelector, Provider } from "react-redux";
import './App.css';

function TodoApp (props) {
	const dispatch = useDispatch();
	let currTask = useSelector( state => state.taskToAdd);
	let listTask = useSelector( state => state.tasks);

	useEffect(() => {
		const event = (e) => {
			if(e.keyCode === 13){
				HandleAddTask();
			}
		}
		window.addEventListener('keypress', event);

		return () => window.removeEventListener("keypress", event);
	});
	
	function HandleChange (e) {
		let onChange = e.target.value;
		dispatch({ type: "CHANGE_VALUE", payload: onChange})
	}
	
	function HandleAddTask() {
		let regex = /[a-z]/gi;
		if(!regex.test(currTask)){}
		else {
		let addNewTask = [currTask,...listTask];
		let clearAddNewTask = [...new Set(addNewTask)];
		dispatch({type: "ADD_TASK", newTask: clearAddNewTask});
		document.getElementById("input").value = "";
		}
	}
	
	function HandleRemove(i){
		let newListTask = [...listTask];
		newListTask.splice(i,1);		
		dispatch({type: "REMOVE_TASK", listRemoved: newListTask})
	}
	
	
	return (
			<>
				<div className="App">
					<div className="App__title">
						<h1>To Do List</h1>	
					</div>
					<div className="App__input">
						<input type="text" id="input" placeholder="enter task" onChange={HandleChange} />
						<span id="btn-add" onClick={HandleAddTask}>Add</span>
					</div>
					<div className="App__tasks">
						<ul>
							{
								listTask.map((task,index)=>{
									return (<li key={index} className="task">
												<p>{task}</p>
												<p className="note">{`${new Date().toLocaleDateString()}`}</p>
												<span className="btn-remove" onClick={()=> HandleRemove(index)}>
													<i className="far fa-minus-square"></i>
												</span>
											</li>)
								})
							}
						</ul>
					</div>
				</div>
			</>
	)
}

const store = createStore(
	Reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
  
const App = () => {
	return (
		<Provider store={store}>
			<TodoApp />
		</Provider>
	)
}

export default App;