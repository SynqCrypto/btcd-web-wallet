define(['knockout','viewmodels/common/command'],function(ko,Command){
    var walletStatusType = function(){
        var self = this;
        self.total = ko.observable(0);
        self.stake = ko.observable(0);
        self.isLoadingStatus = ko.observable(false);
        self.blocks = ko.observable(0);
        self.totalBlocks = ko.observable(0);
        self.isStaking = ko.observable(false);
        this.available = ko.pureComputed(function(){
            var total = self.total(), stake = self.stake();
            return total - stake;
        }).extend({ rateLimit: 500 });
    };

    walletStatusType.prototype.load = function(){
        var self = this, 
            getInfoCommand = new Command('getinfo',[]), 
            getBlockCountCommand = new Command('getblockcount',[]),
            getStakingInfoCommand = new Command('getstakinginfo',[]);
        self.isLoadingStatus(true);
        var statusPromise = $.when(getInfoCommand.execute(), getBlockCountCommand.execute(), getStakingInfoCommand.execute())
            .done(function(getInfoData, getBlockCountData, getStakingInfoData){
                console.log(getInfoData);
                console.log(getBlockCountData);
                console.log(getStakingInfoData);
                self.total(getInfoData.balance);
                self.blocks(getInfoData.blocks);
                self.stake(getInfoData.stake);
                self.totalBlocks(getBlockCountData);
                console.log("IsStaking: "  + getStakingInfoData.Staking);
                self.isStaking(getStakingInfoData.Staking);
                self.isLoadingStatus(false); 
            });
        //console.log('statusPromise:');
        //console.log(statusPromise);
        return statusPromise;
    };

    return walletStatusType;
});
