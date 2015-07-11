define(['knockout','common/dialog','viewmodels/wallet-status','viewmodels/send/send','viewmodels/receive/receive','viewmodels/history/history','viewmodels/console/console', 'bindinghandlers/modal'], 
function(ko, dialog, WalletStatus, Send, Receive, History, Console, Modal){

    var walletType = function(options){
        var self = this;
        self.btcdTotal = ko.observable(0);
        self.btcdAvailable = ko.observable(0);
        self.btcdStaking = ko.observable(0);
        self.currentView = ko.observable('send');
        self.send = new Send({parent: self}); 
        self.history = new History({parent: self}); 
        self.console = new Console({parent: self}); 
        self.receive = new Receive({parent: self});
        self.walletStatus = new WalletStatus({parent: self});
        self.encrypt = function(){
            dialog.openDialog({ text:ko.observable('Test')}, 'modals/placeholder');
        };

    };

    walletType.prototype.refresh = function(){
        this.walletStatus.load();
        this.history.load();
        this.receive.load();
    };

    return walletType; 
});
