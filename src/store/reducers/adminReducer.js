import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  role: [],
  position: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("start", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      console.log("success", copyState);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAIDED:
      console.log("failure", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
