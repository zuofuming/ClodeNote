$( function() {
    $( "#user_set" ).enhanceWithin().popup();

    if(!localStorage.user_id){
        localStorage.user_id = "";
    }
    if(!localStorage.user_name){
        localStorage.user_name = "";
    }

    if(!localStorage.user_password){
        localStorage.user_password = "";
    }
});

