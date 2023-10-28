import { LightningElement, wire } from 'lwc';

import Name_Field from '@salesforce/schema/Account.Name';
import Revenue_Field from '@salesforce/schema/Account.AnnualRevenue';
import Industry_Field from '@salesforce/schema/Account.Industry';

import getAccount from '@salesforce/apex/AccountController.getAccount';
const COLUMNS = [
    { label: 'Account Name', fieldName: Name_Field.fieldApiName, type: 'text' },
    { label: 'Annual Revenue', fieldName: Revenue_Field.fieldApiName, type: 'currency' },
    { label: 'Industry', fieldName: Industry_Field.fieldApiName, type: 'text' }
]

export default class AccountList extends LightningElement {
    column = COLUMNS;
    @wire(getAccount)
    accounts;

    // get errors() {
    //     return(this.accounts.error) ? reduceError(this.accounts.error) : [];
    // }
}