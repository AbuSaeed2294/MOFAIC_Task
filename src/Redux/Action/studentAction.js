export const updateBasicInfo = (user) => ({
  type: "UPDATE_BASIC_INFO",
  payload: user,
});

export const addFamilyMember = (member) => ({
  type: "ADD_FAMILY_MEMBER",
  member,
});

export const updateFamilyMember = (id, updatedUserData) => ({
  type: "UPDATE_FAMILY_MEMBER",
  payload: { id, updatedUserData },
});

export const deleteFamilyMember = (userId, familyMemberIndex) => ({
  type: "DELETE_FAMILY_MEMBER",
  payload: { userId, familyMemberIndex },
});

export const deleteUser = (userId) => ({
  type: "DELETE_USER",
  payload: userId,
});
