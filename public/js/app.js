define( [ "ko", "viewmodels/btcd-wallet" ], function( ko, Wallet) {
    var App = function(){

    };
     
    App.prototype.init = function() {
        console.log(Wallet);
        var wallet = new Wallet({btcdAvailable: 750.00, btcdTotal: 1000.00, btcdStaking: 250.00}); 
        ko.applyBindings(wallet, $('#wallet-container')[0]);


        Sammy(function() {
            this.get('#send', function() {
                wallet.CurrentView('Send');                 
            });
 
            this.get('#receive', function() {
                wallet.CurrentView('Receive');                 
            });
        
            this.get('#history', function() {
                wallet.CurrentView('History');                 
            });

            this.get('#console', function() {
                wallet.CurrentView('Console');                 
            });

        }).run('#console');
    };
    return new App();
});
