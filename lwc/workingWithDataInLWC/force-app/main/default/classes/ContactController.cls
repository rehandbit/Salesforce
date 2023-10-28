public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [ SELECT FirstName, LastName, Email from Contact 
                with SECURITY_ENFORCED ORDER BY FirstName ];
// throw new AuraHandledException('Forced error');
    }
}