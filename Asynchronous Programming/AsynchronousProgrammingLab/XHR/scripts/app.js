function loadRepos() {
   let div = document.getElementById('res');
   let request = new XMLHttpRequest();
   request.open('GET','https://api.github.com/users/testnakov/repos');
   request.addEventListener("readystatechange",function(){
     if(request.readyState == 4 && request.status == 200){
      div.textContent = request.responseText;
     }
   });
   request.send(); 
}