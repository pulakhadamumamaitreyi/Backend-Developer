const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const task = require("../controllers/taskController");

router.post("/", authMiddleware, task.createTask);
router.get("/", authMiddleware, task.getTasks);
router.put("/:id", authMiddleware, task.updateTask);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), task.deleteTask);

module.exports = router;
