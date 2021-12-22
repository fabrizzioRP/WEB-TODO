import { Todo } from "../classes";
import { todoList } from '../index';

// Referencias
const divTodoList          = document.querySelector('.todo-list');
const txtInput             = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFilter             = document.querySelector('.filters');
const anchorFiltros        = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        
        const nuevoTodo = new Todo( txtInput.value );
        
        todoList.agregarTodo( nuevoTodo );
        
        crearTodoHtml( nuevoTodo );
        todoList.contadorPendientes();
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {

    const nombreEvento = event.target.localName; // label , input, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId       = todoElemento.getAttribute('data-id');

    if ( nombreEvento.includes('input') ){ // click en el check
    
        todoList.marcarCompletados( todoId );
        todoList.contadorPendientes();
        todoElemento.classList.toggle('completed');
    
    } else if ( nombreEvento.includes('button') ){ // Borrar el todo
        
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }

});

btnBorrarCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1 ; i >= 0 ; i-- ){

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){

            divTodoList.removeChild( elemento );

        }

    }

});


ulFilter.addEventListener('click', ( event ) => {
  
    const nameFilter = event.target.text;
    
    if( !nameFilter ) return;

    anchorFiltros.forEach( item => item.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( nameFilter ) {
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }


});