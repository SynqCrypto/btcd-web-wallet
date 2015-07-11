define(['knockout','common/confirmation-dialog'], function(ko,ConfirmationDialog) {
    var alertDialogType = function(options){
        this.h
        this.title = options.title || "Notification";
        this.affirmativeHandler = options.affirmativeHandler;
        
        this.contentTemplate = options.contentTemplate || "modals/confirmation-message";
        this.message = options.message || "";
        this.affirmativeButtonText = options.affirmativeButtonText || "OK";
        this.negativeButtonText = options.negativeButtonText || "Cancel";

        options.title = options.title || "Alert";
        options.template = options.template || "modals/alert-dialog";
        
        ConfirmationDialog.call(this,alertOptions);
       
        // call ConfirmationDialog( { 
        //  
        // })
    };

    alertDialogType.prototype = new ConfirmationDialog();

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
