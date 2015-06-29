define(['knockout','viewmodels/wallet-status'/*,'viewmodels/send/send'*/,'viewmodels/receive/receive','viewmodels/history/history','viewmodels/console/console', 'bindinghandlers/modal'], 
function(ko/*,Send,Receive*/,WalletStatus,Receive,History,Console){

    var walletType = function(options){
        var self = this;
        self.showDialog = ko.observable(false);
        self.btcdTotal = ko.observable(0);
        self.btcdAvailable = ko.observable(0);
        self.btcdStaking = ko.observable(0);
        self.currentView = ko.observable('send');
	/*this.Send = new Send(); */
        self.history = new History(); 
        self.console = new Console(); 
        self.receive = new Receive();
        self.walletStatus = new WalletStatus();
        self.encrypt = function(){
            self.showDialog(!this.showDialog());
        };

        self.refresh = function(){
            self.history.load();
            self.receive.load();
            self.walletStatus.load();
        };

    };

    return walletType; 
});
