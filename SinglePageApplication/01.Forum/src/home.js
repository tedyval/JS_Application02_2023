import { showAllComentsToTopic } from "./post.js";

let formFirstContainer = document.querySelector('.new-topic-border');
let formTopic = document.querySelector('.new-topic-border form');
formTopic.addEventListener('submit', (e) => { onCreateTopic(e) });
let btnCancel = formTopic.querySelector('.cancel');
btnCancel.addEventListener('click', (e) => { onCancel(e) });
let divTopicTitle = document.querySelector('.topic-title');
let homeBtn = document.querySelector('nav a');
let secondForm = document.querySelector(".answer-comment");
secondForm.style.display = 'none';
let divCommentContainer = document.querySelector('.comment');
divTopicTitle.addEventListener('click', async (e) => await showAllComentsToTopic(e));


homeBtn.addEventListener("click", (ev) => { getAllPostsByBtnHome(ev) });

getAllPosts();

async function getAllPostsByBtnHome(ev) {
    ev.preventDefault();
    formFirstContainer.style.display = "block";
    divTopicTitle.style.display = "block";
    secondForm.style.display = 'none';
    divCommentContainer.style.display = "none";
    divTopicTitle.replaceChildren();
    getAllPosts();

}

async function getAllPosts() {

    divTopicTitle.replaceChildren();
    let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`);
    let data = await response.json();

    if (response.ok == false) {
        throw new Error(response.statusText)
    }

    let arrElements = Object.values(data).map(val => createPostOnHomePage(val));
    let fragment = new DocumentFragment();
    fragment.append(...arrElements);
    divTopicTitle.append(fragment);


}


async function onCreateTopic(e) {
    e.preventDefault();

    let formData = new FormData(formTopic);
    let objectToBePosted = Object.fromEntries(formData.entries());
    if (formData.get("topicName") == "" || formData.get("username") == "" || formData.get("postText") == "") {
        throw new Error('All inputs are requered.');
    }
    formTopic.reset();

    objectToBePosted.dataTime = new Date();

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectToBePosted)

    });

    let dataForCreate = await response.json();

    if (response.ok == false) {
        throw new Error(dataForCreate.message)
    }

    createPostOnHomePage(dataForCreate);





}




function createPostOnHomePage(dataForCreate) {
    let divTopicContainer = document.createElement('div');
    divTopicContainer.classList.add("topic-container");
    divTopicContainer.dataset.idPost = dataForCreate._id;
    divTopicContainer.innerHTML = `
    <div class="topic-name-wrapper">
                        <div class="topic-name">
                            <a href="#" class="normal">
                                <h2>${dataForCreate.topicName}</h2> 
                            </a>
                            <div class="columns">
                                <div>
                                    <p>Date: <time>${dataForCreate.dataTime}</time></p>
                                    <div class="nick-name">
                                        <p>Username: <span>${dataForCreate.username}</span></p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
    `;

    divTopicTitle.appendChild(divTopicContainer);
    divTopicContainer.querySelector("a").dataset.id = dataForCreate._id;
}

function onCancel(e) {
    if (e.target.tagName == "BUTTON" && e.target.textContent == "Cancel") {
        formTopic.reset();
    }

}
