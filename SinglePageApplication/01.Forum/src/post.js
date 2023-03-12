let divTopicTitle = document.querySelector('.topic-title');
let formFirstContainer = document.querySelector('.new-topic-border');
let secondForm = document.querySelector(".answer-comment");
let secForm = document.querySelector(".answer-comment form");
secForm.addEventListener('submit', (e) => commentPostSend(e));
let divCommentContainer = document.querySelector('.comment');

async function showAllComentsToTopic(e) {
    e.stopPropagation();
    formFirstContainer.style.display = "none";
    divTopicTitle.style.display = "none";
    divCommentContainer.replaceChildren();
    divCommentContainer.style.display="block";


    if (e.target.tagName == "H2") {
        secondForm.style.display = "block";
        


        let postId = e.target.parentElement.dataset.id;
        createPostElement(postId);
    
        secondForm.dataset._postId = postId;
        getcommentsPost();




    } else {
        return
    }


}

async function commentPostSend(e) {
    e.preventDefault();
    let formData = new FormData(secForm);


    if (formData.get("postText") == '' || formData.get("username") == '') {
        throw new Error("All inputs are required");
    }

    let comment = Object.fromEntries(formData.entries());
    comment._postId = secondForm.dataset._postId;
    comment.createdOn = new Date();


    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: "post",
            headers: {
                "Content-Type": "appication/json"
            },
            body: JSON.stringify(comment)
        })

        let data = await response.json();

        if (response.ok == false) {
            throw new Error(data.message);
        }


        let commentToPost = createCommentInDOM(data);
        divCommentContainer.appendChild(commentToPost);
        secForm.reset();


    } catch (error) {
        alert(error.message);
    }





}

function createCommentInDOM(data) {
    let divComment = document.createElement('div');
    divComment.className = "user-comment";
    divComment.innerHTML = `
   <div class="topic-name-wrapper">
   <div class="topic-name">
       <p><strong>${data.username}</strong> commented on <time>${data.createdOn}</time></p>
       <div class="post-content">
           <p>${data.postText}</p>
       </div>
   </div>
</div>
   `;

    return divComment;


}

async function createPostElement(postId) {
    let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`)
    let data = await response.json();
    let h2 = document.createElement('h2');
    h2.textContent = data.topicName;
    let divHeader = document.createElement('div');
    divHeader.className = "header";
    divHeader.innerHTML = `
<img src="./static/profile.png" alt="avatar">
<p><span>${data.username}</span> posted on <time>${data.dataTime}</time></p>

<p class="post-content">${data.postText}</p>
`;

    divCommentContainer.appendChild(h2);
    divCommentContainer.appendChild(divHeader);

}

async function getcommentsPost() {
    let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);
    let data = await response.json();

    let arrEls =Object.values(data).map(val=> createCommentInDOM(val));
    let fragment = new DocumentFragment();
    fragment.append(...arrEls);
    divCommentContainer.append(fragment);
}


export { showAllComentsToTopic };

