import INITIAL__STATE from "../state";

  function Reducer (state = INITIAL__STATE, action) {
    switch(action.type){
      case "CHANGE_VALUE":
        return state = {
          ...state,
          taskToAdd: action.payload
        }
      case "ADD_TASK":
        return state = {
          tasks: action.newTask,
          taskToAdd: "",
        }
      case "REMOVE_TASK":
        return state = {
          tasks: action.listRemoved,
          taskToAdd: ""
        }
      default:
        return state;
    }
  }
  


export default Reducer;