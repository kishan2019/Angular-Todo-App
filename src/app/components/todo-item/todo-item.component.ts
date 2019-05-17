import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoServies: TodoService) { }

  ngOnInit() {
  }

  setClasses(){
    let classes ={
      todo:true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  
  onToggle(todo){
    //toggle in UI
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoServies.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    })
  }
  onDelete(todo){
    this.deleteTodo.emit(todo);
  }
  

}
