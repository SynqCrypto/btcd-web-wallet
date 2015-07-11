define( [ "knockout",  "viewmodels/btcd-wallet", "common/dialog", "knockout-amd-helpers", "text", "bindinghandlers/modal" ], function( ko, Wallet, dialog) {
    var App = function(){

    };
    ko.amdTemplateEngine.defaultPath = "../views";
    ko.amdTemplateEngine.defaultSuffix = ".html";
    ko.amdTemplateEngine.defaultRequireTextPluginName = "text";
    ko.bindingHandlers.module.baseDir = "viewmodels"; 

    App.prototype.init = function() {
        var wallet = new Wallet();  

        ko.applyBindings(wallet, $('#wallet-container')[0]);
        dialog.init($('#defaultModal')[0]);         

        Sammy(function() {
            this.get('#send', function() {
                wallet.currentView('send');                 
            });
 
            this.get('#receive', function() {
                wallet.currentView('receive');                 
            });
        
            this.get('#history', function() {
                wallet.currentView('history');                 
            });

            this.get('#console', function() {
                wallet.currentView('console');                 
            });

        }).run('#send');
    };
    return new App();
});
