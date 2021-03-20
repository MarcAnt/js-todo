
import AddTodo from './components/add-todo.js'; 
import Modal from './components/modal.js'; 
import Filters from './components/filters.js'; 


export default class View {
    constructor() {
        this.model = null; 
        this.table =  document.getElementById('table');
        this.addTodoForm = new AddTodo(); 
        this.modal = new Modal(); 
        this.filter = new Filters(); 

        //Stos vienen de cada import 
        this.addTodoForm.onClick( (title, description) => this.addTodo(title, description) ); 
        this.modal.onClick( (id, values) => this.editTodo(id, values) ); 
        this.filter.onClick( (filters) => this.filters(filters) ); 
    }

    setModel(model) {
        this.model = model; 
    }

    render() {
        const todos = this.model.getTodos(); //Trae la funcion del modelo que llama a todos los todos
        todos.forEach(todo => this.createRow(todo));    
    
    }

    //recibe un objeto {type: data.get('type'), words: data.get('words')} que viene de filter
    filters(filters) {
     

        const {type, words} = filters; 
        //Con [, ...rows] se evita el primer tr que está vacio y se crea una copia con el resto
        const [, ...rows] = this.table.getElementsByTagName('tr'); 
        for (const row of rows) {

            // console.log(row);
            const [title, description, completed] = row.children;  

            let shouldHide = false; 

            if (words) {
                //Sino contiene las palabras, se tienen que escoder las filas de la tabla y regresian 
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words); 

                //True cuando no hay valores que coincidan con el termino de busqueda 
                // console.log(shouldHide);
            }

            const shouldBeCompleted = type === 'completed'; 
            const isCompleted = completed.children[0].checked; 
            //Filtrar por si el tipo es distinto de toodos y el checked  es distinto de completed
            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true; 
            }

            //finalmente esconde la fila que coincida con la filtracion o cuando es true
            
            if (shouldHide) {
                row.classList.add('d-none'); 
                
            }else {
                row.classList.remove('d-none'); 

            }

        }
    }

    addTodo(title, description) {
        const todo = this.model.addTodo(title, description); //aqui solo se envian los datos al modelo pero no a la vista
        this.createRow(todo); 
    }

    editTodo(id, values) {
        this.model.editTodo(id, values); 
        const row = document.getElementById(id); 
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    removeTodo(id) {
        //Primero lo borra de la vista
        this.model.removeTodo(id); 

        document.getElementById(id).remove();
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id); 
    }

    createRow(todo){

        // alert.classList.add('d-none'); 
        const row = table.insertRow(); 
        row.setAttribute('id', todo.id);  
        row.innerHTML = `

            <td>${todo.title}</td>    
            <td>${todo.description}</td>    
            <td class="text-center" >
                
            </td>    
            <td class="text-right">
               
            </td>    
        
        `; 

        const checkbox = document.createElement('input'); 
        checkbox.type = 'checkbox'; 
        checkbox.checked = todo.completed; //como es booleano, se le asigna el valor
        checkbox.addEventListener('click', () => this.toggleCompleted(todo.id));     
        row.children[2].appendChild(checkbox);
        
        const editBtn = document.createElement('button'); 
        editBtn.classList.add('btn','btn-primary', 'mb-1'); 
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>'; 
        editBtn.setAttribute('data-toggle', 'modal'); 
        editBtn.setAttribute('data-target', '#modal'); 
        editBtn.addEventListener('click', (e) => {
            // this.modal.setValues(todo); //Aquí le envia todos los datos para poder editarlos desde el modal
            this.modal.setValues({
                id: todo.id,
                title: row.children[0].innerText,
                description: row.children[1].innerText,
                completed: row.children[2].children[0].checked = todo.completed
                
            })
        });

        row.children[3].appendChild(editBtn);


        const removeBtn = document.createElement('button'); 
        removeBtn.classList.add('btn','btn-danger', 'mb-1', 'ml-1'); 
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>'; 
        removeBtn.addEventListener('click', (e) => {
            this.removeTodo(todo.id); 
        });
        row.children[3].appendChild(removeBtn);
    }
}