
import { TodoItem } from "./TodoItem";
export const TodoList = ({ todo, onDelete, onToggle }) => {
    
  return (
    <>
    {
        todo.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle}/>
        ))
    }
    </>
  );
};
