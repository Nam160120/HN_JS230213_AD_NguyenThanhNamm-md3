const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  password: "12345678",
  user: "root",
  port: 3306,
  database: "tasks",
});

connection.connect((err) => {
  if (err) {
    console.log("Kết nối thất bại", err);
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = connection;