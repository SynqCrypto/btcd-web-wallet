define(['knockout','viewmodels/history/transaction','viewmodels/common/command'], function(ko,Transaction,Command){
    var historyType = function(options){
        var self = this;
        self.transactions = ko.observableArray([]);
        self.isLoadingTransactions = ko.observable(false);

        self.isLoading = ko.computed(function(){
            var trans = self.isLoadingTransactions();
            return trans;
        });
    };

    historyType.prototype.load = function(){
       this.getTransactions();
    };

    historyType.prototype.getTransactions = function(){
        var self = this, getTransactionsCommand = new Command('listtransactions',[]);
        self.isLoadingTransactions(true);
        var historyPromise = getTransactionsCommand.execute()
            .done(function(data){
                self.transactions(ko.utils.arrayMap(data,function(transaction){
                    return new Transaction({ transaction });
                }));
                self.isLoadingTransactions(false); 
            });
        console.log('historyPromise: ');
        console.log(historyPromise);
        return historyPromise;
    };
    return historyType; 
});
