function newNote() {
    var u = sessionStorage.username;

    var title = prompt("Note Title");
    if (title == null || title == "") {
        alert("New note cancelled")
    } else {
        console.log("creating new note - " + title)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                console.log("newNote() - " + this.responseText);
                sessionStorage.title = title;
                getNotes()
            } else if (this.readyState == 4 && this.status == 404) {
                alert('newNote() - Unable to create note');
            }
        };

        var query = "createNote?username=" + u + "&title=" + title +
            "&content="; //left empty cuz update will handle this
        xhttp.open("GET", query, true);
        xhttp.send();
    }
}


function getNotes() {
    console.log("getNotes");
    clearNotes()
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("getNotes() - " + this.responseText);

            var notesData = JSON.parse(this.responseText)
            //getAgendaItems()
            displayNotes(notesData)

        } else if (this.readyState == 4 && this.status != 200) {
            console.log("getNotes() - problem getting notes for " + sessionStorage.username)
        }
    };

    var query = "getNotes?username=" + sessionStorage.username
    xhttp.open("GET", query, true);
    xhttp.send();
}


var count = 0

function updateNote() {
    count++
    if (count % 10 == 0) {
        count = 0
        console.log("update note")
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                console.log("updateNote() - " + this.responseText);
            } else if (this.readyState == 4 && this.status != 200) {
                console.log("updateNote() - problem getting notes for " + sessionStorage.username)
            }
        };

        var content = document.getElementById('contentText').value
        var query = "updateNote?username=" + sessionStorage.username + "&title=" + sessionStorage.title + "&content=" + content;
        
        xhttp.open("GET", query, true);
        xhttp.send();
    }


}


