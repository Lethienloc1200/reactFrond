import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllcodeService,
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
      console.log("abc check redux create", res);

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
      console.log("abc check redux create", res);

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
      // let res1 = await getTopDoctorHomeService("3");
      // console.log("check taị sao load top bác sĩ ra sai ", res1);
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
      console.log("abc check redux create", res);

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

// =====edit a user ===============

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("abc check redux create", res);

      if (res && res.errCode === 0) {
        toast.success("Update a user succeed !");
        dispatch(editASuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(editAFailed());
        toast.success("edit a user error !");
      }
    } catch (error) {
      dispatch(editAFailed());
    }
  };
};

export const editASuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editAFailed = () => ({
  type: actionTypes.EDIT_USER_FAIDED,
});

// =======fech top doctor============
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("8");
      console.log("check why  return array  wrong: ", res);
      // console.log("top doctor ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
        });
      }
    } catch (error) {
      console.log("Fetch doctor failded", error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
      });
    }
  };
};
// =======fech all doctor============
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      // console.log("top doctor ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDR: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
        });
      }
    } catch (error) {
      console.log("Fetch doctor failded", error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
      });
    }
  };
};

// =======SAVE infor details doctor============
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);

      if (res && res.errCode === 0) {
        toast.success("Save infor detail doctor succeed!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save infor detail doctor error!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
        });
      }
    } catch (error) {
      console.log("SAVE doctor failded", error);
      toast.error("Save infor detail doctor error!!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      // console.log("top doctor time shcedule ", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SCHEDULE_HOUR_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SCHEDULE_HOUR_FAIDED,
        });
      }
    } catch (error) {
      console.log("Fetch doctor failded", error);
      dispatch({
        type: actionTypes.FETCH_ALL_SCHEDULE_HOUR_FAIDED,
      });
    }
  };
};

///3 funtion
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getstate) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED,
});
