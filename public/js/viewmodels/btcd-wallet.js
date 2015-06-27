define(['knockout'/*,'viewmodels/send/send','viewmodels/receive/receive','viewmodels/history/history'*/,'viewmodels/console/console', 'bindinghandlers/modal'], 
function(ko/*,Send,Receive,History*/,Console){

    var walletType = function(options){
        this.ShowDialog = ko.observable(false);
        this.BtcdTotal = ko.observable(options.btcdTotal || 0);
        this.BtcdAvailable = ko.observable(options.btcdAvailable || 0);
        this.BtcdStaking = ko.observable(options.btcdStaking || 0);
        this.TestProperty = ko.observable("Hello world");
        this.CurrentView = ko.observable('send');
	/*this.Send = new Send();
        this.Receive = new Receive();
        this.History = new History(); */
        this.Console = new Console(); 
        console.log(this.Console);
        this.TestProperty(this.Console.CommandText());
        console.log(this.Console.CommandText());

        this.encrypt = function(){
            console.log('show dialog!: ' + this.ShowDialog());
            this.ShowDialog(!this.ShowDialog());
        };
    };

    return walletType; 
});
