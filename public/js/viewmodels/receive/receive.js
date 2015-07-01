define(['knockout','viewmodels/receive/receive-address','viewmodels/common/command'], function(ko,ReceiveAddress,Command){
    var receiveType = function(options){
        var self = this;
        self.addresses = ko.observableArray([]);
        self.isLoadingReceiveAddresses = ko.observable(false);
        self.wallet = options.parent;
        self.isLoading = ko.computed(function(){
            var trans = self.isLoadingReceiveAddresses();
            return trans;
        });

        self.showNewAddressDialog = ko.observable(false);
    };

    receiveType.prototype.load = function(){
       this.getReceiveAddresses();
    };

    receiveType.prototype.newAddress = function(){
        this.wallet.openDialog({}, 'modals/new-address');
    };

    receiveType.prototype.newAddressCommit = function(){
    };

    receiveType.prototype.getReceiveAddresses = function(){
        var self = this, getReceivedByAddressesCommand = new Command('listreceivedbyaddress',['1','true']);
        self.isLoadingReceiveAddresses(true);
        getReceivedByAddressesCommand.execute()
            .done(function(data){
                self.addresses(ko.utils.arrayMap(data,function(address){
                    return new ReceiveAddress({ address});
                }));
                self.isLoadingReceiveAddresses(false); 
            })
            .error(function(){
            })
            .always(function(){
            });
    };
    return receiveType; 
});
