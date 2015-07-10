define(['knockout','common/confirmation-dialog'], function(ko,ConfirmationDialog) {
    var alertDialogType = function(options){
        this.wallet = options.wallet || options.context.parent || { openDialog: function() { alert('No dialog container'); }, closeDialog: function() { } };
        this.context = options.context || this;
        this.title = options.title || "Notification";
        this.affirmativeHandler = options.affirmativeHandler;
        this.negativeHandler = options.negativeHandler;
        
        this.contentTemplate = options.contentTemplate || "modals/confirmation-message";
        this.message = options.message || "";
        this.affirmativeButtonText = options.affirmativeButtonText || "OK";
        this.negativeButtonText = options.negativeButtonText || "Cancel";

        options.title = options.title || "Alert";
        options.template = options.template || "modals/alert-dialog";

        // call ConfirmationDialog( { 
        //  
        // })
    };

    confirmationDialogType.prototype.open = function(){
        this.wallet.openDialog(this,"modals/confirmation-dialog");
    };

    confirmationDialogType.prototype.close = function(){
        this.wallet.closeDialog();
    };

    confirmationDialogType.prototype.affirmative = function() {
        this.affirmativeHandler.call(this.context);
        this.wallet.closeDialog();
    };

    confirmationDialogType.prototype.negative = function(){
        this.negativeHandler.call(this.context);
        this.wallet.closeDialog();
    };

    return confirmationDialogType;
});
