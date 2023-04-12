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
      backlogList: JSON.parse(localStorage.getItem("backlog")) || [],
      inputValue: "",
      readyList: JSON.parse(localStorage.getItem("ready")) || [],
      inProgressList: JSON.parse(localStorage.getItem("inprogress")) || [],
      finishedList: JSON.parse(localStorage.getItem("finished")) || [],
      clickedBtnBacklog: false,
      clickedBtnReady: false,
      clickedBtnInProgress: false,
      clickedBtnFinished: false,
    };
  }
  onClickBacklog = () => {
    this.setState({
      clickedBtnBacklog: true,
    });
  };
  onChangeInput = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  onSubmitBacklog = () => {
    const { backlogList, inputValue } = this.state;
    if (inputValue !== "") {
      this.setState({
        backlogList: [...backlogList, inputValue],
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
    const elemIndex = backlogList.indexOf(inputValue);
    if (inputValue !== "") {
      this.setState({
        readyList: [...readyList, inputValue],
        clickedBtnReady: false,
        backlogList: [
          ...backlogList.splice(0, elemIndex),
          ...backlogList.splice(elemIndex + 1),
        ],
        inputValue: "",
      });
    }
  };
  onSubmitInProgress = () => {
    const { inProgressList, readyList, inputValue } = this.state;
    const elemIndex = readyList.indexOf(inputValue);
    if (inputValue !== "") {
      this.setState({
        inProgressList: [...inProgressList, inputValue],
        clickedBtnInProgress: false,
        readyList: [
          ...readyList.splice(0, elemIndex),
          ...readyList.splice(elemIndex + 1),
        ],
        inputValue: "",
      });
    }
  };
  onSubmitFinished = () => {
    const { inProgressList, finishedList, inputValue } = this.state;
    const elemIndex = inProgressList.indexOf(inputValue);
    if (inputValue !== "") {
      this.setState({
        finishedList: [...finishedList, inputValue],
        clickedBtnFinished: false,
        inProgressList: [
          ...inProgressList.splice(0, elemIndex),
          ...inProgressList.splice(elemIndex + 1),
        ],
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
      inProgressList,
    } = this.state;
    const backlog = JSON.stringify(backlogList);
    localStorage.setItem("backlog", backlog);
    const ready = JSON.stringify(readyList);
    localStorage.setItem("ready", ready);
    const inprogress = JSON.stringify(inProgressList);
    localStorage.setItem("inprogress", inprogress);
    const finished = JSON.stringify(finishedList);
    localStorage.setItem("finished", finished);
    return (
      <>
        <header>
          <div className="header__title">Awesome Kanban Board</div>
          <UserMenu></UserMenu>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Table
                    todoList={JSON.parse(localStorage.getItem("backlog"))}
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
                    titleName="Ready"
                    todoListAfter={backlogList}
                    todoList={readyList}
                    onChange={this.handleChange}
                    disabledBtn={backlogList.length === 0}
                    nameBtn={!clickedBtnReady ? "+Add card" : "Submit"}
                    onClick={
                      !clickedBtnReady ? this.onClickReady : this.onSubmitReady
                    }
                    clickedBtn={clickedBtnReady}
                  ></Table>
                  <Table
                    titleName="In Progress"
                    todoListAfter={readyList}
                    todoList={inProgressList}
                    nameBtn={!clickedBtnInProgress ? "+Add card" : "Submit"}
                    onChange={this.handleChange}
                    disabledBtn={readyList.length === 0}
                    onClick={
                      !clickedBtnInProgress
                        ? this.onClickInProgress
                        : this.onSubmitInProgress
                    }
                    clickedBtn={clickedBtnInProgress}
                  ></Table>
                  <Table
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
                    disabledBtn={inProgressList.length === 0}
                    clickedBtn={clickedBtnFinished}
                  ></Table>
                </>
              }
            />
            <Route path="/:id" element={<TaskDesc></TaskDesc>} />
          </Routes>
        </main>
        <footer>
          <div className="footer__active">
            Active task: {inProgressList.length}{" "}
          </div>
          <div className="footer__finished">
            Finished task: {finishedList.length}{" "}
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
