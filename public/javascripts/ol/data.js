let storage = readFromLocalStorage();
writeToLocalStorage(storage);

function getAll() {
    return storage;
}

function persist(toPersist) {
    storage = toPersist;
    writeToLocalStorage(storage);
}

function readFromLocalStorage(toPersist) {
    return JSON.parse(localStorage.getItem("taskStorage") || "[ ]");
}

function writeToLocalStorage(toPersist) {
   localStorage.setItem("taskStorage", JSON.stringify(toPersist));
}


// class TaskDataSinkServer {
//     constructor() {
//         // Server usage
//     }
//     persist(tasks) {
//         // fetch() AJAX all => Promise
//     }
// }


export default {getAll, persist };