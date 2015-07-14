define(['knockout','viewmodels/common/command'],function(ko,Command){
    var walletStatusType = function(){
        var self = this;
        self.total = ko.observable(0);
        self.stake = ko.observable(0);
        self.isLoadingStatus = ko.observable(false);
        this.available = ko.pureComputed(function(){
            var total = self.total(), stake = self.stake();
            return total - stake;
        }).extend({ rateLimit: 500 });
    };

    walletStatusType.prototype.load = function(){
        var self = this, getInfoCommand = new Command('getinfo',[]);
        self.isLoadingStatus(true);
        getInfoCommand.execute()
            .done(function(data){
                console.log(data);
                self.total(data.balance);
                self.stake(data.stake);
                self.isLoadingStatus(false); 
            })
            .fail(function(){
            })
            .always(function(){
            });
    };

    return walletStatusType;
});
