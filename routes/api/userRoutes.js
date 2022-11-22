const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;





