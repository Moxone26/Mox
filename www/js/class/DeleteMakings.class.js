'use strict';

// Constructeur
var DeleteMakings = function()
{
    this.deleteButtons = document.querySelectorAll(".deleteMaking");
};

//Méthodes

DeleteMakings.prototype.onClickGetDeleteMakingId = function() {
    console.log(this.deleteButtons);
};