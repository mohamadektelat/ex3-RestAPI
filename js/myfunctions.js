let flag = true;

//----------------------------------------------------------------------------------------------------------------------

let useApiData = function (){

    let publicData = {}

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function builds request url for the data from NASA server.
     * @param date
     * @param rover
     * @param camera
     * @param API_KEY
     * @returns {string}
     */
    publicData.buildURL = function(date ,rover ,camera  ,API_KEY){
        if(validator.isNumber(date))
            return "https://api.nasa.gov/mars-photos/api/v1/rovers/"+rover+"/photos?sol="+date+"&camera="+camera
                +"&api_key="+API_KEY;

        return "https://api.nasa.gov/mars-photos/api/v1/rovers/"+rover+"/photos?earth_date="+date+"&camera="+camera
            +"&api_key="+API_KEY;

    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function builds request url for the manifest from Nasa server.
     * @param str
     * @returns {string}
     */
    publicData.buildManifestURL = function(str){
        return "https://api.nasa.gov/mars-photos/api/v1/manifests/"+str+
            "?api_key=yikAlOMYh1xFe1ioWj00wke4iUPEZXfXu2Y0czfZ";
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function builds Html line to insert dynamically in the run time to the search results.
     * @param photo
     * @returns {`<div class = "col-4"><div class="card-fluid m-4">
                <img src=${*} class="card-img-top" alt="...">
                <div class="card-body">
                <br><h3>Earth date: ${*}</h3><br>
                <h3>Sol: ${*}</h3><br>
                <h3>Camera: ${string}</h3><br>
                <h3>Mission: ${string}</h3><br>
                <button class="btn btn-primary mt-4 s">
                Save
                </button>
                <a href=${*} class="btn btn-primary mt-4 " target="_blank">Full size</a>
                </div></div></div>`}
     */
    publicData.buildHTMLLINEPHOTOS = function (photo){

        return `<div class = "col-4"><div class="card-fluid m-4">
                <img src=${photo.img_src} class="card-img-top" alt="...">
                <div class="card-body">
                <br><h3>Earth date: ${photo.earth_date}</h3><br>
                <h3>Sol: ${photo.sol}</h3><br>
                <h3>Camera: ${photo.camera.name}</h3><br>
                <h3>Mission: ${photo.rover.name}</h3><br>
                <button class="btn btn-primary mt-4 s">
                Save
                </button>
                <a href=${photo.img_src} class="btn btn-primary mt-4 " target="_blank">Full size</a>
                </div></div></div>`;

    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function builds Html line to insert dynamically in the run time to the carousel.
     * @param src
     * @returns {string}
     */
    publicData.buildHTMLLINECAROUSELA = function (s , src){
        if(flag) {
            flag = false;
            return `<div class="carousel-item active">
                        <img src=${src} class="w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <b><h4>${s[8].split(":")[1]}</h4></b>
                            <h5>${s[2].split(":")[1]}</h5>
                            <a href=${src} class="btn btn-primary mt-4 " target="_blank">Full size</a>
                        </div>
                        </div>`;
        }
        else{
            return `<div class="carousel-item">
                        <img src=${src} class="w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <b><h4>${s[8].split(":")[1]}</h4></b>
                            <h5>${s[2].split(":")[1]}</h5>
                            <a href=${src} class="btn btn-primary mt-4 " target="_blank">Full size</a>
                        </div>
                        </div>`;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function checks the save buttons on the card
     */
    publicData.checkButtons = function(){
        let list = document.getElementsByClassName("btn btn-primary mt-4 s");
        for(let item of list) {
            item.onclick = function(){
                let div = item.parentNode.parentNode;
                let s = (div.innerText.split("\n"));
                let photoSRC = div.getElementsByClassName("card-img-top")[0].src;
                document.getElementById("ol").innerHTML += `<li><a href=${photoSRC} class="link-primary" 
                target="_blank">Image id:</a><p>${s[2]},${s[5]},${s[8]}.</p></li>`;
                document.getElementById("carousel").innerHTML += useApiData.buildHTMLLINECAROUSELA(s,photoSRC)
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function used after pressing the search button, the function validates the input data then fetching data
     * from NASA's server, then the function shows the data in the page.
     */
    publicData.searchButton = function(){
        document.getElementById("content").innerHTML = "";
        alertBox.hide();
        let url;
        if(validator.checkDate()) {
            document.getElementById("spinner").style.display = "block";
            url = useApiData.buildURL(document.getElementById("searchDate").value,
                document.getElementById("inputGroupSelect01").value,
                document.getElementById("inputGroupSelect02").value,
                "yikAlOMYh1xFe1ioWj00wke4iUPEZXfXu2Y0czfZ");
            fetch(url)
                .then(validator.checkFetch)
                .then(res => res.json())
                .then(data => {
                    if (data.photos.length > 0) {
                        for (let i = 0; i < data.photos.length; i++) {
                            document.getElementById("content").innerHTML +=
                                useApiData.buildHTMLLINEPHOTOS(data.photos[i]);
                        }
                    } else {
                        document.getElementById("content").innerHTML +=
                            '<h1 style="color: red">No images found!</h1>'
                    }
                    document.getElementById("spinner").style.display = "none";
                })
                .catch(()=>{
                    document.getElementById("spinner").style.display = "none";
                    alertBox.show("Some thing went wrong, please check you internet connection and try again later!",
                        "alert_box4")
                });
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function used after pressing the clear button, the function clears the input areas
     */
    publicData.clearButton = function(){
        document.getElementById("content").innerHTML = '';
        document.getElementById("searchDate").value = '';
        document.getElementById("inputGroupSelect01").value ='Choose';
        document.getElementById("inputGroupSelect02").value = 'Choose';
        alertBox.hide();
    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * That function displays the carousel
     * @param str
     */
    publicData.carouselDisplay = function(str){
        document.getElementById("carouselExampleFade").style.display = str;
    }

    return publicData;
}();