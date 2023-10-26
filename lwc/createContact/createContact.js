import { LightningElement, api } from 'lwc';
import { RefreshEvent } from "lightning/refresh";
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';
import { createRecord } from 'lightning/uiRecordApi';

export default class createContact extends LightningElement {
    @api
    recordId;
    firstname='';
    lastname='';
    email='';

    handleFirstNameChange(event) {
        this.firstname = event.target.value;
    }
    handleLastNameChange(event) {
        this.lastname = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    CreateContact() {
        const fields = {};
        fields[FIRST_NAME_FIELD.fieldApiName] = this.firstname;
        fields[LAST_NAME_FIELD.fieldApiName] = this.lastname;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[ACCOUNT_ID.fieldApiName] = this.recordId;
        const recordInput = {apiName: CONTACT_OBJECT.objectApiName, fields};
        createRecord(recordInput).then(() => {
            this.dispatchEvent(new RefreshEvent());
        }).catch((error)=> {
            console.log(error);
        })
    }
}