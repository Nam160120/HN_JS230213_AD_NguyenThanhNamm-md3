const express = require("express");
const server = express();
const port = 8000;
const connection = require("./connectionMySQL");
const bodyParser = require("body-parser");
const cors = require("cors");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.get("/api/v1/tasks", (req, res) => {
  const queryString = "select * from tasks";
  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

server.get("/api/v1/tasks/:id", (req, res) => {
  let { id } = req.params;
  const queryString = `select * from tasks where taskId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        data: result,
      });
    }
  });
});

server.delete("/api/v1/tasks/:id", (req, res) => {
  let { id } = req.params;
  const queryString = `delete from tasks where taskId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Xóa thành công",
      });
    }
  });
});

server.post("/api/v1/tasks", (req, res) => {
  const { content, dateDue, statusTask, assign } = req.body;
  const newTask = [content, dateDue, statusTask, assign];
  const queryString =
    "insert into tasks(content, dateDue, statusTask, assign) values (?, ?, ?, ?);";

  connection.query(queryString, newTask, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: "OK",
        message: "Thêm mới thành công",
      });
    }
  });
});

server.put("/api/v1/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { content, dateDue, statusTask, assign } = req.body;
  const newTask = [content, dateDue, statusTask, assign, id];
  const queryString =
    "update tasks set content=?, dateDue=?, statusTask=?, assign=? where taskId=?";

  connection.query(queryString, newTask, (err) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Cập nhật thành công",
      });
    }
  });
});

server.listen(port, (err, res) => {
  console.log(`http://localhost:${port}`);
});
