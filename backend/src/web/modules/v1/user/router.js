const router = require("express").Router();
const { verifyJWT } = require("../../../../middleware/verifyJWT");
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("./controller/user");

//IMPORT ROUTES

router.get("/", getUsers);
router.get("/:id", verifyJWT, getUserById);
router.delete("/delete/:id", verifyJWT, deleteUser);
router.put("/update/:id", verifyJWT, updateUser);

module.exports = router;
