// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MainTask.css";

// function MainTask(props) {
//
//   const [showLoading, setShowLoading] = useState(false);

//   const loadData = async () => {
//     setShowLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8000/api/v1/tasks");
//       setTasks(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//     setShowLoading(false);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <>
//       <div className="form-input">
//     <form>
//     <input type="text" value={Content} onChange={handleContentChange} />
//     <input type="date" value={DueDate} onChange={handleDueDateChange} />
//     <input type="text" value={Statuss} onChange={handleStatussChange} />
//     <input type="text" value={Assigned} onChange={handleAssignedChange} />
//     <button type="submit" onClick={(e) => handleAdd(e)}>
//       Submit
//     </button>
//   </form>
// </div>
//         <div  id="inputTasks">
//           <label htmlFor="">@</label>
//           <input type="text" />
//         </div>
//         <div className="submitTask">
//           <button>Submit</button>
//         </div>
//       </div>
//         <div className="task-show">
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Content</th>
//                 <th>Due Date</th>
//                 <th>Status</th>
//                 <th>Assigned to</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.data?.map((task, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{task.content}</td>
//                   <td>{task.dateDue}</td>
//                   <td>{task.status}</td>
//                   <td>{task.assign}</td>
//                   <td>
//                     <button>Edit</button>
//                     <button>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     </>
//   );
// }

// export default MainTask;

import React, { useState, useEffect } from "react";
import "./MainTask.css";
import axios from "axios";

function MainTask() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [dateDue, setDueDate] = useState("");
  const [statusTask, setStatuss] = useState("");
  const [assign, setAssigned] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    console.log(e.target.value);
  };
  const handleStatussChange = (e) => {
    setStatuss(e.target.value);
    console.log(e.target.value);
  };
  const handleAssignedChange = (e) => {
    setAssigned(e.target.value);
    console.log(e.target.value);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    let newTask = { content, dateDue, statusTask, assign };
    console.log(newTask);
    await axios
      .post("http://localhost:8000/api/v1/tasks",newTask)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const loadData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/api/v1/tasks/${id}`)
      .then((res) => {
        if (res.data.status === "OK") {
          loadData();
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(tasks.data);
  return (
    <div>
      <div className="container-head">
        <form>
          <input type="text" value={content} onChange={handleContentChange} />
          <input type="date" value={dateDue} onChange={handleDueDateChange} />
          <input
            type="text"
            value={statusTask}
            onChange={handleStatussChange}
          />
          <input type="text" value={assign} onChange={handleAssignedChange} />
          <button type="submit" onClick={(e) => handleAdd(e)}>
            Submit
          </button>
        </form>
      </div>
      <div className="table-infor">
        <div className="table-infor">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Content</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.data?.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.content}</td>
                  <td>{task.dateDue}</td>
                  <td>{task.status}</td>
                  <td>{task.assign}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(tasks.tasksId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainTask;
