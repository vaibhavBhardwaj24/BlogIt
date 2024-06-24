const asyncHandler = (func) => async (req, res, next) => {
  try {
    return func(req, res, next);
  } catch (error) {
    console.error(error);
  }
};
export {asyncHandler}