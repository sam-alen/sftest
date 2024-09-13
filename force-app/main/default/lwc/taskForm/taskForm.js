import { LightningElement, api, track } from 'lwc';
import addTask from '@salesforce/apex/TaskController.addTask';

export default class TaskForm extends LightningElement {
    @api projectId;
    @track taskName = '';
    @track taskDescription = '';
    @track taskDueDate;
    @track error;

    handleNameChange(event) {
        this.taskName = event.target.value;
    }

    handleDescriptionChange(event) {
        this.taskDescription = event.target.value;
    }

    handleDueChange(event) {
        this.taskDueDate = event.target.value;
    }

    //Clear Form function
    clearForm() {
        this.taskName = '';
        this.taskDescription = '';
        this.taskDueDate = null;
        this.error = null;
    }

    handleAddTask(){
        if(!this.taskName || !this.taskDueDate){
            this.error = "Please Complate the required fields"
            return;
        }

        //Call apex for call the new task
        addTask({
            projectId: this.projectId,
            name: this.taskName,
            description: this.taskDescription,
            dueDate: this.taskDueDate
        })
        .then(() => {
            this.clearForm();
            const event = newCustomEvent('taskadded');
            this.dispatchEvent(event);
        })
        .catch(error => {
            this.error = error.body.message;
        });
    }
}