function setup() {
    console.log("inside setup()");
    if (sessionStorage.username != null) {
        document.getElementById('username').value = sessionStorage.username;
        hideLogin();
        getNotes();
        document.getElementById(contentText).innerText = note.content
    }


}



function hideLogin() {
    document.getElementById('loginRow').style.display = 'none';
}


function createAccount() {

    var p = document.getElementById('password').value;
    var u = document.getElementById('username').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //        201 - row was inserted on the database
        if (this.readyState == 4 && this.status == 201) {
            console.log(this.responseText);
            hideLogin()
            sessionStorage.username = u;
        } else if (this.readyState == 4 && this.status == 400) {
            alert('Username already taken');
        }
    };
    var query = "createUser?username=" + u + "&password=" + p;
    xhttp.open("GET", query, true);
    xhttp.send();
}

function login() {

    var p = document.getElementById('password').value;
    var u = document.getElementById('username').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 203) {
            console.log(this.responseText);
            hideLogin()
            sessionStorage.username = u;
        } else if (this.readyState == 4 && this.status == 404) {
            alert('Incorrect username or password');
        }
    };
    var query = "login?username=" + u + "&password=" + p;
    xhttp.open("GET", query, true);
    xhttp.send();
}


function newNote() {
    console.log("creating new note")

    var u = sessionStorage.username;

    var title = prompt("Note Title");
    if (title == null || title == "") {
        alert("New note cancelled")
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                console.log(this.responseText);
                sessionStorage.title = title;
            } else if (this.readyState == 4 && this.status == 404) {
                alert('Unable to create note');
            }
        };

        var query = "createNote?username=" + u + "&title=" + title +
            "&content="; //left empty cuz update will handle this
        xhttp.open("GET", query, true);
        xhttp.send();
    }
}


function updateNote() {
    console.log("update note")
}



function getNotes() {
    console.log("getNotes");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayNotes(JSON.parse(this.responseText))
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("problem getting notes for " + sessionStorage.username)
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
        console.log("update note")
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                console.log(this)
            } else if (this.readyState == 4 && this.status != 200) {
                console.log("problem getting notes for " + sessionStorage.username)
            }
        };

        var content = document.getElementById('contentText').value
        var query = "updateNote?username=" + sessionStorage.username + "&title=" + sessionStorage.title + "&content=" + content;
        console.log(query)
        xhttp.open("GET", query, true);
        xhttp.send();
    }


}


function displayNotes(notes) {
    console.log("display notes")
    console.log(notes)

    var holdNotes = document.getElementById("holdNotes")

    for (i = 0; i < notes.length; i++) {
        var row = document.createElement("div")
        row.className = "row"

        var note = document.createElement("a")
        note.className = "col-xs-12 noteLink"
        note.innerText = notes[i].title
        note.id = notes[i].id
        note.href = "#"
        note.onclick = function () {
            displayContent(this.id)
        };

        row.appendChild(note)

        holdNotes.appendChild(row)
    }

    displayContent(notes[0].id)

}

function displayContent(id) {
    console.log("displaying content for id-" + id + " " + sessionStorage.title)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var note = JSON.parse(this.responseText)[0]
            console.log(note)
            sessionStorage.id = note.id
            sessionStorage.title = note.title
            sessionStorage.content = note.content
            document.getElementById(contentText).innerText = note.content
                //displayAgenda(note.id)
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("problem getting note #" + id)
        }
    };

    var query = "getSingleNote?id=" + id
    xhttp.open("GET", query, true)
    xhttp.send()
}


function displayAgenda(id) {
    console.log("displaying agenda")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var note = JSON.parse(this.responseText)[0]
                //            console.log(note)
            sessionStorage.id = note.id
            document.getElementById.contentText = note.content
            displayAgenda(note.id)
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("problem getting note #" + id)
        }
    };

    var query = "getSingleNote?id=" + id
    xhttp.open("GET", query, true)
    xhttp.send()
}