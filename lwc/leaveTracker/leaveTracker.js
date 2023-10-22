import { LightningElement, api, wire } from 'lwc';
import getMyLeave from '@salesforce/apex/LeaveControllerHandlers.getMyLeave';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';
import getLeaveRequest from '@salesforce/apex/LeaveControllerHandlers.getLeaveRequests';


const COLUMNS = [
    {label: 'Request Id' , fieldName:'Name' },
    {label: 'User' , fieldName:'userName' },

    {label: 'From Date' , fieldName:'From_Date__c'},
    {label: 'To Date' , fieldName:'To_Date__c'},
    {label: 'Reason' , fieldName:'Reason__c'},
    {label: 'Status' , fieldName:'Status__c', cellAttributes: {class: {fieldName: 'cellClass'}} },
    {label: 'Manager Comments' , fieldName:'Manager_Comments__c'},
    {
        type: "button" ,typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'edit',
            value: 'edit',
            disabled: { fieldName: 'isEditDisabled'}
        },cellAttributes: { class: { fieldName: 'cellClass' } }
    }
];
export default class LeaveTracker extends LightningElement {
    columns=COLUMNS;
    myLeaves=[];
    myLeavesWireResult;
    
    leaveRequestWiredResult;
    leaveRequest=[];
    PopupModal = false;
    
    recordId = '';

    currentUserId = Id;
// wire for my leave section
    @wire(getMyLeave)
    wiredMyLeaves(result) {
        this.myLeavesWireResult = result;
        if(result.data) {
            this.myLeaves = result.data.map(a => ({
                ...a,
                userName: a.User__r.Name,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_inverse' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '' ,
                isEditDisabled: a.Status__c != 'Pending'
                }));
        }
        if(result.error) {
            console.log('Error occured while fetching my Leaves-', result.error);
        }
    }

    // wire for get leave request

    @wire(getLeaveRequest)
    wiredMyLeavess(resultz) {
        this.leaveRequestWiredResult = resultz;
        if(resultz.data) {
            this.leaveRequest = resultz.data.map(a => ({
                ...a,
                userName: a.User__r.Name,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '',
                isEditDisabled: a.Status__c != 'Pending'
            }));
        }
        if(resultz.error) {
            console.log('Error occured while fetching leave request', resultz.error)
        }
    }

    closePopupModal () {
        this.PopupModal = false;
    }
    newRequestClickHandler () {
        this.PopupModal = true;
        this.recordId = '';
    }
    //rowActionHandler this enable us to edit modal form ny poping up modal after edit it save new edited form//
    rowActionHandler (event) {
        this.PopupModal = true;
        this.recordId = event.detail.row.Id;
    }
    succesHandler (event) {
        this.PopupModal = false;
        this.ShowToast('Data Saved Successfully');
        // this refreshApex refresh the row and also refresh leave request , from this we dont have refresh browser again .c/accordion
        // when ever there is update it automaically update using "refreshApex"
        refreshApex(this.myLeavesWireResult);
        refreshApex(this.leaveRequestWiredResult);
    }

    ShowToast(message, title = 'success', variant = 'success') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
    submitHandler(event) {
        event.preventDefault();
        const fields = { ...event.detail.fields};
        fields.Status__c = 'Pending';
        if(new Date(fields.From_Date__c) > new Date(fields.To_Date__c)) {
            this.ShowToast('From date should not be greater than To Date','Error','error');
        } else if(new Date() > new Date(fields.From_Date__c)) {
            this.ShowToast('From Date should not be less then Today Date','Error','error');
        } else {
            this.refs.leaveRequestFrom.submit(fields);
        }
    }

    get noRecordFound(){
        return this.myLeaves.length==0;
    }
}
