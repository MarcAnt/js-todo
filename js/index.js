
/**
 *  Para crear un servidor local con node y poder usar los modulos de import
 *  npm i -g serve
 *  serve -l 3000
 * 
 * 
 */
import Model from './model.js'; 
import View from './view.js'; 

document.addEventListener('DOMContentLoaded', function() {

    const model = new Model(); 
    const view = new View();
    
    model.setView(view);
    view.setModel(model); 

    //Se muestran todos lo datos almacenados 
    view.render(); 
}); 