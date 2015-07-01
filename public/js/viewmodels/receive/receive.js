define(['knockout','viewmodels/receive/receive-address','viewmodels/common/command','viewmodels/receive/new-address-dialog'], function(ko,ReceiveAddress,Command,NewAddressDialog){
    var receiveType = function(options){
        var self = this;
        self.addresses = ko.observableArray([]);
        self.isLoadingReceiveAddresses = ko.observable(false);
        self.wallet = options.parent;
        self.isLoading = ko.computed(function(){
            var trans = self.isLoadingReceiveAddresses();
            return trans;
        });
        self.newAddressDialog = new NewAddressDialog({parent:self});
        self.showNewAddressDialog = ko.observable(false);
    };

    receiveType.prototype.load = function(){
       this.getReceiveAddresses();
    };

    receiveType.prototype.newAddress = function(){
        this.wallet.openDialog(this.newAddressDialog, 'modals/new-address');
    };

    receiveType.prototype.newAddressConfirm = function(dialogAddress,label){
        var self = this, getNewAddressCommand = new Command('getnewaddress',[label]);
        getNewAddressCommand.execute()
            .done(function(address){
                self.addresses.push(new ReceiveAddress({address:{ address: address, account: label }}));
            });

        this.wallet.closeDialog();
    };

    receiveType.prototype.newAddressCancel = function(){
        this.wallet.closeDialog();        
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
