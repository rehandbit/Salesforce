import { LightningElement, wire } from 'lwc';

import FirstName_Field from '@salesforce/schema/Contact.FirstName';
import LastName_Field from '@salesforce/schema/Contact.LastName';
import Email_Field from '@salesforce/schema/Contact.Email';

import getContacts from '@salesforce/apex/ContactController.getContacts';
// import { reduceErrors } from 'c/ldsUtils';
const COLUMNS = [
    { label: 'First Name', fieldName: FirstName_Field.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LastName_Field.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: Email_Field.fieldApiName,  },

]
export default class ContactList extends LightningElement {
    column = COLUMNS;
    @wire(getContacts)
    contacts;
    // get errors() {
    //     return ( this.contacts.error) ?
    //     reduceErrors(this.contacts.error) : [];
    // }
}