define(['knockout','common/dialog','viewmodels/common/confirmation-dialog'], function(ko,dialog,ConfirmationDialog){
    var sendType = function(options){
        var sendOptions = options || {};
        this.wallet= sendOptions.wallet;
        this.recipientAddress = ko.observable("");
        this.amount = ko.observable(sendOptions.amount || 0.0);
        this.minerFee = ko.observable(sendOptions.minerFee || 0.0001);
        this.walletPassPhrase = ko.observable("");
    };

    sendType.prototype.unlockWallet= function(){
        var self = this,
            /*confirmDialog = new ConfirmationDialog({
                title: 'Miner Fee Confirmation',
                contentTemplate: "modals/miner-fee-confirmation",
                context: this,
                affirmativeHandler: self.minerFeeConfirmYes,
                negativeHandler: self.minerFeeConfirmNo,
                message: "Do you want to accept the miner fee?",
                negativeButtonText: "No"            
            }).open();*/

            //dialog.openDialog({ text:ko.observable('Test')}, 'modals/placeholder');

            passphraseDialogPromise = new WalletPassphrase().userPrompt('Wallet unlock', 'Unlock the wallet for sending','OK')
            return passphraseDialogPromise;
    };

    
    /*sendType.prototype.minerFeeConfirmYes = function(){
        alert("Affirmative handler for miner fee confirm");
    };

    sendType.prototype.minerFeeConfirmNo = function(){
        alert("Negative handler for miner fee confirm");
    };*/

    sendType.prototype.insufficientFundsMessage = function(){
        dialog.notification("Insufficient funds");
    };
    
    sendType.prototype.sendSubmit = function(){
        var self = this;
        this.unlockWallet()
            .done(function(result){
                sendToAddress();
            })
            .fail(function(error){
                dialog.notification(error.message);
            });
    };
    
    sendType.prototype.sendToAddress = function() { 
        var self = this;
        sendCommand = new Command('sendToAddress', [self.recipientAddress(), self.amount()]).execute()
            .done(function(result){
                dialog.notification("Send Success"); 
                self.parent.refresh();
            })
            .fail(function(error){
                dialog.notification(error.message, "Send Error");
            })
            .always(function(){
            });
    }; 
    
    return sendType; 
});
