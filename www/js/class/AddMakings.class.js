'use strict';

// Constructeur

var AddMakings = function()
{
    this.addButton = document.querySelector("#addMaking-button"); // Bouton d'ajout de données (ouvre le formulaire)
    this.hideButton = document.querySelector("#addMaking-form-close"); // Bouton de fermeture (ferme le formulaire)
    this.addMakingBox = document.querySelector("#addMaking-box"); // Le wrapper du formulaire
    this.submitButton = document.querySelector("#addMaking-form-submit"); // Bouton de soumission du formulaire
    this.formName = document.querySelector("#Name"); // input du titred du site crée
    this.formCreated = document.querySelector("#Created"); // input de date de création du site crée
    this.formDescription = document.querySelector("#Description"); // input de description du site crée
    this.formLink = document.querySelector("#Link"); // input du lien du site crée
    this.formLanguages = document.querySelector("#Languages"); // input des langages utilisés
    this.formImage = document.querySelector("#Image"); // input de selection de l'image illustrant le site crée
    this.newMaking = {}; // object qui contiendra les données du formulaire
    this.error = { // object qui contiendra les erreurs des inputs
        "name": true,
        "created": true,
        "description" : true,
        "link": true,
        "languages": true,
        "image" : true
    };
    this.errorMessage = document.querySelector('#addMaking-error'); // div contenant le message d'erreur
    this.xhr = new Xhr; // Composition avec appel à la classe Xhr (Xhr.class.js)
};

// Methodes

AddMakings.prototype.onClickShowAddMakingBox = function()
{
    // Ajoute un evenement au click sur le bouton (AJOUTER) qui retire la class "hide" chargée de cacher le formulaire d'ajout de contenu
    this.addButton.addEventListener("click", function(){
        var addMakingBox;
        addMakingBox = document.querySelector("#addMaking-box");
        addMakingBox.classList.remove("hide");
        document.querySelector(".addMaking-form").reset();
    });
};

AddMakings.prototype.onClickHideMakingBox = function()
{
    // Ajoute un evenement au click sur le bouton (CROIX) qui ajoute la class "hide" chargée de cacher le formulaire d'ajout de contenu
    this.hideButton.addEventListener("click", function(){
        this.addMakingBox.classList.add("hide");
    }.bind(this));
};

AddMakings.prototype.onBlurCheckInput = function ()
{

    // Ajoute un evenement blur à chaque input du formulaire
    this.formName.addEventListener("blur", function()
    {
        if(this.formName.value.length === 0)
        {
            this.formName.classList.add("error"); // ajoute la classe error qui change le fond en rouge
            this.error.name = true; // ajoute true au code erreur de l'objet error.name
        }
        else
        {
            this.formName.classList.remove("error"); // retire la classe error et repasse le fond en blanc
            this.error.name = false; // ajoute false au code erreur de l'object error.name
        }
    }.bind(this));

    this.formCreated.addEventListener("blur", function()
    {
        if(this.formCreated.value.length === 0)
        {
            this.formCreated.classList.add("error");
            this.error.created = true;
        }
        else
        {
            this.formCreated.classList.remove("error");
            this.error.created = false;
        }
    }.bind(this));

    this.formDescription.addEventListener("blur", function()
    {
        if(this.formDescription.value.length === 0)
        {
            this.formDescription.classList.add("error");
            this.error.description = true;
        }
        else
        {
            this.formDescription.classList.remove("error");
            this.error.description = false;
        }
    }.bind(this));

    this.formLink.addEventListener("blur", function()
    {
        if(this.formLink.value.length === 0)
        {
            this.formLink.classList.add("error");
            this.error.link = true;
        }
        else
        {
            this.formLink.classList.remove("error");
            this.error.link = false;
        }
    }.bind(this));

    this.formLanguages.addEventListener("blur", function()
    {
        if(this.formLanguages.value.length === 0)
        {
            this.formLanguages.classList.add("error");
            this.error.languages = true;
        }
        else
        {
            this.formLanguages.classList.remove("error");
            this.error.languages = false;
        }
    }.bind(this));


    this.submitButton.addEventListener("click", function ()
    {
        // Creation d'un evenement au click sur le bouton submit pour verifier que tous les elements sont renseignés
        // Création  d'un tableau contenant les valeurs des inputs
        var checkArray = [
            this.formName,
            this.formCreated,
            this.formDescription,
            this.formLink,
            this.formLanguages
        ];

        // Boucle sur le tableau, si les inputs sont vides on color en rouge, sinon non.
        for(var i = 0; i < checkArray.length; i++)
        {
            if( checkArray[i].value.length == 0)
            {
                checkArray[i].classList.add("error");
            }
            else
            {
                checkArray[i].classList.remove("error");
            }
        }

        // Verification de la présence d'un fichier image dans le DOM .files
        if(this.formImage.files.length == 0)
        {
            this.formImage.classList.add("error");
            return this.error.image = true;
        }
        else
        {
            this.formImage.classList.remove("error");
            return this.error.image = false;
        }

    }.bind(this));


    // si tout les codes erreurs des inputs sont false alors la fonction renvoi false
    // et le formulaire est renseigné, sinon true (formulaire avec donnée(s) manquantes)
    if(this.error.name == false && this.error.created == false && this.error.description == false && this.error.link == false && this.error.languages == false && this.error.image == false)
    {
        //console.log(this.error);
        return false;
    }
    else
    {
        //console.log(this.error);
        return true;
    }
};

AddMakings.prototype.onClickSubmitAddMakingForm = function()
{
    // Ajout du evenement au click qui recupere le contenu des inputs et le stock dans l'object "newMaking"
    this.submitButton.addEventListener("click", function(event)
    {
        event.preventDefault();
        // Verifié si les inputs sont correctements renseignés
        var checkError = this.onBlurCheckInput();

        // Si les inputs sont corrects, création de l'object newMaking
        if(checkError == false){
            this.errorMessage.classList.add("hide");
            this.newMaking = {
                Name: this.formName.value,
                Created: this.formCreated.value,
                Description: this.formDescription.value,
                Link: this.formLink.value,
                Languages: this.formLanguages.value,
                Image: this.formImage.files[0].name
            };
            // Appel la fonction sendData qui envoi les données vers la page addMaking.php en AJAJ (callback en parametre)
            this.sendData(this.onAddMakingPhpGetAnswer);

            // Reinitialise le formulaire, les valeurs de "this.error" et  ferme la fenetre d'ajout
            this.resetAndCloseForm();
        }

        //Si erreur(s) dans les inputs affichage du message d'erreur
        else
        {
            this.errorMessage.classList.remove("hide");
        }

    }.bind(this));
};

AddMakings.prototype.sendData = function(callback){
    // fonction d'envoi des données en AJAJ
    // Appel de la classe Xhr, appel de la fonction getXMLHttpRequest dans var xhr
    var xhr = this.xhr.getXMLHttpRequest();
    //  Creation d'un object FormData qui contiendra les données du formulaires
    var data = new FormData();
    // Stockage des inputs du formulaire (hors image)
    data.append("form", JSON.stringify(this.newMaking));
    // Stockage de limage via le DOM Files
    data.append("image", this.formImage.files[0]);
    // Appel de la méthode open(), en POST vers la page php de reception, async en true
    xhr.open("POST", "../src/addMaking.php", true);
    // Envoi de l'object data avec la méthode send
    xhr.send(data);

    // Au changement d'état de l'envoi selon conditions on appel le callback (onAddMakingPhpGetAnswer)
    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            callback(xhr.responseText);
        }

    }.bind(this);


};


AddMakings.prototype.onAddMakingPhpGetAnswer = function(answer)
{
    // Recuperation de la réponse serveur depuis "deleMaking.php", parse du Json
    answer = JSON.parse(answer);

    // Affichage du nom créer dans la tr "alert"
    document.getElementById("alert").innerHTML =  "<td colspan='9'> Projet '" + answer.Name + "' ajouté</td>";

    // Création de la nouvelle ligne "tr" à inserer
    var tBody = document.getElementById("table-body");
    var firstChild = tBody.firstChild;
    var newTr = document.createElement("tr");
    newTr.setAttribute("data-rawId", answer.Id);

    // Creation de la premiere cellule Id dans la nouvelle ligne
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(answer.Id));
    newTr.appendChild(td);

    // Creation de la cellule Nom
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(answer.Name));
    newTr.appendChild(td);

    // Creation de la cellule Created (date de creation)
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(answer.Created));
    newTr.appendChild(td);

    // Creation de la cellule Nom
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(answer.Description));
    newTr.appendChild(td);

    //Creation de la cellule Link
    var td = document.createElement("td");
    var a = document.createElement("a");
    a.setAttribute("href", answer.Link);
    a.appendChild(document.createTextNode(answer.Link));
    td.appendChild(a);
    newTr.appendChild(td);

    // Creation de la cellule Languages
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(answer.Languages));
    newTr.appendChild(td);

    // Creation de la cellule Image
    var td = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("class", "summary-img");
    img.setAttribute("alt", answer.Image);
    img.setAttribute("src", "./img/" + answer.Image);
    td.appendChild(img);
    newTr.appendChild(td);


    // Creation de la cellule Modifier
    var td = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("class", "editMaking summary-button");
    button.setAttribute("data-id", answer.Id);
    var i = document.createElement("i");
    i.setAttribute("class", "fas fa-edit");
    button.appendChild(i);
    td.appendChild(button);
    newTr.appendChild(td);

    // Creation de la cellule Supprimer
    var td = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("class", "deleteMaking summary-button");
    button.setAttribute("data-id", answer.Id);
    var i = document.createElement("i");
    i.setAttribute("class", "fas fa-trash-alt");
    button.appendChild(i);
    td.appendChild(button);
    newTr.appendChild(td);


    // Insertion de la nouvelle ligne newTr contenant toutes les cellules td en haut du tableau (donc avant le premier enfant de tbody)
    tBody.insertBefore(newTr, firstChild);

    // Ajout des écouteurs d'événements sur les bouton Modifier et Supprimer
    var selector = document.querySelector(".deleteMaking[data-id='" + answer.Id + "']");
    selector.addEventListener("click", function(){
       console.log("ok event")
    });
    console.log(selector);
};


AddMakings.prototype.resetAndCloseForm = function()
{
    // Reinitialisation des valeurs initiales de this.error (voir constructeur)
    this.error = {
        "name": true,
        "created": true,
        "description" : true,
        "link": true,
        "languages": true
    };
    // Reinitialisation des valeurs de this.newMaking (voir constructeur)
    this.newMaking = {};
    // Fermeture de la fenetre d'ajout de données
    this.addMakingBox.classList.add("hide");
};

