import { LightningElement, wire } from 'lwc';
import getMyLeave from '@salesforce/apex/LeaveControllerHandlers.getMyLeave';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';

import LeaveRequest from '@salesforce/apex/LeaveControllerHandlers.getLeaveRequests';


const COLUMNS = [
    {label: 'Request Id' , fieldName:'Name' },
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
    
    PopupModal = false;
    
    recordId = '';

    currentUserId = Id;

    @wire(getMyLeave)
    wiredMyLeaves(result) {
        this.myLeavesWireResult = result;
        if(result.data) {
            this.myLeaves = result.data.map(a => ({
                ...a,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_inverse' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '' ,
                isEditDisabled: a.Status__c != 'Pending'
                }));
        }
        if(result.error) {
            console.log('Error occured while fetching my Leaves-', result.error);
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
        refreshApex(this.myLeavesWireResult);

        const refreshEvent = new CustomEvent('refreshleaverequest');
        this.dispatchEvent(refreshEvent);
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



    // Leave Request

    // @wire(LeaveRequest)
    // wiredMyLeaves(result) {
    //     this.LeaveRequestWiredResult = result;
    //     if(result.data) {
    //         this.LeaveRequest = result.data.map(ab => ({
    //             ...ab,
    //             cellClass: ab.Status__c == 'Approved' ? 'slds-theme_inverse' : ab.Status__c == 'Rejected' ? 'slds-theme_warning' : '' ,
    //             isEditDisabled: ab.Status__c != 'Pending'
    //             }));
    //     }
    //     if(result.error) {
    //         console.log('Error occured while fetching my Leaves-', result.error);
    //     }
    // }
}