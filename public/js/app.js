define( [ "knockout",  "viewmodels/btcd-wallet", "knockout-amd-helpers", "text", "bindinghandlers/modal" ], function( ko, Wallet) {
    var App = function(){

    };
    ko.amdTemplateEngine.defaultPath = "../views";
    ko.amdTemplateEngine.defaultSuffix = ".html";
    ko.amdTemplateEngine.defaultRequireTextPluginName = "text";
    ko.bindingHandlers.module.baseDir = "viewmodels"; 

    App.prototype.init = function() {
        console.log(Wallet);
        var wallet = new Wallet({btcdAvailable: 750.00, btcdTotal: 1000.00, btcdStaking: 250.00}); 
        ko.applyBindings(wallet, $('#wallet-container')[0]);


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

        }).run('#console');
    };
    return new App();
});
