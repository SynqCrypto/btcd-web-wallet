define(['knockout'], function(ko){
    var consoleType = function(options){
        this.isLoading = ko.observable(false);
        this.commandText = ko.observable('help');
        this.commandOutput = ko.observable('');
    };

    function parseCommand(commandText){
        var url = 'http://127.0.0.1:8080/';
        url = url.concat(commandText.replace(' ','/'));
        return url;
    }

    consoleType.prototype.runCommand = function(){
        var self = this;
        self.isLoading(true);
        $.ajax({
            async: true,
            method: 'GET',
            url: parseCommand(self.commandText()),
            dataType: 'json'
        }).done(function(data){
            self.isLoading(false);
            console.log(data);
            self.commandOutput(data);                
        });
    };
    return consoleType; 
});
