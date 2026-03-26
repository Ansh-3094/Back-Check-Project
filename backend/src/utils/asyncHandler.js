//this basically is a WRAPPAR that we can use it when needed.More of a Utility code
//This is ONE way.

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//This is a example of higher order function
/* const asyncHandler = () => {}
const asyncHandler = (func) => {() => {}}
const asyncHandler = (func) => async () => {} */

//this basically is a WRAPPAR that we can use it when needed.More of a Utility code
//This is SECOND way.
/* const asyncHandler = (fn) => async (req, res, next) => {
     try {
         await fn(req, res, next)
     } catch (error) {
         res.status(err.code || 500).json({
             success: false,
             message: err.message
         })
     }
 }*/
