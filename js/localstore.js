//local storage form that stored users name within the browser
(function(){

  //declare variables and return the element that has the ID attribute
  const myName = document.getElementById("my-name");
  const getName = document.getElementById("get-name");
  const userName = document.getElementById("user-name");
  //create new object and let nameStored be name
  let nameStored = localStorage.getItem('name');

  if(nameStored) {
    //if there is a name in the local storage make use of it
    //display the name
    console.log(`Name on page load: ${nameStored}`);
    myName.innerText = `again ${nameStored}`;
    console.log(`Name stored is: ${nameStored}`);
  }
  else {
    //otherwise if there is no name in the local storage
    myName.innerText = "stranger";
    console.log(`No name stored`);
  }

  //declare the function
  function PerformGreeting(ev) {
    ev.preventDefault();
    //if the users name is blank, please enter your name
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
  //attacth event handler to the name
  getName.addEventListener("submit", PerformGreeting);
}());
