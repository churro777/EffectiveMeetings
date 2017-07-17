function getAgendaItems(id) {
    console.log("getting agenda items")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //console.log(this)
        if (this.readyState == 4 && this.status == 200) {
            displayAgenda(JSON.parse(this.responseText))
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("problem getting note #" + sessionStorage.id)
        }
    };

    var query = "getAgendaItems?id=" + sessionStorage.id

    xhttp.open("GET", query, true)
    xhttp.send()
}

function addAgendaItem() {
    console.log("adding agendaItem")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            console.log(this.response)
            getAgendaItems()
        } else if (this.readyState == 4 && this.status != 201) {
            console.log("problem adding agenda item")
        }
    };

    var agendaItem = document.getElementById('newAgendaItem').value
    var query = "addAgendaItem?id=" + sessionStorage.id + "&item=" + agendaItem

    xhttp.open("GET", query, true)
    xhttp.send()
}


