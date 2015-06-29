define(['knockout'/*,'viewmodels/send/send'*/,'viewmodels/receive/receive','viewmodels/history/history','viewmodels/console/console', 'bindinghandlers/modal'], 
function(ko/*,Send,Receive*/,Receive,History,Console){

    var walletType = function(options){
        var self = this;
        self.showDialog = ko.observable(false);
        self.btcdTotal = ko.observable(options.btcdTotal || 0);
        self.btcdAvailable = ko.observable(options.btcdAvailable || 0);
        self.btcdStaking = ko.observable(options.btcdStaking || 0);
        self.currentView = ko.observable('send');
	/*this.Send = new Send(); */
        self.history = new History(); 
        self.console = new Console(); 
        self.receive = new Receive();
        self.encrypt = function(){
            self.showDialog(!this.showDialog());
        };

        self.refresh = function(){
            self.history.load();
            self.receive.load();
            self.getBalances();

        };

        self.getBalances = function(){

        };
    };

    return walletType; 
});
