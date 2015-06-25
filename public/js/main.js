require.config({
    paths: {
        knockout: "knockout-3.3.0.debug",
        'knockout-amd-helpers': 'knockout-amd-helpers',
        text: "text"
    }
});
 
require( [ "app" ], function( App ) {
    App.init();
})
