'use strict';

document.addEventListener('DOMContentLoaded', function(){

    //Instanciation de la class AddMakings qui permet d'afficher le formulaire de saisie d'un nouveau site (Making)
    var addMakings;

    addMakings = new AddMakings();
    addMakings.onClickShowAddMakingBox(); // Affichage du formulaire d'ajout de contenu
    addMakings.onClickHideMakingBox(); // Ferme le formulaire d'ajout de contenu
    addMakings.onBlurCheckInput(); // Verifie si formulaire est correctement renseigné
    addMakings.onClickSubmitAddMakingForm(); // Traite l'ajout de contenu en Ajax et retourne une réponse via le callback onAddMakingPhpGetAnswer

});