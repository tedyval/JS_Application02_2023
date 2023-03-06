function attachEvents() {
    let btnLoad = document.getElementById('btnLoadPosts');
    let posts = document.getElementById('posts');
    let btnView = document.getElementById('btnViewPost');
    let ul = document.getElementById('post-comments');
    let h1 = document.getElementById('post-title');
    let p = document.getElementById('post-body');


    btnLoad.addEventListener('click', loadData);

    function loadData() {


        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(resp => resp.json())
            .then(data => {
                Object.entries(data).forEach(([k, v]) => {
                    let option = document.createElement('option');
                    option.value = k;
                    option.text = v.title;
                    posts.appendChild(option);
                });

            })
    }

    btnView.addEventListener('click', viewComments);

    function viewComments() {
        ul.innerHTML="";
        let indexSelect = posts.selectedIndex;
        let valueSelect = posts.options[indexSelect].value;
        let textSelect = posts.options[indexSelect].text;



        let arrayFetch = [fetch(`http://localhost:3030/jsonstore/blog/posts/${valueSelect}`),
        fetch(`http://localhost:3030/jsonstore/blog/comments`)];


        let results = [];
        Promise.all(arrayFetch).then(resp => Promise.all(resp.map(r => r.json()))).then(values => {
            h1.textContent = values[0].title.toUpperCase();
            p.textContent = values[0].body;

            Object.entries(values[1]).filter(([k, v]) => v.postId == valueSelect).forEach(([k, v]) => {
                let li = document.createElement('li');
                li.id = k;
                li.textContent = v.text;
                ul.appendChild(li);

            })

        }).catch(error=> console.log("Error"));
    }
}

    attachEvents();