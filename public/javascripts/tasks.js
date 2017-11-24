import {default as model} from "./model.js";

;(function($) {

    const taskManager = new model.TaskManager();

    function showTasks() {
        $("#containerTasks").html(TasksTemplateProcessor({ tasks: taskManager.tasks }));
    }

    function updateUI() {
        showTasks();
    }

    function getTasks() {
        let url = 'http://localhost:3003/tasks';
        return fetch(url).then(tasks => tasks.json());
    }


    function getTasks(id) {
        let url = "`http://localhost:3003/tasks/${id}\`";
        return fetch(url).then(tasks => tasks.json());
    }


    function deleteTask(id) {
        let url = "`http://localhost:3003/tasks/${id}\`";
        return fetch(url + '/' + id, {
            method: 'delete'
        })
            .then(tasks => tasks.json());
    }


    $(function () {
        TasksTemplateProcessor =  Handlebars.compile($("#tasks-list-template").html());
        $(document).on("click", "input[send]", ());
        $("#createTask").click(
            function () {
                Taskmanager.addTask($("#name").val());
                showTasks();
            });
    updateUI();
    });

})(jQuery);
