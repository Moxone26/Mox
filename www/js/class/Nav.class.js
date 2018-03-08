// Constructeur
var Nav = function(){};

// Methodes

Nav.prototype.start = function()
{
    $(".menu").on("click", this.onClickToggleNav);
};

Nav.prototype.onClickToggleNav = function(event)
{
    event.preventDefault();
    //console.log("OnClickToggleNav");
    $(".burger-nav").fadeToggle("slow", function(){
        $(".menu i").toggleClass("fa-times");
    });
};