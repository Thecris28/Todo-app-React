
import { TodoItem } from "./TodoItem";
import { Reorder } from "motion/react"

export const TodoList = ({ todos, onDelete, onToggle, onReorder }) => {
    
  return (
    <Reorder.Group as="ul" values = {todos} axis="y" onReorder={onReorder}>
    {
        todos.map(todo => (
            <Reorder.Item key={todo.id} value={todo} className="todo-item-reorder">
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle}/>
            </Reorder.Item>
        ))
    }
    </Reorder.Group>
  );
};
