require.config({
    paths: {
        ko: "knockout-3.3.0.debug",
        amplify: "amplify"
    },
    shim: {
        ko: {
            exports: "ko"
        },
        amplify: {
            exports: "amplify"
        }
    },
    baseUrl: "js"
});
 
require( [ "app" ], function( App ) {
    App.init();
})
