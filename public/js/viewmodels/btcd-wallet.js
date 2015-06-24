define(['ko','viewmodels/send/send'], 
/*'viewmodels/send/send','viewmodels/receive/receive','viewmodels/history/history','viewmodels/console/console'],*/ 
function(ko,send){

    var walletType = function(options){
        this.BtcdTotal = ko.observable(options.btcdTotal || 0);
        this.BtcdAvailable = ko.observable(options.btcdAvailable || 0);
        this.BtcdStaking = ko.observable(options.btcdStaking || 0);
	this.TestProperty = ko.observable("Hello world");
        this.CurrentView = ko.observable('Send');
    };

    return walletType; 
});
