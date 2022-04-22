export const Todo = ({todo,index,remove}) =>{
    function handle() {
        remove(index);
    }
    return <div className='todo' onClick={handle}>{todo.text} &#10007;</div>
}