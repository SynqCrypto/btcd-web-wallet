define(['knockout'],function(ko){

    var commandType = function(commandName, args){
        this.commandName = ko.observable(commandName);
        this.args = ko.observableArray(args);
    };

    function parseCommand(commandText, args){
        var url = 'http://127.0.0.1:8080/';
        url = url.concat(commandText.concat('/'));
        if(args && args.length > 0){
            url = url.concat(args.join('/'));
        }
        return url;
    }

    commandType.prototype.execute = function(){
        var self = this;
        return $.ajax({
            async: true,
            method: 'GET',
            url: parseCommand(self.commandName(), self.args()),
            dataType: 'json'
        }).done(function(data){
            console.log(data);
        });
    };

    return commandType;
});
