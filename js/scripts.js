//local storage
(function(){

  const myName = document.getElementById("my-name");
  const getName = document.getElementById("get-name");
  const userName = document.getElementById("user-name");
  let nameStored = localStorage.getItem('name');

  if(nameStored) {
    //if there is a name with the local storage, use it:
    //display the name
    console.log(`Name on page load: ${nameStored}`);
    myName.innerText = `again ${nameStored}`;
    console.log(`Name stored is: ${nameStored}`);
  }
  else {
    //if there is no name in the local storage
    myName.innerText = "stranger";
    console.log(`No name stored`);
  }

  function PerformGreeting(ev) {
    ev.preventDefault();
    if(userName.value === "") {
      alert("Please enter a name");
      userName.focus();
    }
    //gets the name the user has entered
    nameStored = userName.value;
    //shows the name
    myName.innerText = nameStored;
    //puts the name into localStorage
    localStorage.setItem('name', nameStored);
    //display the name in the console once it has been successfully entered
    console.log(`New name stored: ${nameStored}`);
  }

  getName.addEventListener("submit", PerformGreeting);
}());

//wiki search bar
"use strict";

(function(){
  //creates a new object called xhr
  //which will handle the API call
  let xhr = new XMLHttpRequest();
  //console.log(`Current readyState: ${xhr.readyState}`);

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  //constructs the base for the request url
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

  function gatherData(data) {
    //initialise some variables
    let theData = "";
    let langLinks = "";
    let img = "<img>";
    const languages = ["en", "de", "zh", "fr", "es", "ja", "ar", "ko", "el"];
    let k;
    let key;
    //loop through the result pages by pageid
    for(key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      }
      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<li>${img} ${title} ${extract} <span class="langs">${langLinks}</span></li>`;
    }
    demoJSON.innerHTML = theData;
  }

  //the API call is triggered when the user submits query
  searchForm.addEventListener("submit", function(ev){
    //complete the request url
    let wiki = baseURL + queryBox.value;
    //open a connection to the requested API url
    xhr.open("GET", wiki, true);
    //be polite to Wikipedia
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    //send off that request
    xhr.send();
    //if the response was ok, handle the response data using the gatherData function
    xhr.onreadystatechange = function() {
      //console.log(`Current readyState: ${xhr.readyState}`);
      if (xhr.readyState === 4 && xhr.status === 200) {
        //parse the response JSON
        let response = JSON.parse(xhr.responseText);
        //deal with the parsed JSON data
        gatherData(response);
      }
    };
    //clear the search box
    queryBox.value = "";
    ev.preventDefault();
  }, false);

}());



//display hello message when the website loads up
console.log("welcome");



//function to display a pop up message when clicking onto the BlackOps4 Download images
function greeting() {
  alert("Welcome");
  welcome.textContent = "Your daily feed for the latest games";
}

welcome.addEventListener("click", greeting);
