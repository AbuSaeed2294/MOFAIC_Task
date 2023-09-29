const initialState = {
  users: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BASIC_INFO":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_FAMILY_MEMBER":
      return {
        ...state,
        familyMembers: [...state.familyMembers, ...action.member],
      };
    case "UPDATE_FAMILY_MEMBER":
      const { id, updatedUserData } = action.payload;
      const updatedUser = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUserData } : user
      );
      return { ...state, users: updatedUser };
    case "DELETE_FAMILY_MEMBER":
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
    case "DELETE_USER":
      const userIdToDelete = action.payload;
      const filteredUsers = state.users.filter(
        (user) => user.id !== userIdToDelete
      );
      return {
        ...state,
        users: filteredUsers,
      };
    default:
      return state;
  }
};

export default studentReducer;
