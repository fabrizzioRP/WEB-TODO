import { Todo } from './todo.class';

const contadorPendiente = document.querySelectorAll('strong');

export class TodoList {

    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
        this.contadorPendientes();
    }

    agregarTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();    
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();    
    }

    marcarCompletados( id ){

        for (const todo of this.todos) {
            
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();    
                break;
            }
        
        }

    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();    
    }

    guardarLocalStorage(){
        localStorage.setItem('todo' , JSON.stringify(this.todos) );
    }

    cargarLocalStorage(){
        
        this.todos = ( localStorage.getItem('todo') ) ? JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map( Todo.fromJson );

    }

    contadorPendientes(){
        let contador = 0;
        
        for (const elemento of this.todos) {
            if( !elemento.completado  ){
                contador++;
            }
        }

        contadorPendiente[0].innerText = contador;

    }

}
