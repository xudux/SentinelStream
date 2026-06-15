export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => {
  return getRole() === "ADMIN";
};

export const isAnalyst = () => {
  return getRole() === "FRAUD_ANALYST";
};

export const isUser = () => {
  return getRole() === "USER";
};