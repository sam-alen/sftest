//decoradores
import { LightningElement, wire } from 'lwc';
//metodo insert
import insertUsersFromAPI from '@salesforce/apex/UserInfoController.insertUsersFromAPI';
//metodo get
import getUsers from '@salesforce/apex/UserInfoController.getUsers';
//metodo update
import updateUsers from '@salesforce/apex/UserInfoController.updateUsers';
//metodo delete
import deleteUsers from '@salesforce/apex/UserInfoController.deleteUsers';
//metodo para mandar notifications
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//metodo para refrescar 
import { refreshApex } from '@salesforce/apex';

export default class UserTable extends LightningElement {
    users;
    error;
    wiredUsersResult; // Para almacenar el resultado de @wire
    selectedRows = []; // Para almacenar los registros seleccionados

    //Estructura de la tabla
    columns = [
        { 
            label: 'Name', 
            fieldName: 'name__c',
            type: 'text',
            editable: true
        },
        { 
            label: 'Username', 
            fieldName: 'username__c',
            type: 'text',
            editable: true
        },
        { 
            label: 'Email', 
            fieldName: 'email__c',
            type: 'email',
            editable: true
        },
        { 
            label: 'Phone', 
            fieldName: 'phone__c',
            type: 'phone',
            editable: true
        },
        { 
            label: 'Street', 
            fieldName: 'Street__c',
            type: 'text',
            editable: true
        },
        { 
            label: 'City', 
            fieldName: 'City__c',
            type: 'text',
            editable: true
        },
        { 
            label: 'Zipcode', 
            fieldName: 'Zipcode__c',
            type: 'text',
            editable: true
        }
    ];

    @wire(getUsers)
    wiredUsers(result) {
        this.wiredUsersResult = result;
        const { data, error } = result;
        if (data) {
            this.users = data.map(user => {
                return {
                    ...user,
                    Street__c: user.Address_Custom__r?.Street__c,
                    City__c: user.Address_Custom__r?.City__c,
                    Zipcode__c: user.Address_Custom__r?.Zipcode__c
                };
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.users = [];
        }
    }

    handleInsert() {
        insertUsersFromAPI()
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Users inserted successfully!',
                        variant: 'success'
                    })
                );
                // Actualizar los datos en la tabla
                return refreshApex(this.wiredUsersResult);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error inserting users: ' + error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    handleDelete() {
        if (this.selectedRows.length > 0) {
            deleteUsers({ userIds: this.selectedRows })
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Users deleted successfully!',
                            variant: 'success'
                        })
                    );
                    // Actualizar los datos en la tabla
                    return refreshApex(this.wiredUsersResult);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'Error deleting users: ' + error.body.message,
                            variant: 'error'
                        })
                    );
                });
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Warning',
                    message: 'No users selected for deletion!',
                    variant: 'warning'
                })
            );
        }
    }

    handleCellChange(event) {
        const draftValues = event.detail.draftValues;
        if (draftValues.length > 0) {
            this.updateUserRecords(draftValues);
        }
    }

    updateUserRecords(draftValues) {
        updateUsers({ usersToUpdate: draftValues })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Users updated successfully!',
                        variant: 'success'
                    })
                );
                // Refrescar los datos en la tabla
                return refreshApex(this.wiredUsersResult);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error updating users: ' + error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedRows = selectedRows.map(row => row.Id);
    }
}
