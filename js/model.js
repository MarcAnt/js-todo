
export default class Model {
    constructor() {
        this.view = null; 
        this.todos = JSON.parse(localStorage.getItem('todos')); 
        //crear un todo por defecto si está vacio el localStorage
        if (!this.todos || this.todos.length < 1) {
            this.todos = [
                {
                    id: 0, 
                    title: 'Learn JS', 
                    description: 'Watch Javascript tutorials on Youtube', 
                    completed: false
                }
            ];
            this.currentId = 1; 
        }else {
            //Obtiene el último id de todos y le aumenta el valor en 1 para poder continuar donde se quedó   
            this.currentId = this.todos[this.todos.length - 1].id + 1; 
        }

    }

    setView(view) {
        this.view = view; 
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos)); 
    }

    getTodos() {
        // return this.todos; 
        //Es preferible pasar un valor de referencia o una copia 
        return this.todos.map( (todo) => ({...todo}) );  
    }

    findTodo(id){
        return this.todos.findIndex( (todo) => todo.id === id ); 
    }


    toggleCompleted(id) {
        //Se consigue el index primer
       const index = this.findTodo(id);
       
       //Luego se busca el valor que coincida en el index
       const todo = this.todos[index]; 
       todo.completed = !todo.completed; 
       this.save(); 
       console.log(this.todos);
    }    
    
    editTodo(id, values){ 
        const index = this.findTodo(id);
        this.todos[index] = {id, ...values }; 
    }

    addTodo(title, description) {
      
        const todo = {
            id : this.currentId++, 
            title, 
            description, 
            completed: false
        }

        this.todos.push(todo); 

        //retorna un objeto clonado de todo, para que no sea modificado el original 
        // return Object.assign({}, todo); 
        this.save(); 
        return {... todo}; 
    }

    removeTodo(id) {
        //Obtiene el idice si el valor del id es igua id en this.todo
        const index = this.findTodo(id); 
        console.log(this.todos[index])

        this.todos.splice(index, 1); 
        this.save(); 
    }
}