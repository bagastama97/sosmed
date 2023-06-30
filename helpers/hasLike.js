module.exports = (value, UserId) => {
  let hasLike = false;
  value.forEach((el) => {
    if (el.UserId == UserId) hasLike = true;
  });
  return hasLike;
};
