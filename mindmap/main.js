(function ($) {

    $.fn.extend(jQuery.fn, {

        mindMap: function (options) {
            //Défault param
            var defauts = {
                "mapObject": $(this),
                "mindSize": "200px",
                "mapSize": $(this).width(),
            };
            //Fusion des params
            var parametres = $.extend(defauts, options);

            parametres.mapObject.html('<div id="board" width="' + parametres.mapSize + '"></div>');

            var insert_mindMaster = function(txt){
                $("#board").append('<div id="mind-master">'+txt+'</div>');
            };
            insert_mindMaster("Master");
        },
    });

})(jQuery);