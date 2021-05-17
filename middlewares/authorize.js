const { userGroups } = require("../helpers/userGroups");
const apiResponse = require("../helpers/apiResponse");
const User = require("../models/UserModel");

exports.is_authorized = function (req, res, next) {
  if (!req.userId) {
    return apiResponse.ErrorResponse(
      res,
      "User is not authorized, Invalid user ID"
    );
  }
  if (!req.resourceName) {
    return apiResponse.ErrorResponse(
      res,
      "User is not authorized, Invalid resource Name"
    );
  }
  if (!req.resourceActions) {
    return apiResponse.ErrorResponse(
      res,
      "User is not authorized, Invalid resource Actions"
    );
  }

  // get user's userGroup by user_id
  User.findById(req.userId, (err, userInfo) => {
    if (err) {
      return apiResponse.ErrorResponse(res, err);
    }
    if (!userInfo.isActive) {
      return apiResponse.ErrorResponse(
        res,
        "User is not authorized, InActive User"
      );
    }
    if (userInfo.isDeleted) {
      return apiResponse.ErrorResponse(
        res,
        "User is not authorized, Deleted User"
      );
    }
    const userGroup = userInfo.userGroup;
    const userGroupPermissions = userGroups[userGroup];
    const userResourcePermissions =
      userGroupPermissions.resourcePermissions.user;
    console.log("[authorize] user: " + req.userId + " userGroup: " + userGroup);
    //   console.log(req.userId)
    //   console.log(req.resourceName)
    //   console.log(req.resourceActions)
    //   console.log(userResourcePermissions)

    let isPermissionsAllowed = req.resourceActions.every((permission) =>
      userResourcePermissions.includes(permission)
    );
    //   console.log(isPermissionsAllowed)
    if (isPermissionsAllowed) {
      next();
    } else {
      console.log(
        "[authorize] user: " +
          req.userId +
          " is not authorized to perform '" +
          req.resourceActions.join(",") +
          "' on resource: " +
          req.resourceName
      );

      return apiResponse.ErrorResponse(
        res,
        "User is not authorized to perform action"
      );
    }
  });
};
