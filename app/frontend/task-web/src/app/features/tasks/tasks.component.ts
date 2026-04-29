import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { TaskItem } from '../../interfaces/task-item';
import { TaskApiService } from '../../core/task-api';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks = signal<TaskItem[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  showDone = signal(true);

  filtered = computed(() =>
    this.showDone()
      ? this.tasks()
      : this.tasks().filter(t => !t.isDone)
  );

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    priority: new FormControl(2, { nonNullable: true })
  });

  constructor(private api: TaskApiService) {
    this.refresh();
  }

  refresh() {
    this.loading.set(true);
    this.error.set(null);

    this.api.list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: data => this.tasks.set(data),
        error: () => this.error.set('No se pudo cargar la lista.')
      });
  }

  async create() {
    if (this.form.invalid) return;

    const confirmation = await Swal.fire({
      title: '¿Seguro que quiere añadir esta tarea?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (confirmation.isConfirmed) {
      Swal.fire("Tarea añadida", "", "success");
    }
    else {
      this.form.reset();
      return;
    }

    const { title, priority } = this.form.getRawValue();
    this.loading.set(true);
    this.error.set(null);

    this.api.create({ title, priority })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.form.reset({ title: '', priority: 2 });
          this.refresh();
        },
        error: () => this.error.set('No se pudo crear la tarea.')
      });
  }

  toggleDone(task: TaskItem) {
    this.api.update(task.id, { isDone: !task.isDone }).subscribe({
      next: updated => {
        this.tasks.set(this.tasks().map(t => t.id === updated.id ? updated : t));
      },
      error: () => this.error.set('No se pudo actualizar la tarea.')
    });
  }

  async remove(task: TaskItem) {
    const confirmation = await Swal.fire({
      title: `¿Quieres borrar la tarea "${task.title}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545'
    });

    if (confirmation.isConfirmed) {
      Swal.fire("Tarea eliminada", "", "error");
      this.form.reset();
    }
    else {
      this.form.reset();
      return;
    }

    this.api.delete(task.id).subscribe({
      next: () => this.tasks.set(this.tasks().filter(t => t.id !== task.id)),
      error: () => this.error.set('No se pudo borrar la tarea.')
    });
  }
}