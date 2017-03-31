(function ($) {

    $.fn.extend(jQuery.fn, {

        mindMap: function (options) {
            //DEFAULT PARAMS
            var defauts = {
                "mapObject": $(this),
                "mindSize": "200px",
                "mapWidth": $(this).width() + "px",
                "mapHeight": $(this).height() + "px",
            };

            //PARAMS FUSION
            var parametres = $.extend(defauts, options);
            parametres.mapObject.html('<div id="board" style="width:' + parametres.mapWidth + '; height:' + parametres.mapHeight + ';"   ></div>');

            //SETUP
            $('#board').keyup(function (event) {
                if (event.keyCode == '10') {
                    event.preventDefault();
                }
            });

            var totNodes = 0,
                insert_mindMaster = function (txt) {
                    $("#board").append('<div id="mind-master" class="mind-node"><h3>' + txt + '</h3></div>');
                },
                insert_node = function (node, txt) {
                    totNodes++;
                    $(node).append('<div id="mindMapId_' + totNodes + '" class="mind-node ui-draggable ui-draggable-handle" style="width:' + parametres.mindSize + '"><span>' + txt + '</span></div>');
                    $(node).append('<svg><line id="' + totNodes + '" from="' + $(node).attr("id") + '" to="mindMapId_' + totNodes + '"/></svg>');
                },
                modifNode = function() {

                },
                drawAll = function () {
                    totNodes = $("svg").length;
                    for (i = 1; i <= totNodes; i++) {
                        $("#" + i + "")
                            .attr('x1', $("#" + $("#" + i + "").attr("to")).position().left)
                            .attr('y1', $("#" + $("#" + i + "").attr("to")).position().top)
                            .attr('x2', 0)
                            .attr('y2', 0);
                    }
                };

            insert_mindMaster("Rush Epitech A.Witters");
            insert_node($("#mind-master"), "Rush MVC");
            insert_node($("#mindMapId_1"), "Classes");
            insert_node($("#mindMapId_2"), "Products");
            insert_node($("#mindMapId_2"), "Connection");
            insert_node($("#mindMapId_2"), "Kart");
            insert_node($("#mindMapId_4"), "Logs");
            insert_node($("#mindMapId_4"), "https://i.giphy.com/3oEjHFOscgNwdSRRDy.gif");
            insert_node($("#mindMapId_4"), "https://media.giphy.com/media/SgwPtMD47PV04/giphy.gif");

            //EVENT LISTENERS
            var form = '<form id="dataForm" class="add"><input id="data"><button id="add">Add</button></form>';
            var formMod = '<form id="dataForm" class="mod"><input id="data"><button id="add">Change</button></form>';

            $(".mind-node").dblclick(function (event) {
                $("#dataForm").remove(); //Delete if exists somewere else.
                $(event.target).append(form);
                $("#dataForm").hide().slideDown("fast"); //Animations
                $("#data").focus();
                $("#add").click(function (e) {
                    e.preventDefault();
                    if ($("#data").val()) {
                        insert_node($(this).parent().parent(), $("#data").val());
                    }
                    $("#dataForm").remove();
                    drawAll();
                });
            });
            
            $(".mind-node").first().click(function(event){
                $("#dataForm").remove(); //Delete if exists somewere else.
                $(event.target).append(formMod);
                $("#dataForm").hide().slideDown("fast"); //Animations
                $("#data").focus();
                $("#add").click(function (e) {
                    e.preventDefault();
                    var regImg = /[^]+(jpg|gif|png)/;
                    if (regImg.test($("#data").val()))
                    {
                        $(event.target).first().html('<span><img src="'+$("#data").val()+'"/></span>');
                    }
                    else if ($("#data").val()) 
                    {
                        $(event.target).first().html("<span>"+$("#data").val()+"</span>");
                    }
                    $("#dataForm").remove();
                });
            });

            $(".mind-node").mousedown(function (event) {
                $(".mind-node").draggable({
                    drag: function () {
                        drawAll();
                    },
                    containment: "#board",
                    scroll: false
                });
            });

            $("*").mousedown();
            drawAll();
        },
    });

})(jQuery);