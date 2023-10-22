public with sharing class LeaveControllerHandlers {
    @AuraEnabled(cacheable=true)
    
    public static List<Leave_Request__c> getMyLeave()  {
        try {
            List<Leave_Request__c> myLeaves = new List<Leave_Request__c>();
            myLeaves = [SELECT Id,Name,From_Date__c,To_Date__c,Reason__c,Status__c,Manager_Comments__c,User__r.Name FROM Leave_Request__c 
            WHERE User__c=:UserInfo.getUserId() WITH SECURITY_ENFORCED  ORDER BY CreatedDate DESC];
            return myLeaves;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
        @AuraEnabled(cacheable=true)
    public static List<Leave_Request__c> getLeaveRequests(){
        try {
            List<Leave_Request__c> leaveRequest=new List<Leave_Request__c>();
            leaveRequest=[SELECT Id,Name,From_Date__c,To_Date__c,Reason__c,Status__c,Manager_Comments__c,User__r.ManagerId,User__r.Name FROM Leave_Request__c 
            WHERE User__r.ManagerId=:UserInfo.getUserId() WITH SECURITY_ENFORCED ORDER BY CreatedDate DESC ];
            return leaveRequest;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
