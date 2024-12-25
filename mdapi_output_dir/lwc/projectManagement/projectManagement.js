import { LightningElement, track } from 'lwc';

export default class ProjectManagement extends LightningElement {
    @track projectId = 'a0123456789ABCDE';  // ID del proyecto. Esto puede venir de la lógica de tu aplicación.

    handleTaskAdded() {
        const projectTasksComponent = this.template.querySelector('c-project-tasks');
        if (projectTasksComponent) {
            projectTasksComponent.refreshTasks();  // Llamamos al método refreshTasks en el hijo para actualizar la lista
        }
    }
}
