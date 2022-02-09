import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  position: [],
  isLoadingGender: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  listDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      // console.log("hoi danit", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      // console.log("success", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIDED:
      // console.log("failure", action);

      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    // ===========Position=======

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIDED:
      state.position = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIDED:
      state.roles = [];
      return {
        ...state,
      };
    // ============fech all user=======
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIDED:
      state.users = [];
      return {
        ...state,
      };

    //============fech top doctor=======
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIDED:
      state.topDoctors = [];
      return {
        ...state,
      };

    //============fech all doctor=======
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDR;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIDED:
      state.allDoctors = [];
      return {
        ...state,
      };
    //============fech all schedule time=======
    case actionTypes.FETCH_ALL_SCHEDULE_HOUR_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SCHEDULE_HOUR_FAIDED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    // 3 funtion==========
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      console.log(
        ">>> hoi dan it channel: fetch required doctor data action:",
        action
      );

      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
