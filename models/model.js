// [geh]: import {default as taskStorage} from "./data.js"; wird hier nicht direkt benötigt => das dataSink wird ja dem TaskManager-Constructor übergeben.

class Task {
    constructor(name = "", description = "", date) {
        this.name = name;
        this.description = description;
        this.date = date;
        //this.priority = priority;
    }
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,
        };
    }
    static fromJSON(id, obj) {
        return new Task(id, obj.name, obj.description, obj.date);
    }
}

class TaskManager {
    constructor(dataSink) {
        this._dataSink = dataSink;
        // [geh]: let taskFromStorage = taskStorage.getAll(); => wiring der daten aus dem localStorage noch falsch:
        this._tasks = dataSink.getAll().map(t => Task.fromJSON(t.id, t));
    }

    add(newTask) {
        this._tasks.push(newTask);
        this._dataSink.persist(this._tasks);
    }

    // [geh]: wird vom Controller verlangt, aber noch nicht angelegt.
    get tasks() { return this._tasks; }

    findByName(name) {
        return this._tasks.findByName(name);
    }

    save() {
        this._dataSink.persist(this._tasks.map(t => t.toJSON()));
    }
}

/** [geh]: Vorsicht: das Model darf keine direkte Abhängigkeit zum Controller enthalten! (siehe tasks.js/edit.js)
class Controller {
    constructor() {
        this.taskManager = new TaskManager(new TaskManager());
    }
    bootstrap() {
        $("#btnSend").on("click", () => this.send());
    }

    send() {
        let newTask = new Task(
            document.getElementById("name").value,
            document.getElementById("description").value,
            document.getElementById("date").value);
        //document.getElementById("date").value;
        this.taskManager.add(newTask);
    }
}


;(function ($) {

    const uiController = new Controller();
    $(function () {
        uiController.bootstrap();
    });

})(jQuery);

*/
export default { /*[geh]: je nachdem, wie du die Tasks kreierst, musst du Task hier auch exportieren*/ Task, TaskManager /* [geh]: Controller gehört hier nicht hin */ };
