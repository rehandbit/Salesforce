public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount() {
            return [ SELECT Name, AnnualRevenue, Industry FROM Account with SECURITY_ENFORCED ORDER BY Name ];
        // throw new AuraHandledException('Forced error');
        } 
    }