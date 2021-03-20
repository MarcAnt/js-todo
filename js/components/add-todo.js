
import Alert from './alert.js'; 
export default class AddTodo {

    constructor() {
        this.btn =  document.getElementById('add');
        this.title =  document.getElementById('title');
        this.description =  document.getElementById('description');

        this.alert = new Alert('alert'); 
    }

    onClick(callback) {
        this.btn.addEventListener('click', () => {
             
            if (this.title.value === '' || this.description.value === '') {
               
                // alert.innerText = "Title and Description are required"; 
                this.alert.show("Title and Description are required"); 

               console.error('incorrecto');     
            }else {
                this.alert.hide(); 
                callback(this.title.value, this.description.value); 
            }
        })
    } 
}