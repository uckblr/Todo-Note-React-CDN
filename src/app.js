const root = document.getElementById("root");

function App() {
  const [activity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [message, setMessage] = React.useState("");

  // id untuk menentukan todo yang akan dihapus
  function generalId() {
    return Date.now();
  }

  //ketika form di submit
  function saveTodoHandeler(event) {
    event.preventDefault();

    // validasi ketika form kosong
    if (!activity) {
      return setMessage("Kosong, gaes!! apa yang di save?");
    }

    setMessage("");

    if (edit.id) {
      const updateTodo = {
        ...edit,
        activity: activity,
      };

      const editTodoIndex = todos.findIndex((todo) => todo.id === edit.id);
      // clone array todos
      const updateTodos = [...todos];
      updateTodos[editTodoIndex] = updateTodo;
      setTodos(updateTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generalId(),
        activity: activity,
        done: false,
      },
    ]);
    setActivity("");
  }

  // function hapus
  function removeTodoHandler(id) {
    setTodos(todos.filter((todo) => todo.id !== id));

    if (edit.id === id) cancelEditHandler();
  }

  // function edit
  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  // function cancel edit
  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  }

  // function done/undone (checkbox)
  function doneTodoHandler(todo) {
    const updateTodo = {
      ...todo,
      done: !todo.done,
    };

    const editTodoIndex = todos.findIndex(
      (currentTodo) => currentTodo.id === todo.id
    );
    // clone array todos
    const updateTodos = [...todos];
    updateTodos[editTodoIndex] = updateTodo;
    setTodos(updateTodos);
  }

  return (
    <>
      <h1>When When When</h1>
      {message && <span className="validate">{message}</span>}
      <div class="flex">
        <form onSubmit={saveTodoHandeler}>
          <textarea
            type="text"
            placeholder="Jiaaah mikir xixixi :)"
            value={activity}
            onChange={(event) => {
              setActivity(event.target.value);
            }}
          />
          <div className="update">
            {" "}
            <button type="submit">{edit.id ? "Update" : "Save"}</button>
            {edit.id && (
              <button className="cancel" onClick={cancelEditHandler}>
                Cancel
              </button>
            )}
          </div>
        </form>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={doneTodoHandler.bind(this, todo)}
                  />
                  <span className="done">{todo.done ? "Done" : "Undone"}</span>
                  <p>{todo.activity}</p>
                  <div className="divLi">
                    <button onClick={editTodoHandler.bind(this, todo)}>
                      Edit
                    </button>
                    <button onClick={removeTodoHandler.bind(this, todo.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>Belum ada apa-apa, sodara-sodara.</h3>
        )}
      </div>
    </>
  );
}

ReactDOM.render(<App />, root);
