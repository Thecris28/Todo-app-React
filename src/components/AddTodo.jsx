
import { useForm } from '../hooks/useForm'

export const AddTodo = ({ newTodo }) => {

    const { input: { title }, handleInput, reset } = useForm({
        title: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (title.length <= 1) return;
        const todoAdd = {
            id: crypto.randomUUID(),//new Date().getTime(),
            title: title.charAt(0).toUpperCase() + title.slice(1),
            completed: false
        }
        newTodo(todoAdd);
        reset();
    }


    return (
        <section>
            <form className='todo-input' onSubmit={handleSubmit}>
                <button type='submit' className='input-button'></button>
                <input
                    className="input-todo"
                    name='title'
                    value={title}
                    type="text"
                    placeholder="Create a new todo"
                    onChange={handleInput}
                />
            </form>
        </section>
    )
}
