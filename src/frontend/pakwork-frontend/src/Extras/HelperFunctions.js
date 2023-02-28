export const checkAge = (dob) => {
  var diff_ms = Date.now() - new Date(dob).getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};
export const toSentenceCase = (str) => {
  if (!str) return str; // If the string is empty or null, return it as is
  const lowerCaseStr = str.toLowerCase(); // Convert the string to lowercase
  return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
};
