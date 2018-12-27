//display hello message when the website loads up
console.log("hello");

//function to display a pop up message when clicking onto the BlackOps4 Download images
function greeting() {
  alert("Hello");
  hello.textContent = "Goodbye";
}

hello.addEventListener("click", greeting);

//search bar
(function(){
  //create xhr that handles API call
  let xhr = new XMLHttpRequest();

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  //base for the request url
  let baseURL = "http://en.wikipedia.org/w/api.php? \
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
                  llpropp=url& \
                  lllimit=max& \
                  piprop=thumbnail|name& \
                  origin=*& \
                  origin=*& \
                  gsrsearch=";

  /* api sandbox url

  */

  function gatherData(data) {
    let theData = "";
    let langLink = "";
    let img ="<img>";
    const languages = ["en"];
    let k;
    let key;
    //loop through the results pages by pageid
    for(key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"; `;
      }
      let title = '<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>';
      let extract = '<span class="txt">${tmp.extract}</span>';
      let langlinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += '<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> ';
        }
      }
      theData += '<li>${img} ${title} ${extract} <span class="langs">${langLinks}</span></li> ';
    }
    demoJSON.innerHTML = theData;
  }

  //the API call is triggered as soon as the users enter and submit their seach option
  searchForm.addEventListener("submit", function(ev){
    //complete the request url
    let wiki = baseURL + queryBox.value;
    //open a connection to the requested API url
    xhr.open("GET", wiki, true);
    //be polite to wikipedia
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    //send the request enetred by users off
    xhr.send();
    // if the response was ok, handle the response data using the gatherData functions
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        //parse the response json
        let response = JSON.parse(xhr.responseText);
        //deal with the parsed JSON theData
        gatherData(response);
      }
    };
    //clear the search box after searchForm
    queryBox.value ="";
    ev.preventDefault();
  }, false);
}());
