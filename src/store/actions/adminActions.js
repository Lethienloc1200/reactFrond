import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
} from "../../services/userService";
import { toast } from "react-toastify";
export const fechGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
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
// ==========positon============
export const fechPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fechPositionSuccess(res.data));
      } else {
        dispatch(fechPositionFailed());
      }
    } catch (error) {
      dispatch(fechPositionFailed());
      console.log("fetchGenderStart error");
    }
  };
};

export const fechPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fechPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAIDED,
});

// ===========role============================
export const fechRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fechRoleSuccess(res.data));
      } else {
        dispatch(fechRoleFailed());
      }
    } catch (error) {
      dispatch(fechRoleFailed());
    }
  };
};
export const fechRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fechRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAIDED,
});

// =============create new usser=========
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("hoidanit check redux create", res);

      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed !");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("hoidanit check redux create", res);

      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        toast.success("Register succeed !");
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAIDED,
});

// ===========fecth all user======================
export const fetchAllUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIDED,
});

// ==========delete user==============

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log("hoidanit check redux create", res);

      if (res && res.errCode === 0) {
        toast.success("Delete a user succeed !");
        dispatch(deleteASuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(deleteAFailed());
        toast.success("Delete a user error !");
      }
    } catch (error) {
      dispatch(deleteAFailed());
    }
  };
};

export const deleteASuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteAFailed = () => ({
  type: actionTypes.DELETE_USER_FAIDED,
});
