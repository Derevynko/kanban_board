import "./App.css";
import React from "react";
import Table from "./components/Table/Table.jsx";
import UserMenu from "./components//UserMenu/UserMenu.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDesc from "./components/TaskDesc/TaskDesc.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backlogList: JSON.parse(localStorage.getItem("backlog")) || new Object(),
      inputValue: "",
      nameTask: localStorage.getItem("nameTask") || "",
      taskId: localStorage.getItem("taskId") || "",
      readyList: JSON.parse(localStorage.getItem("ready")) || new Object(),
      inProgressList:
        JSON.parse(localStorage.getItem("inprogress")) || new Object(),
      finishedList:
        JSON.parse(localStorage.getItem("finished")) || new Object(),
      clickedBtnBacklog: false,
      keyTask: localStorage.getItem("keyTask") || 0,
      clickedBtnReady: false,
      clickedBtnInProgress: false,
      clickedBtnFinished: false,
    };
  }
  onClickUserMenu = () => {
    console.log(123);
    const userMenu = document.querySelector(".user_menu__dropdown-container");
    const userMenuIcon = document.querySelector(
      ".user_menu__dropdown-activated"
    );
    if (userMenu.classList.contains("active-conteiner")) {
      userMenu.classList.remove("active-conteiner");
      userMenuIcon.classList.remove("active-icon");
    } else {
      userMenu.classList.add("active-conteiner");
      userMenuIcon.classList.add("active-icon");
    }
  };
  onClickBacklog = () => {
    this.setState({
      clickedBtnBacklog: true,
    });
  };
  updateData = (nameTask, id) => {
    this.setState({
      nameTask: nameTask,
      taskId: id,
    });
  };
  onChangeInput = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  onSubmitBacklog = () => {
    const { backlogList, inputValue, keyTask } = this.state;
    if (inputValue !== "") {
      backlogList[keyTask.toString()] = inputValue;
      this.setState({
        keyTask: keyTask + 1,
        backlogList: backlogList,
        clickedBtnBacklog: false,
        inputValue: "",
      });
    }
  };
  onClickReady = () => {
    this.setState({
      clickedBtnReady: true,
    });
  };
  onClickInProgress = () => {
    this.setState({
      clickedBtnInProgress: true,
    });
  };
  onClickFinished = () => {
    this.setState({
      clickedBtnFinished: true,
    });
  };
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };
  onSubmitReady = () => {
    const { backlogList, readyList, inputValue } = this.state;
    const elemIndex =
      Object.keys(backlogList)[Object.values(backlogList).indexOf(inputValue)];
    if (inputValue !== "") {
      readyList[elemIndex] = inputValue;
      delete backlogList[elemIndex];
      this.setState({
        readyList: readyList,
        clickedBtnReady: false,
        backlogList: backlogList,
        inputValue: "",
      });
    }
  };
  onSubmitInProgress = () => {
    const { inProgressList, readyList, inputValue } = this.state;
    const elemIndex =
      Object.keys(readyList)[Object.values(readyList).indexOf(inputValue)];
    if (inputValue !== "") {
      inProgressList[elemIndex] = inputValue;
      delete readyList[elemIndex];
      this.setState({
        inProgressList: inProgressList,
        clickedBtnInProgress: false,
        readyList: readyList,
        inputValue: "",
      });
    }
  };
  onSubmitFinished = () => {
    const { inProgressList, finishedList, inputValue } = this.state;
    const elemIndex =
      Object.keys(inProgressList)[
        Object.values(inProgressList).indexOf(inputValue)
      ];
    if (inputValue !== "") {
      finishedList[elemIndex] = inputValue;
      delete inProgressList[elemIndex];
      this.setState({
        finishedList: finishedList,
        clickedBtnFinished: false,
        inProgressList: inProgressList,
        inputValue: "",
      });
    }
  };

  render() {
    const {
      clickedBtnBacklog,
      backlogList,
      inputValue,
      clickedBtnInProgress,
      finishedList,
      clickedBtnFinished,
      clickedBtnReady,
      readyList,
      keyTask,
      inProgressList,
      taskId,
      nameTask,
    } = this.state;
    const backlog = JSON.stringify(backlogList);
    localStorage.setItem("backlog", backlog);
    const ready = JSON.stringify(readyList);
    localStorage.setItem("ready", ready);
    localStorage.setItem("nameTask", nameTask);
    localStorage.setItem("taskId", taskId);
    const inprogress = JSON.stringify(inProgressList);
    localStorage.setItem("inprogress", inprogress);
    const finished = JSON.stringify(finishedList);
    localStorage.setItem("finished", finished);
    localStorage.setItem("keyTask", keyTask);
    return (
      <>
        <header>
          <div className="header__title">Awesome Kanban Board</div>
          <UserMenu onClick={this.onClickUserMenu}></UserMenu>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Table
                    updateData={this.updateData}
                    todoList={backlogList}
                    onClick={
                      !clickedBtnBacklog
                        ? this.onClickBacklog
                        : this.onSubmitBacklog
                    }
                    titleName="Backlog"
                    onChangeInput={this.onChangeInput}
                    inputValue={inputValue}
                    nameBtn={!clickedBtnBacklog ? "+Add card" : "Submit"}
                    clickedBtn={clickedBtnBacklog}
                  ></Table>
                  <Table
                    updateData={this.updateData}
                    titleName="Ready"
                    todoListAfter={backlogList}
                    todoList={readyList}
                    onChange={this.handleChange}
                    disabledBtn={Object.keys(backlogList).length === 0}
                    nameBtn={!clickedBtnReady ? "+Add card" : "Submit"}
                    onClick={
                      !clickedBtnReady ? this.onClickReady : this.onSubmitReady
                    }
                    clickedBtn={clickedBtnReady}
                  ></Table>
                  <Table
                    updateData={this.updateData}
                    titleName="In Progress"
                    todoListAfter={readyList}
                    todoList={inProgressList}
                    nameBtn={!clickedBtnInProgress ? "+Add card" : "Submit"}
                    onChange={this.handleChange}
                    disabledBtn={Object.keys(readyList).length === 0}
                    onClick={
                      !clickedBtnInProgress
                        ? this.onClickInProgress
                        : this.onSubmitInProgress
                    }
                    clickedBtn={clickedBtnInProgress}
                  ></Table>
                  <Table
                    updateData={this.updateData}
                    titleName="Finished"
                    todoListAfter={inProgressList}
                    todoList={finishedList}
                    nameBtn={!clickedBtnFinished ? "+Add card" : "Submit"}
                    onChange={this.handleChange}
                    onClick={
                      !clickedBtnFinished
                        ? this.onClickFinished
                        : this.onSubmitFinished
                    }
                    disabledBtn={Object.keys(inProgressList).length === 0}
                    clickedBtn={clickedBtnFinished}
                  ></Table>
                </>
              }
            />
            <Route
              path="/:id"
              element={<TaskDesc task={nameTask} id={taskId}></TaskDesc>}
            />
          </Routes>
        </main>
        <footer>
          <div className="footer__active">
            Active task: {Object.keys(inProgressList).length}{" "}
          </div>
          <div className="footer__finished">
            Finished task: {Object.keys(finishedList).length}{" "}
          </div>
          <div className="footer__avtor_information">
            Kanban board by Maksim, 2023
          </div>
        </footer>
      </>
    );
  }
}
export default App;
