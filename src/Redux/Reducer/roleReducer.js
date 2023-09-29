const initialState = {
  role: "Admin",
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADMIN_ROLE":
      return {
        ...state,
        role: "Admin",
      };
    case "SET_REGISTRAR_ROLE":
      return {
        ...state,
        role: "Registrar",
      };
    default:
      return state;
  }
};

export default roleReducer;
