const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    addFriend,
    deleteFreind,
} = require('../../controllers/userControllers');

router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser);

router.routes('/:userId/friends/:friendsId').post(addFriend).delete(deleteFreind);

module.exports = router;

