import React from "react";
import "./TaskDesc.css";
class TaskDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDescriptions:
        JSON.parse(localStorage.getItem("taskDescription")) || new Object(),
    };
  }
  onChangeTask = () => {
    const elem = document.querySelector(".task_description__container");
    const textByTextContent = elem.textContent;
    const { taskDescriptions } = this.state;
    const { id } = this.props;
    taskDescriptions[id] = textByTextContent;
    this.setState({
      taskDescriptions: taskDescriptions,
    });
  };
  render() {
    const { task, id } = this.props;
    const { taskDescriptions } = this.state;
    const taskDescription = JSON.stringify(taskDescriptions);
    localStorage.setItem("taskDescription", taskDescription);
    return (
      <div className="task_description">
        <h1>{task}</h1>
        <a href="/">
          <div className="task_description__close" onClick={this.onChangeTask}>
            <hr className="task_description__close_left-line" />
            <hr className="task_description__close_right-line" />
          </div>
        </a>
        <p contentEditable="true" className="task_description__container">
          {taskDescriptions[id] || "This task has no description"}
        </p>
      </div>
    );
  }
}
export default TaskDesc;
