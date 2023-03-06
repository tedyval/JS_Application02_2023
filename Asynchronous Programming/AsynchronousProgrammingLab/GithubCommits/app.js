function loadCommits() {
  let username = document.getElementById('username').value;
  let repo = document.getElementById('repo').value;
  let ul = document.getElementById('commits');

  fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
  .then((response)=>response.json())
  .then((data)=>{
     data.forEach(element => {
        let li = document.createElement('li');
        li.textContent = `${element.commit.author.name}: ${element.commit.message}`;
        ul.appendChild(li);
     });
  })
  .catch((error)=>{
    
    let li = document.createElement('li');
        li.textContent = `Error: ${error.status} (Not Found)`;
        ul.appendChild(li);

  })



}