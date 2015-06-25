define(['knockout'], function(ko){
    var consoleType = function(options){
        this.IsLoading = ko.observable(false);
        this.CommandText = ko.observable('help');
        this.CommandOutput = ko.observable('Nothing');
    };

    function parseCommand(commandText){
        var url = 'http://127.0.0.1:8080/';
        url = url.concat(commandText.replace(' ','/'));
        return url;
    }

    consoleType.prototype.RunCommand = function(){
        var self = this;
        console.log('IsLoading: ' + self.IsLoading());
        self.IsLoading(true);
        $.ajax({
            async: true,
            method: 'GET',
            url: parseCommand(self.CommandText()),
            dataType: 'json'
        }).done(function(data){
            self.IsLoading(false);
            console.log(data);
            self.CommandOutput(data);                
        });
    };
    return consoleType; 
});
