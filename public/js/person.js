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
            sessionStorage.username = u;
            setup()
        } else if (this.readyState == 4 && this.status == 404) {
            alert('Incorrect username or password');
        }
    };
    var query = "login?username=" + u + "&password=" + p;
    xhttp.open("GET", query, true);
    xhttp.send();
}

function hideLogin() {
    document.getElementById('loginRow').style.display = 'none';
}