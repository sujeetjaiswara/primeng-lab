import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [FormsModule, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos = signal<Todo[]>([]);
  newTodo = signal('');

  // Computed properties
  totalTodos = computed(() => this.todos().length);
  remainingTodos = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );

  addTodo() {
    if (this.newTodo().trim()) {
      this.todos.update((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          text: this.newTodo().trim(),
          completed: false,
        },
      ]);
      this.newTodo.set('');
    }
  }

  removeTodo(id: string) {
    this.todos.update((current) => current.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string) {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
}
