define(['knockout','common/dialog','viewmodels/common/confirmation-dialog','viewmodels/common/wallet-passphrase','viewmodels/common/command'], function(ko,dialog,ConfirmationDialog,WalletPassphrase,Command){
    var sendType = function(options){
        var self = this, sendOptions = options || {};
        this.wallet= sendOptions.parent;
        this.recipientAddress = ko.observable("");
        this.amount = ko.observable(sendOptions.amount || 0.0);
        this.minerFee = ko.observable(sendOptions.minerFee || 0.0001);
        this.canSend = ko.computed(function(){
            var amount = self.amount(),
                isNumber = !isNaN(amount),
                address = self.recipientAddress(),
                available = self.wallet.walletStatus.available(),
                canSend;

            canSend = isNumber && available > 0, address.length > 0;
            return canSend;
        });
    };

    function lockWallet(){
        var sendCommand = new Command('walletlock').execute()
            .done(function(result){
                console.log('Wallet relocked');
            })
            .fail(function(error){
                dialog.notification(error.message, "Failed to re-lock wallet");
            });
        return sendCommand;
    }
   
    sendType.prototype.unlockWallet= function(){
        var self = this, walletPassphrase = new WalletPassphrase({canSpecifyStaking:false, stakingOnly:false}),
            passphraseDialogPromise = $.Deferred();

        walletPassphrase.userPrompt(false, 'Wallet unlock', 'Unlock the wallet for sending','OK')
            .done(function(result){
                passphraseDialogPromise.resolve(walletPassphrase.walletPassphrase());                            
            })
            .fail(function(error){
                passphraseDialogPromise.reject(error);
            });
        return passphraseDialogPromise;
    };

    sendType.prototype.sendSubmit = function(){
        var self = this;
        console.log("Send request submitted, unlocking wallet for sending...");
        if(self.canSend()){
            lockWallet().done(function(){
                self.unlockWallet()
                    .done(function(result){
                        console.log("Wallet successfully unlocked, sending...");
                        self.sendToAddress(result);
                    })
                    .fail(function(error){
                        dialog.notification(error.message);
                    });
            }); 
        }
        else{
            console.log("Can't send. Form in invalid state");
        }
    };
    
    sendType.prototype.sendToAddress = function(auth) { 
        var self = this;
        sendCommand = new Command('sendtoaddress', [self.recipientAddress(), self.amount()]).execute()
            .done(function(result){
                console.log("Send Success");
                auth = "";
                self.recipientAddress('');
                self.amount(0);

                lockWallet()
                    .done(function(){
                        var walletPassphrase = new WalletPassphrase({
                            walletPassphrase: auth,
                            forEncryption: false,
                            stakingOnly: true
                        });
                        console.log("Wallet successfully relocked. Opening for staking...");
                        walletPassphrase.openWallet(false)
                            .done(function() {
                                console.log("Wallet successfully re-opened for staking");
                                self.wallet.refresh()
                            });
                    });
            })
            .fail(function(error){
                console.log("Send error:");
                console.log(error);
            });
   
    };   
    return sendType; 
});
