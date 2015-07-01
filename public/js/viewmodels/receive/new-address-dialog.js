define(['knockout'],function(ko){
    var newAddressDialogType = function(options){
        this.parent = options.parent;
        this.addressLabel = ko.observable('');
        this.address = ko.observable('');
    };

    newAddressDialogType.prototype.newAddressConfirm = function(){
       this.reset();
       this.parent.newAddressConfirm(this.address(), this.addressLabel()); 
    };

    newAddressDialogType.prototype.newAddressCancel = function(){
       this.reset();
       this.parent.newAddressCancel();
    };

    newAddressDialogType.prototype.reset = function(){
        this.addressLabel('');
        this.address('');
    };

    return newAddressDialogType;
});
