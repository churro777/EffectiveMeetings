function setup() {
    console.log("inside setup()");
    if (sessionStorage.username != null) {
        document.getElementById('username').value = sessionStorage.username;
        hideLogin();
        getNotes();
        getAgendaItems();
        document.onload = function() {
            document.getElementById(contentText).innerText = note.content
        }
        
    }
}





