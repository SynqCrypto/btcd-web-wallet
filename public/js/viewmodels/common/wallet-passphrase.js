define(['knockout','common/dialog','viewmodels/common/confirmation-dialog','viewmodels/common/command'], function(ko,dialog,ConfirmationDialog,Command) {
    var walletPassphraseType = function(options){
        var self = this,
            options = options || {};
        this.forEncryption = options.forEncryption || ko.observable(false);
        this.walletPassphrase = ko.observable('');
        this.stakingOnly = ko.observable(true);
        this.canSpecifyStaking = false;
        this.canSubmit = ko.computed(function(){
            return true;
            return self.walletPassphrase().length > 0;
        });
    };

    walletPassphraseType.prototype.userPrompt = function(encrypt, title, message, affirmativeButtonText){
        var self = this, 
            walletPassphraseDeferred = $.Deferred(),
            passphraseDialog = new ConfirmationDialog({
                title: title || 'Wallet passphrase',
                contentTemplate: "modals/password-prompt",
                context: self,
                canAffirm: self.canSubmit,
                allowClose: false,
                showNegativeButton: false,
                message: encrypt ? "Specify a passphrase for encrypting your wallet" : "",
                affirmativeButtonText: affirmativeButtonText,
                affirmativeHandler: function(walletPassphrsaeDeferred){
                    self.openWallet()
                        .done(function(result){
                            walletPassphraseDeferred.resolve(result);
                        })
                        .fail(function(error){
                            walletPassphraseDeferred.reject(error);
                        });
                }
            });
            self.forEncryption = encrypt;
            passphraseDialog.open();

        return walletPassphraseDeferred.promise();
    };

    walletPassphraseType.prototype.openWallet = function(){
        var self = this, openWalletDeferred= $.Deferred(), 
            walletPassphraseCommand = new Command('walletpassphrase', [self.walletPassphrase(), self.stakingOnly()]);

        walletPassphraseCommand.execute()
            .done(function(result){
                openWalletDeferred.resolve(result);
            })
            .fail(function(error){
                //Consider creating a custom error object with message, static codes, etc...
                openWalletDeferred.reject(error);
            })
            .always(function(){
                //Close the dialog 
            });

        return openWalletDeferred.promise();
    };
    return walletPassphraseType;
});
