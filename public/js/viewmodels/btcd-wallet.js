define(['knockout','common/dialog','viewmodels/wallet-status','viewmodels/send/send','viewmodels/receive/receive','viewmodels/history/history','viewmodels/console/console', 'bindinghandlers/modal','viewmodels/common/wallet-passphrase'], 
function(ko, dialog, WalletStatus, Send, Receive, History, Console, Modal, WalletPassphrase){

    var walletType = function(options){
        var self = this;
        self.btcdTotal = ko.observable(0);
        self.btcdAvailable = ko.observable(0);
        self.btcdStaking = ko.observable(0);
        self.currentView = ko.observable('send');
        self.sidebarToggled = ko.observable(false);
        self.isWalletUnencrypted = ko.observable(true);
        
        self.checkEncryptionStatus();
        self.send = new Send({parent: self}); 
        self.history = new History({parent: self}); 
        self.console = new Console({parent: self}); 
        self.receive = new Receive({parent: self});
        self.walletStatus = new WalletStatus({parent: self});
        self.refresh();
        self.pollWalletStatus();
    };

    walletType.prototype.unlockWallet = function(){
        new WalletPassphrase().userPrompt('Wallet unlock', 'Unlock the wallet for sending','OK')
            .done(function(result){
                console.log(result);
                dialog.notification("Success");
            })
            .fail(function(error){
                console.log(error);
                dialog.notification(error.message);
            });
        //dialog.openDialog({ text:ko.observable('Test')}, 'modals/placeholder');
    };

    walletType.prototype.encryptWallet = function(){
        dialog.notification("Coming soon");    
    };

    walletType.prototype.walletPassphraseAffirmative = function(){

    };

    walletType.prototype.toggleSidebar = function(){
        this.sidebarToggled(!this.sidebarToggled());
    };

    walletType.prototype.refresh = function(refreshTargets){
        return $.when(this.walletStatus.load(), this.history.load(), this.receive.load());
    };

    walletType.prototype.pollWalletStatus = function(){
        var self = this;
        setTimeout(function(){
            self.refresh().then(function(){
                self.pollWalletStatus();
            });
        },60000);
    };

    walletType.prototype.checkEncryptionStatus = function(){
        var self = this;
        var getTransactionsCommand = new Command('walletpassphrase',[]),
            encryptionStatusPromise = getTransactionsCommand.execute()
            .done(function(data){
                dialog.notification("There is something seriously wrong with everything.");
            })
            .fail(function(error){
                switch(error.code){
                    case -15: 
                        self.isWalletUnencrypted(true);
                        self.promptToEncrypt();
                        break;
                    case -1:
                        self.isWalletUnencrypted(false);
                        self.promptToUnlockForStaking();
                        break;
                };
            });
    };

    walletType.prototype.promptToEncrypt = function(){
        new WalletPassphrase().userPrompt('Wallet encrypt', 'Encrypt','OK')
            .done(function(result){
                console.log(result);
                dialog.notification("Success");
            })
            .fail(function(error){
                console.log(error);
                dialog.notification(error.message);
            });
    };

    walletType.prototype.promptToUnlockForStaking = function(){
        new WalletPassphrase().userPrompt('Wallet unlock', 'Unlock the wallet for sending','OK')
            .done(function(result){
                console.log(result);
                dialog.notification("Success");
            })
            .fail(function(error){
                console.log(error);
                dialog.notification(error.message);
            });
    };

    return walletType; 
});
