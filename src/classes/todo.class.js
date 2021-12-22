
export class Todo {
 

    static fromJson({ id, tarea, completado , creado }){

        const newTarea = new Todo( tarea );
        
        newTarea.id = id;
        newTarea.completado = completado;
        newTarea.creado = creado;

        return newTarea;
    }


    constructor( tarea ){
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    
    }


}    
