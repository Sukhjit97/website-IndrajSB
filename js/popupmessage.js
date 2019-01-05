//function to display a pop up message when clicking onto the BlackOps4 Download images
const hello = document.getElementById("hello")

//declare the function greeting
function greeting() {
  //display a welcome pop up message
  alert("Welcome to Game stop");
  //diaplsy this welcome message once the original text has been selected
  welcome.textContent = "Your daily feed for the latest games";
}

//attach event handler to the document to display greeting message
welcome.addEventListener("click", greeting);
