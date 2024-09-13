import { LightningElement, api, wire, track } from 'lwc';
import getTaskByProject from '@salesforce/apex/TaskController.getTaskByProject'; // metodo apex para obtener las tareas asociadas al proyecto
import markTaskAsCompleted from '@salesforce/apex/TaskController.markTaskAsCompleted'; // metodo apex para obtener las

export default class ProjectTasks extends LightningElement {
    @api projectId; // id del proyecto
    //arrray de tareas
    @track tasks = [];
    //error
    @track error;
    ///cargando
    @track loading = true;

    //llamada al meotdo apex para obtener las tareas asociadas al proyecto
    @wire(getTaskByProject, { projectId: '$projectId'})
    wiredTasks({ error, data }) {
        if(data) { 
            this.tasks = data;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.tasks = [];
        }
        this.loading = false;
    }

    handleMarkAsCompleted(event) {
        const taskId  = event.target.dataset.id;

        //llamada de apex
        markTaskAsCompleted({taskId})
            .then(() => {
                this.tasks = this.tasks.map(task => {
                    if(task.Id === taskId){
                        task.Status__c = 'Complete';
                    }

                    return task
                });
            })
            .catch(error => {
                this.error = error;
                console.error('Error marking task as completed', error);
            })
    }

    refreshTasks() {
        this.loading = true;
        getTaskByProject({ projectId: this.projectId })
            .then(data => {
                this.tasks = data;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.tasks = [];
            })
            .finally(() => {
                this.loading = false;
            });
    }
}