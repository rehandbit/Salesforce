import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import AcctObjImp from '@salesforce/schema/Account';
import Name_Field from '@salesforce/schema/Account.Name';
import Revenue_Field from '@salesforce/schema/Account.AnnualRevenue';
import Industry_Field from '@salesforce/schema/Account.Industry';

export default class AccountCreator extends LightningElement {

    AOI = AcctObjImp;
    imported_Field = [Name_Field, Revenue_Field, Industry_Field];

    handleSuccess(event) {
        const toastEvent= new ShowToastEvent ({
            title: "Account Created",
            message: "Record Id:" + event.detail.Id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}