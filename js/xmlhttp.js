//wiki search bar using JavaScript Object Notation (JSON)

//indicate that this function is used in strcit mode, hence only use declared variables
"use strict";

//decalre function
(function(){
  //creates a new object called xhr which will handle the API call
  let xhr = new XMLHttpRequest();

  //write this message to the console
  console.log(`Current readyState: ${xhr.readyState}`);

  //create a new object
  //return the element that has the ID attribute
  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  //construct the base for the request url of wikipedia
  let baseURL = "https://en.wikipedia.org/w/api.php? \
                format=json& \
                action=query& \
                generator=search& \
                gsrnamespace=0& \
                gsrlimit=10& \
                prop=info|extracts|langlinks|pageimages& \
                inprop=url& \
                exintro& \
                explaintext& \
                exsentences=1& \
                exlimit=max& \
                llprop=url& \
                lllimit=max& \
                piprop=thumbnail|name& \
                origin=*& \
                gsrsearch=";

  //declare function getherData
  function gatherData(data) {
    //initialise  variables
    let theData = "";
    let langLinks = "";
    let img = "<img>";
    //declare varibale of languages (english)
    const languages = ["en"];
    let k;
    let key;
    //loop through the result pages by pageid
    for(key in data.query.pages) {
      //initialise the variables
      let tmp = data.query.pages[key];


      //if (tmp.thumbnail) {
        //img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      //}

      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        //if the languages are included
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<li>${img} ${title} ${extract} <span class="langs">${langLinks}</span></li>`;
    }
    demoJSON.innerHTML = theData;
  }

  //API call is triggered when the user submits query
  searchForm.addEventListener("submit", function(ev){
    //complete the request url
    let wiki = baseURL + queryBox.value;
    //open a connection to the requested API url
    xhr.open("GET", wiki, true);
    //be polite to Wikipedia
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    //send off request
    xhr.send();
    //if the response was ok then handle the response data by using the gatherData function
    xhr.onreadystatechange = function() {
      //if the loading state of the document
      if (xhr.readyState === 4 && xhr.status === 200) {
        //parse the response JSON
        let response = JSON.parse(xhr.responseText);
        //deal with the parsed JSON data
        gatherData(response);
      }
    };
    //clear the search box once data submitted
    queryBox.value = "";
    ev.preventDefault();
  }, false);
}());
