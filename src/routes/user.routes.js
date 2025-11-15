import {Router} from 'express';
import { registerUser , refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from '../controllers/user.controllers.js';
import {upload} from '../middlewares/multrt.middleware.js';
import { loginUser } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import{ logoutUser} from '../controllers/user.controllers.js';
const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar'
            ,maxCount: 1
            
        },
        {
            name : 'coverImage',
            maxCount: 1
        }
    ]),
    registerUser)

    router.route('/login').post(
        loginUser
    )

    //secured routes
    router.route('/logout').post(
        verifyJWT,
        logoutUser
    )

    router.route('/refresh-token').post(
        refreshAccessToken
    )

    router.route('/changePassword').post(
        verifyJWT , changeCurrentPassword
)

    router.route('/currentUser').get(verifyJWT , getCurrentUser)

    router.route('/updateAccountDetails').patch(verifyJWT , updateAccountDetails)

    router.route('/avatar').patch(verifyJWT , upload.single("avatar") , updateUserAvatar)

    router.route("/coverImage").patch(verifyJWT , upload.single("/coverimage") , updateUserCoverImage)

    router.route("/c/:username").get(verifyJWT , getUserChannelProfile)

    router.route("/history").get(verifyJWT , getWatchHistory )

export default router;