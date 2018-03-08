// Fonction

// Code principal
jQuery(function($){

    var $nav;
    var $makings;
    var addMakings;

    // Instanciation de la class Nav qui permet d'afficher le menu lors du click sur l'icone burger
    $nav = new Nav();
    $nav.start();

    // Instanciation de la class Makings qui permet d'afficher le reste des informations de chaque projets au survol de la souris
    $makings = new Makings();
    $makings.start();

});

