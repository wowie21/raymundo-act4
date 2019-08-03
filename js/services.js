var RANDOM_SERVICE = {
    get : function(){
        return $.ajax({
            url : RANDOM_API
        });
    },
}