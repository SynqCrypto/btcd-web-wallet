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
        self.history = new History({parent: self}); 
        self.console = new Console({parent: self}); 
        self.receive = new Receive({parent: self});
        self.walletStatus = new WalletStatus({parent: self});
        self.encrypt = function(){
            self.openDialog({text:ko.observable('Test')}, 'modals/placeholder');
        };
        self.modalView = ko.observable('modals/placeholder');
        self.modalViewModel = ko.observable({text: ko.observable('Test')});

    };

    walletType.prototype.refresh = function(){
        this.walletStatus.load();
        this.history.load();
        this.receive.load();
    };

    walletType.prototype.openDialog = function(viewmodel, view, overridefooter){
        this.showDialog(false);
        console.log('changing view: ' + view);
        this.modalView(view);
        this.modalViewModel(viewmodel);
        console.log('showing dialog...');
        this.showDialog(true);
    };
    
    walletType.prototype.closeDialog = function(){
        this.showDialog(false);
    };

    return walletType; 
});
