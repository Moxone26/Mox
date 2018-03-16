'use strict';

// Constructeur
var DeleteMakings = function()
{
    this.deleteButtons = document.querySelectorAll(".deleteMaking");
    this.xhr = new Xhr; // Composition avec appel à la classe Xhr (Xhr.class.js)
    this.idToDelete = null;
};

//Méthodes

DeleteMakings.prototype.onClickDeleteMaking = function() {
    // Redefinition de  this.deleteButtons en Array (Nodelist de base) (pour compatibilité avec IE)
    this.deleteButtons = Array.from(this.deleteButtons);
    // Installation d'un event Listener sur chaque bouton supprimé
    for(var i = 0; i < this.deleteButtons.length; i++)
    {
        // Evenement au clic qui renvoi l'id de la ligne à supprimer à sendData (AJAJ)
        this.deleteButtons[i].addEventListener("click", deleteLine.bind(this));
    }

    function deleteLine(event)
    {
        // Stockage de l'id
        this.idToDelete = event.target.dataset.id;
        // Appel à la fonction sendData avec le callback en argument
        this.sendData(this.onDeleteMakingPhpGetAnswer);
    }

};

DeleteMakings.prototype.sendData = function(callback)
{
    // Appel à xhr (via le constructeur)
    var xhr = this.xhr.getXMLHttpRequest();
    //  Creation d'un object FormData qui contiendra les données du formulaires
    var data = new FormData();
    // Stockage de l'id de la ligne correspondante à supprimer -> passage en Json
    data.append("Id", this.idToDelete);
    // Appel de la méthode open(), en POST vers la page php de reception, async en true
    xhr.open("POST", "../src/deleteMaking.php", true);
    // Envoi de l'object data avec la méthode send
    xhr.send(data);

    // Au changement d'état de l'envoi selon conditions on appel le callback (onAddMakingPhpGetAnswer)
    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
        }
    }
};

DeleteMakings.prototype.onDeleteMakingPhpGetAnswer = function(answer)
{
    document.getElementById("alert").innerHTML =  "<td colspan='9'> Projet avec l'Id " + answer + " supprimé</td>";
    var lineToDelete = document.querySelector('[data-rawId="' + answer +  '"]');
    lineToDelete.parentNode.removeChild(lineToDelete);
};