/*
  Implement a class `Todo` having below methods
    # add(todo): adds todo to list of todos
    # remove(indexOfTodo): remove todo from list of todos
    # update(index, updatedTodo): update todo at given index
    # getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    # clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    constructor() {
        this.todos = [];
    }
    add(todo) {
        this.todos.push(todo);
    }
    remove(indexOfTodo) {
        this.todos.splice(indexOfTodo, 1);
    }
    update(index, updatedTodo) {
        this.todos[index] = updatedTodo;
    }
    get(index) {
        return this.todos[index];
    }
    getAll() {
        return this.todos;
    }
    clear() {
        this.todos = [];
    }
}

const myTodos = new Todo();
myTodos.add("Buy groceries");
myTodos.add("Eat meal");
myTodos.add("Pay Bill");
myTodos.add("Sleep");
myTodos.remove(3);
myTodos.update(1, 'Eat Meal');
console.log(myTodos.get(2));
// myTodos.clear()
console.log(myTodos.getAll());