const root = document.getElementById("root");

function App() {
  const [activity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [message, setMessage] = React.useState(""); // id untuk menentukan todo yang akan dihapus

  function generalId() {
    return Date.now();
  } //ketika form di submit


  function saveTodoHandeler(event) {
    event.preventDefault(); // validasi ketika form kosong

    if (!activity) {
      return setMessage("Kosong, gaes!! apa yang di save?");
    }

    setMessage("");

    if (edit.id) {
      const updateTodo = { ...edit,
        activity: activity
      };
      const editTodoIndex = todos.findIndex(todo => todo.id === edit.id); // clone array todos

      const updateTodos = [...todos];
      updateTodos[editTodoIndex] = updateTodo;
      setTodos(updateTodos);
      return cancelEditHandler();
    }

    setTodos([...todos, {
      id: generalId(),
      activity: activity,
      done: false
    }]);
    setActivity("");
  } // function hapus


  function removeTodoHandler(id) {
    setTodos(todos.filter(todo => todo.id !== id));
    if (edit.id === id) cancelEditHandler();
  } // function edit


  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  } // function cancel edit


  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  } // function done/undone (checkbox)


  function doneTodoHandler(todo) {
    const updateTodo = { ...todo,
      done: !todo.done
    };
    const editTodoIndex = todos.findIndex(currentTodo => currentTodo.id === todo.id); // clone array todos

    const updateTodos = [...todos];
    updateTodos[editTodoIndex] = updateTodo;
    setTodos(updateTodos);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "When When When"), message && /*#__PURE__*/React.createElement("span", {
    className: "validate"
  }, message), /*#__PURE__*/React.createElement("div", {
    class: "flex"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: saveTodoHandeler
  }, /*#__PURE__*/React.createElement("textarea", {
    type: "text",
    placeholder: "Jiaaah mikir xixixi :)",
    value: activity,
    onChange: event => {
      setActivity(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "update"
  }, " ", /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Update" : "Save"), edit.id && /*#__PURE__*/React.createElement("button", {
    className: "cancel",
    onClick: cancelEditHandler
  }, "Cancel"))), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(todo => {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: todo.done,
      onChange: doneTodoHandler.bind(this, todo)
    }), /*#__PURE__*/React.createElement("span", {
      className: "done"
    }, todo.done ? "Done" : "Undone"), /*#__PURE__*/React.createElement("p", null, todo.activity), /*#__PURE__*/React.createElement("div", {
      className: "divLi"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: editTodoHandler.bind(this, todo)
    }, "Edit"), /*#__PURE__*/React.createElement("button", {
      onClick: removeTodoHandler.bind(this, todo.id)
    }, "Remove")));
  })) : /*#__PURE__*/React.createElement("h3", null, "Belum ada apa-apa, sodara-sodara.")));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);