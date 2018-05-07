const initialState = {
	show_menu: false,
	maps_active: "4"
};

const rootReducer = (state=initialState, action) => {
  console.log(state, action)
  switch (action.type){
    case 'TOGGLE_MENU':
      return {...state, show_menu: action.show}
    case 'SHOW_MAPS':
      return {...state, maps_active: action.number_to_show}
    default:
      return state
  }
}

export default rootReducer;