//Alert box
let alertBox = (function () {

    let alert = {};

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function hides the alert box if it is already on
     */
    alert.hide = function(){
        let list = document.getElementsByClassName("alert alert-danger");
        for(let item of list){
            item.style.display = "none";
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function shows alert box
     * @param str
     * @param id
     */
    alert.show = function(str , id){
        document.getElementById(id).innerHTML = str;
        document.getElementById(id).style.display = "block";
    }

    return alert;

})();