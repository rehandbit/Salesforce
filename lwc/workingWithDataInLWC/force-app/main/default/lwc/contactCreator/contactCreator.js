import { LightningElement } from 'lwc';
import { showToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FN from '@salesforce/schema/Contact.FirstName';
import CONTACT_LN from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email'


export default class ContactCreator extends LightningElement {
    
    contact_object  = CONTACT_OBJECT;
    fields = [CONTACT_FN, CONTACT_LN, CONTACT_EMAIL,];

    handleSuccess(event) {
        const toastEvent = new showToastEvent({
            title : "Contact Created",
            message : "Record Id:" +event.detail.Id,
            variant : "Success"

        });
        this.dispatchEvent(toastEvent);
    }
}