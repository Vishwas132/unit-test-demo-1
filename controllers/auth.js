const auth = require("express").Router();

auth.post("/signin", (req, res) => {
  const {email, password} = req.body;
  if (!email) return res.status(401).json({error: "errorCodes.EMAIL_EMPTY"});
  if (!password)
    return res.status(401).json({error: "errorCodes.PASSWORD_EMPTY"});
  passport.authenticate("localv1", {session: false}, async function (
    error,
    userObj
  ) {
    try {
      await models.sequelize.transaction(async () => {
        if (error) {
          if (error.code === errorCodes.USER_LOGIN_LOCKED.code) {
            return res
              .status(401)
              .json({error, lockPeriodInMins: accountLockDurationInMins});
          }
          if (error.code === errorCodes.USER_NOT_PRESENT.code) {
            return res.status(401).json({error});
          }
        }
        if (!userObj) {
          var user = await getUserByEmail({email});
          const updatedUserObj = await updateFailedLoginAttempt(user);
          return res.status(401).json({
            error: errorCodes.INVALIDPASSWORD,
            failedAttempts: updatedUserObj.failedLoginCount,
            totalAttempts: accountLockMaxAttempts,
            lockPeriodInMins: accountLockDurationInMins
          });
        }

        const UserObjUnlocked = await clearAccountFailedLoginLock(userObj);
        const signedUser = await createUserSession(
          req,
          UserObjUnlocked.id,
          UserObjUnlocked.email,
          UserObjUnlocked.UserType.type,
          false,
          false
        );
        logger.debug("signedUser1: " + JSON.stringify(signedUser));
        return res.status(200).json({...toSession(JSON.stringify(signedUser))});
      });
    } catch (error) {
      logger.error(`Controller - auth: /signin : `, error);
      return res.status(401).json({error});
    }
  })(req, res);
});