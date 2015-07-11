define(['knockout','common/dialog','viewmodels/common/confirmation-dialog'], function(ko,dialog,ConfirmationDialog){
    var sendType = function(options){
        var sendOptions = options || {};
        this.parent = sendOptions.parent;
        this.recipientAddress = ko.observable("");
        this.amount = ko.observable(sendOptions.amount || 0.0);
        this.minerFee = ko.observable(sendOptions.minerFee || 0.0001);
    };

    sendType.prototype.minerFeeConfirm = function(){
        var confirmDialog = new ConfirmationDialog({
            title: 'Miner Fee Confirmation',
            contentTemplate: "modals/miner-fee-confirmation",
            context: this,
            affirmativeHandler: function() { alert("Affirmative handler for miner fee confirm"); },
            negativeHandler: function() { alert("Affirmative handler for miner fee cancel"); },
            message: "Do you want to accept the miner fee?",
            negativeButtonText: "No"            
        }).open();
    };

    sendType.prototype.insufficientFundsMessage = function(){
        dialog.notification("Insufficient funds");
    };
    
    sendType.prototype.executeSend = function(){
        this.minerFeeConfirm();
    };
    
    return sendType; 
});
