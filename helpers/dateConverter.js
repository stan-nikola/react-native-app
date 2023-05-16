export const dateConverter = () => {
  const date = new Date();

  const dateStr =
    ("00" + date.getDate()).slice(-2) +
    " " +
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getFullYear() +
    " | " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2);
  return dateStr;
};
