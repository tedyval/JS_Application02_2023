function loadRepos() {

	let user = document.getElementById('username').value;
	let ul = document.getElementById('repos');
	ul.textContent = "";
	fetch(`https://api.github.com/users/${user}/repos`)
		.then((response) => {
            if(response.status != 200){
				throw new Error(`Error ${response.status}`)
			}

			response.json();
		})
		.then((data) => {

			data.forEach(element => {
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.href = `${element.html_url}`;
				a.textContent = `${element.full_name}`;
				li.appendChild(a);
				ul.appendChild(li);
			});
		})
		.catch((error) => {
			let li = document.createElement('li');
			li.textContent = error.message;
			ul.appendChild(li);
		});
}