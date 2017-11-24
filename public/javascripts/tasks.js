import {default as model} from "./model.js";

;(function($) {

    const taskManager = new model.TaskManager();

    function showTasks() {
        $("#containerTasks").html(TasksTemplateProcessor({ tasks: taskManager.tasks }));
    }

    function updateUI() {
        showTasks();
    }


    $(function () {
        TasksTemplateProcessor =  Handlebars.compile($("#tasks-list-template").html());
        $(document).on("click", "input[send]", send());
        $("#createTask").click(
            function () {
                Taskmanager.addTask($("#name").val());
                showTasks();
            });
    updateUI();
    });

})(jQuery);
