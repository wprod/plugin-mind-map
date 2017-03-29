(function ($) {

    $.fn.extend(jQuery.fn, {

        mindMap: function (options) {
            //DEFAULT PARAMS
            var defauts = {
                "mapObject": $(this),
                "mindSize": "200px",
                "mapSize": $(this).width(),
            };

            //PARAMS FUSION
            var parametres = $.extend(defauts, options);
            parametres.mapObject.html('<div id="board" width="' + parametres.mapSize + '"></div>');

            //SETUP
            $('#board').keyup(function (event) {
                if (event.keyCode == '10') {
                    event.preventDefault();
                }
            });
            var insert_mindMaster = function (txt) {
                    $("#board").append('<div id="mind-master">' + txt + '</div>');
                },
                insert_node = function (node, txt) {
                    $(node).append('<div class="mind-node" style="width:' + parametres.mindSize + '">' + txt + '</div>');
                };

            insert_mindMaster("Rush Epitech A.Witters");
            insert_node($("#mind-master"), "MindMap");

            //EVENT LISTENERS
            var form = '<form id="dataForm"><input id="data"><button id="add">Add</button></form>';

            $(".mind-node").dblclick(function (event) {
                $(event.target).append(form);
                $("#add").click(function (e) {
                    e.preventDefault();
                    if ($("#data").val()) {
                        insert_node($(this).parent().parent(), $("#data").val());
                    }
                    $("#dataForm").remove();
                });
            });
            $(function () {
                $(".mind-node").mousedown(function (event) {
                    $(event.target).draggable();
                });
            });
        },
    });

})(jQuery);