function displayAgenda(agendaItems) {
    cleanupAgenda()

    console.log("displaying agenda items")
    console.log("agendaItems.length - " + agendaItems.length)

    var list = document.getElementById('agendaItemsList')

    for (i = 0; i < agendaItems.length; i++) {
        var li = document.createElement('li')
        li.className = "agendaItem"
        li.innerText = agendaItems[i].item

        list.appendChild(li)
    }
}

function cleanupAgenda() {
    console.log()
    console.log("cleaning up agenda items")
    var list = document.getElementById('agendaItemsList')

    var agendaItems = list.children
    console.log("agendaItems.length - " + agendaItems.length)
    
    console.log(agendaItems)

    for (i = 0; i < agendaItems.length; i++) {
        console.log("agendaItems[" + i + "] - " + agendaItems[i].innerText)
        list.removeChild(agendaItems[i])
    }
    console.log(".")
    console.log(".")
    console.log(".")
}

function displayNotes(notes) {
    console.log("display notes")

    var holdNotes = document.getElementById("holdNotes")

    for (i = 0; i < notes.length; i++) {
        var row = document.createElement("div")
        row.className = "row noteLinkRow"

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

function clearNotes() {
    console.log("clear notes")
    var holdNotes = document.getElementById("holdNotes")

    var notes = document.getElementsByClassName("noteLinkRow")

    for (i = 0; i < notes.length; i++) {
        if (notes[i] != undefined) {
            holdNotes.removeChild(notes[i])
        }
    }
}

function displayContent(id) {
    //console.log("displaying content for id-" + id + " " + sessionStorage.title)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var note = JSON.parse(this.responseText)[0]
            sessionStorage.id = note.id
            sessionStorage.title = note.title
            sessionStorage.content = note.content
            document.getElementById('contentText').value = note.content
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("problem getting note #" + id)
        }
    };

    var query = "getSingleNote?id=" + id
    xhttp.open("GET", query, true)
    xhttp.send()
}