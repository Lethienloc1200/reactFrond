import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

export const fechGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fechGenderSuccess(res.data));
      } else {
        dispatch(fechGenderFailed());
      }
    } catch (error) {
      dispatch(fechGenderFailed());
      console.log("fetchGenderStart error");
    }
  };
};

export const fechGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fechGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});
