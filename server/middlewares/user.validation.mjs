export const validateUserData = (req, res, next) => {
   const { username, password, firstname, lastname } = req.body;
   if (!username || !password || !firstname || !lastname) {
    return res.status(400).json({
        message: "Please provide all required fields: username, password, firstname, lastname."
    });
   }

   next();
}