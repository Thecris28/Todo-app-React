
import imgDelete from "../assets/images/icon-cross.svg";

export const TodoItem = ({ todo, onDelete, onToggle }) => {

  const handleDelete = () => {
    const todoElement = document.getElementById(`todo-${todo.id}`);
    todoElement.classList.add('fade-out');
    setTimeout(() => onDelete(todo.id), 500);
  };

  return (
    <li id={`todo-${todo.id}`} className="todo-item">
      <input
        name="checkbox"
        checked={todo.completed === true}
        type="checkbox"
        onChange={() => onToggle(todo.id)}

      />
      <span className={todo.completed === false ? 'todo-item-togle' : 'todo-item-togle-presed'}>{todo.title}</span>
      <button onClick={handleDelete}>
        <img src={imgDelete} alt="" />
      </button>
    </li>
  )
}
