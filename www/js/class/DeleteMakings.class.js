'use strict';

// Constructeur
var DeleteMakings = function()
{
    this.deleteButtons = document.querySelectorAll(".deleteMaking");
    this.xhr = new Xhr; // Composition avec appel à la classe Xhr (Xhr.class.js)
    this.idToDelete = null;
};

//Méthodes

DeleteMakings.prototype.onClickGetDeleteMakingId = function() {
    // Redefinition de  this.deleteButtons en Array (Nodelist de base) (pour compatibilité avec IE)
    this.deleteButtons = Array.from(this.deleteButtons);
    // Installation d'un event Listener sur chaque bouton supprimé
    for(var i = 0; i < this.deleteButtons.length; i++)
    {
        // Evenement au clic qui renvoi l'id de la ligne à supprimer à sendData (AJAJ)
        addEventListener("click", deleteLine.bind(this));
    }

    function deleteLine(event)
    {
        // Stockage de l'id
        this.idToDelete = event.target.dataset.id;
        // Appel à la fonction sendData avec le callback en argument
        this.sendData(this.onDeleteMakingPhpGetAnswer);
        console.log(this.idToDelete);
        console.log(this);
    }

};

DeleteMakings.prototype.sendData = function()
{
    // Appel à xhr (via le constructeur)
    var xhr = this.xhr.getXMLHttpRequest();
    //  Creation d'un object FormData qui contiendra les données du formulaires
    var data = new FormData();
    // Stockage de l'id de la ligne correspondante à supprimer -> passage en Json
    data.append("Id", JSON.stringify(this.idToDelete));
    // Appel de la méthode open(), en POST vers la page php de reception, async en true
    xhr.open("POST", "../src/deleteMaking.php", true);
    // Envoi de l'object data avec la méthode send
    xhr.send(data);

};

DeleteMakings.prototype.onDeleteMakingPhpGetAnswer = function(answer)
{
    // A renseigner !!!! ------------------------------------------- >
    alert(answer);
};