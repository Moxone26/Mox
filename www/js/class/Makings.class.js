//Constructeur
var Makings = function(){};

// Methodes

Makings.prototype.start = function(){
    $(".making-box").on("mouseover", this.onMouseOverShowMakingDivBack);
    $(".making-box").on("mouseout", this.onMouseOverHideMakingDivBack);
};

Makings.prototype.onMouseOverShowMakingDivBack = function(){
    $(".making-div-back", this).removeClass("hide");
    $(".making-img", this).css("opacity", 0.5);
 };

Makings.prototype.onMouseOverHideMakingDivBack = function(){
    $(".making-div-back", this).addClass("hide");
    $(".making-img", this).css("opacity", 1);
};
