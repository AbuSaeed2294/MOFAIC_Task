import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_ALL_NATIONALITY_SUCCESS,
  FETCH_ALL_NATIONALITY_FAILURE,
  FETCH_STUDENT_NATIONALITY_SUCCESS,
  FETCH_STUDENT_NATIONALITY_FAILURE,
  ADD_FAMILY_MEMBER,
  UPDATE_FAMILY_MEMBER,
  DELETE_FAMILY_MEMBER,
  ADD_USER_NATIONALITY,
  POST_STUDENT_REQUEST,
  POST_STUDENT_SUCCESS,
  POST_STUDENT_FAILURE,
  FETCH_FAMILY_DATA_SUCCESS,
  FETCH_FAMILY_DATA_FAILURE,
  POST_STUDENT_FAMILY_REQUEST,
  POST_STUDENT_FAMILY_SUCCESS,
  POST_STUDENT_FAMILY_FAILURE,
  ADD_STUDENT_FAMILY_NATIONALITY,
  UPDATE_STUDENT_DATA,
  UPDATE_STUDENT_NATIONALITY,
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Add family member
export const addFamilyMember = (member) => ({
  type: ADD_FAMILY_MEMBER,
  member,
});

export const updateFamilyMember = (id, updatedUserData) => ({
  type: UPDATE_FAMILY_MEMBER,
  payload: { id, updatedUserData },
});

export const deleteFamilyMember = (userId, familyMemberIndex) => ({
  type: DELETE_FAMILY_MEMBER,
  payload: { userId, familyMemberIndex },
});

// Post student nationality data
export const addUserNationality = (userId, nationalityData) => ({
  type: ADD_USER_NATIONALITY,
  payload: { userId, nationalityData },
});

// Post student data
export const postStudentRequest = () => ({
  type: POST_STUDENT_REQUEST,
});

export const postStudentSuccess = (newStudentData) => ({
  type: POST_STUDENT_SUCCESS,
  payload: { newStudentData },
});

export const postStudentFailure = (error) => ({
  type: POST_STUDENT_FAILURE,
  payload: error,
});

// Get and Post family data
export const fetchFamilyDataSuccess = (studentId, familyData) => ({
  type: FETCH_FAMILY_DATA_SUCCESS,
  payload: { studentId, familyData },
});

export const fetchFamilyDataFailure = (error) => ({
  type: FETCH_FAMILY_DATA_FAILURE,
  payload: error,
});

// Post student family data
export const postStudentFamilyRequest = () => ({
  type: POST_STUDENT_FAMILY_REQUEST,
});

export const postStudentFamilySuccess = () => ({
  type: POST_STUDENT_FAMILY_SUCCESS,
});

export const postStudentFamilyFailure = (error) => ({
  type: POST_STUDENT_FAMILY_FAILURE,
  payload: error,
});

// Post student family nationality data
export const addStudentFamilyNationality = (userId, nationalityData) => ({
  type: ADD_STUDENT_FAMILY_NATIONALITY,
  payload: { userId, nationalityData },
});

// Update student data
export const updateStudentData = (studentId, updatedData) => ({
  type: UPDATE_STUDENT_DATA,
  payload: { studentId, updatedData },
});

// Update student nationality
export const updateStudentNationality = (studentId, nationalityData) => ({
  type: UPDATE_STUDENT_NATIONALITY,
  payload: { studentId, nationalityData },
});

// This action will fetch student data from the API
export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Students`);
      const data = await response.json();
      dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error });
    }
  };
};

// This action will delete student family data
export const deleteStudentFamilyData = (userId, familyMemberIndex) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/FamilyMembers/${familyMemberIndex}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch(deleteFamilyMember(userId, familyMemberIndex));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

// This action will update student family data
export const updateStudentFamilyData = (studentId, updatedMember) => {
  return async (dispatch) => {
    try {
      for (let i = 0; i < updatedMember?.length; i++) {
        const response = await fetch(
          `${BASE_URL}/api/FamilyMembers/${studentId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMember?.[i]),
          }
        );

        if (response.ok) {
          dispatch(updateFamilyMember(studentId, updatedMember?.[i]));
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

// This action will update student data
export const updateStudentNationalityData = (studentId, nationalityId) => {
  return async (dispatch) => {
    if (nationalityId) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/Students/${studentId}/Nationality/${nationalityId}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          const updatedNationalityData = await response.json();
          dispatch(updateStudentNationality(studentId, updatedNationalityData));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
};

// This action will update student data
export const updateStudentDetails = (studentId, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      dispatch(updateStudentData(studentId, updatedData));
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };
};

// This action will post student family data to the API
export const postStudentFamilyData =
  (studentId, studentFamilyData) => async (dispatch) => {
    dispatch(postStudentFamilyRequest());
    try {
      for (let i = 0; i < studentFamilyData?.length; i++) {
        const response = await fetch(
          `${BASE_URL}/api/Students/${studentId}/FamilyMembers/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(studentFamilyData[i]),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to post student family data");
        }
        const resp = await response.json();
        dispatch(postStudentFamilySuccess());

        const userId = resp.ID;
        const nationalityResponse = await fetch(
          `${BASE_URL}/api/FamilyMembers/${userId}/Nationality/${Number(
            studentFamilyData?.[i].nationality
          )}`,
          {
            method: "PUT",
          }
        );
        const nationalityResult = await nationalityResponse.json();
        dispatch(
          addStudentFamilyNationality(
            userId,
            studentFamilyData?.[i].nationality
          )
        );
      }
    } catch (error) {
      dispatch(postStudentFailure(error.message));
    }
  };

// This action will post student data to the API
export const postStudent = (studentData, studentFamily) => async (dispatch) => {
  dispatch(postStudentRequest());
  try {
    const response = await fetch(`${BASE_URL}/api/Students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error("Failed to post student data");
    }
    const resp = await response.json();
    const userId = resp.ID;
    dispatch(postStudentSuccess(resp));

    const nationalityResponse = await fetch(
      `${BASE_URL}/api/Students/${userId}/Nationality/${studentData?.nationality}`,
      {
        method: "PUT",
      }
    );
    const nationalityResult = await nationalityResponse.json();
    dispatch(addUserNationality(userId, nationalityResult));

    if (studentFamily?.length) {
      dispatch(postStudentFamilyData(userId, studentFamily));
    }
  } catch (error) {
    dispatch(postStudentFailure(error.message));
  }
};

// This action will fetch all nationality from the API
export const getAllNationality = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Nationalities`);
      const data = await response.json();
      dispatch({ type: FETCH_ALL_NATIONALITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_NATIONALITY_FAILURE, payload: error });
    }
  };
};

// This action will fetch the student nationality from the API
export const fetchStudentNationality = (studentId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Students/${studentId}/Nationality/`
      );
      const data = await response.json();
      dispatch({
        type: FETCH_STUDENT_NATIONALITY_SUCCESS,
        payload: { studentId, nationality: data },
      });
    } catch (error) {
      dispatch({
        type: FETCH_STUDENT_NATIONALITY_FAILURE,
        payload: error.message,
      });
    }
  };
};

// This action will fetch the student family member from the API
export const fetchStudentFamilyData = (studentId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Students/${studentId}/FamilyMembers/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch(fetchFamilyDataSuccess(studentId, data));
    } catch (error) {
      dispatch(fetchFamilyDataFailure(error.message));
    }
  };
};
