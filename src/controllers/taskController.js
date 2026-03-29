const pool = require("../config/db");

/* CREATE */
exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;

        const result = await pool.query(
            "INSERT INTO tasks(title,user_id) VALUES($1,$2) RETURNING *",
            [title, req.user.id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* READ */
exports.getTasks = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE user_id=$1",
            [req.user.id]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* UPDATE */
exports.updateTask = async (req, res) => {
    try {
        const { title } = req.body;

        const result = await pool.query(
            "UPDATE tasks SET title=$1 WHERE id=$2 RETURNING *",
            [title, req.params.id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* DELETE */
exports.deleteTask = async (req, res) => {
    try {
        await pool.query("DELETE FROM tasks WHERE id=$1", [
            req.params.id
        ]);

        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
