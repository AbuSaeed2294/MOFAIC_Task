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
} from "../Action/actionTypes";

const initialState = {
  users: [],
  students: [],
  allNationality: [],
  nationalityData: {},
  familyData: {},
  studentFamilyNationality: {},
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    // get student data
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        students: [],
        loading: false,
        error: action.payload,
      };
    // post student data
    case POST_STUDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students, action.payload.newStudentData],
        isLoading: false,
      };
    case POST_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // post student family data
    case POST_STUDENT_FAMILY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_STUDENT_FAMILY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case POST_STUDENT_FAMILY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // get nationality
    case FETCH_ALL_NATIONALITY_SUCCESS:
      return {
        ...state,
        allNationality: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ALL_NATIONALITY_FAILURE:
      return {
        ...state,
        allNationality: [],
        loading: false,
        error: action.payload,
      };
    // post student nationality
    case ADD_USER_NATIONALITY:
      return {
        ...state,
        userNationalities: {
          ...state.userNationalities,
          [action.payload.userId]: action.payload.nationalityData,
        },
      };
    // post student family nationality
    case ADD_STUDENT_FAMILY_NATIONALITY:
      return {
        ...state,
        studentFamilyNationality: {
          ...state.studentFamilyNationality,
          [action.payload.userId]: action.payload.nationalityData,
        },
      };
    //get student nationality
    case FETCH_STUDENT_NATIONALITY_SUCCESS:
      return {
        ...state,
        nationalityData: {
          ...state.nationalityData,
          [action.payload.studentId]: action.payload.nationality,
        },
        error: null,
      };
    case FETCH_STUDENT_NATIONALITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    // Get and Post family data
    case FETCH_FAMILY_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        familyData: {
          ...state.familyData,
          [action.payload.studentId]: action.payload.familyData,
        },
      };
    case FETCH_FAMILY_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // update student data
    case UPDATE_STUDENT_DATA:
      const { studentId, updatedData } = action.payload;
      return {
        ...state,
        students: {
          ...state.student?.students,
          [studentId]: {
            ...state.student.students[studentId],
            ...updatedData,
          },
        },
      };
    // update student nationality
    case UPDATE_STUDENT_NATIONALITY:
      return {
        ...state,
        nationalityData: {
          ...state.nationalityData,
          [action.payload.studentId]: action.payload.nationalityData,
        },
      };
    // add family member
    case ADD_FAMILY_MEMBER:
      return {
        ...state,
        familyMembers: [...state.familyMembers, ...action.member],
      };
    case UPDATE_FAMILY_MEMBER:
      const { id, updatedUserData } = action.payload;
      const updatedUser = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUserData } : user
      );
      return { ...state, users: updatedUser };
    case DELETE_FAMILY_MEMBER:
      const { userId, familyMemberIndex } = action.payload;
      const updatedUsers = state.users.map((user) => {
        if (user.id === userId) {
          const updatedFamilyInfo = [...user.familyInfo];
          updatedFamilyInfo.splice(familyMemberIndex, 1);
          return {
            ...user,
            familyInfo: updatedFamilyInfo,
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
      };
    default:
      return state;
  }
};

export default studentReducer;
