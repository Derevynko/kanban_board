import React from "react";
import "./Table.css";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import ListItem from "../ListItem/ListItem.jsx";
import DropDown from "../DropDown/DropDown";
class Table extends React.Component {
  onClickListItem = () => {};
  render() {
    const {
      titleName,
      nameBtn,
      onClick,
      onChange,
      clickedBtn,
      updateData,
      todoListAfter,
      disabledBtn,
      todoList,
      onChangeInput,
      inputValue,
    } = this.props;
    console.log(todoList);
    return (
      <div className="table">
        <div className="table__title">{titleName}</div>
        <div className="table__list">
          <div>
            {Object.keys(todoList)?.map((key) => {
              return (
                <ListItem
                  todoName={todoList[key]}
                  id={key}
                  updateData={updateData}
                ></ListItem>
              );
            })}
          </div>
        </div>
        {clickedBtn && titleName === "Backlog" ? (
          <Input onChangeInput={onChangeInput} inputValue={inputValue}></Input>
        ) : null}
        {clickedBtn && titleName === "Ready" ? (
          <DropDown
            todoList={todoListAfter}
            clickedBtn={clickedBtn}
            onChange={onChange}
          ></DropDown>
        ) : null}
        {clickedBtn && titleName === "In Progress" ? (
          <DropDown
            todoList={todoListAfter}
            clickedBtn={clickedBtn}
            onChange={onChange}
            titleName={titleName}
          ></DropDown>
        ) : null}
        {clickedBtn && titleName === "Finished" ? (
          <DropDown
            todoList={todoListAfter}
            clickedBtn={clickedBtn}
            onChange={onChange}
            titleName={titleName}
          ></DropDown>
        ) : null}

        <Button
          disabled={disabledBtn}
          state={clickedBtn}
          onClick={() => onClick()}
          name={nameBtn}
        />
      </div>
    );
  }
}
export default Table;
