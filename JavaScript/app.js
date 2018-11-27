(function(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() { console.log('Service Worker Registered'); });
                 
      }
} )();

///


(  function() {
    var app = {
        dogStatusFilter: document.getElementById( "dogStatusFilter" ),
        dogList: [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "http://127.0.0.1:8000/perros/";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayPerros( data.results );
                app.dogList = data.results;
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }

    var displayPerros = function( dogs ) {
        var dogsContainer = document.getElementById( "dogsContainer");
        dogsContainer.innerHTML = "";

        for( let dog of dogs ) {
            var dogContainer = document.createElement( "div" );
            var txtdogName = document.createElement( "h3" );
            var imgdog = document.createElement( "img" );
            var txtdogDescription = document.createElement( "p" );
            var txtdogStatus = document.createElement( "p" );
            dogContainer.className = "dogContainer";
            txtdogName.innerHTML = dog.name;
            imgdog.src = dog.imageUrl;
            imgdog.alt = dog.name;
            txtdogDescription.innerHTML = dog.description;
            txtdogStatus.innerHTML = "<b>Status: </b>" + dog.Status;
            // Agregar los hijos correspondientes
            dogContainer.appendChild( txtdogName );
            dogContainer.appendChild( imgdog );
            dogContainer.appendChild( txtdogDescription );
            dogContainer.appendChild( txtdogStatus );
            // Agregar el contenedor al documento
            dogsContainer.appendChild( dogContainer );
        }
    }

    app.dogStatusFilter.addEventListener( "change", function( e ) {
        var filtereddogs = app.dogList.filter( function( dog ) {
            if( dog.color == app.dogStatusFilter.value ) {
                return dog;
            }
        } );
        displayPerros( filtereddogs );
    } );
    
    loadData();
} ) ( );