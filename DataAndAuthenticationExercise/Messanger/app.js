function attachEvents() {
    let textarea = document.getElementById('messages');
    let name = document.querySelector('[name="author"]');
    let message = document.querySelector('[name="content"]');
    let btnSend = document.getElementById('submit');
    let btnRefresh = document.getElementById('refresh');

    btnSend.addEventListener('click', sendMessage);
    btnRefresh.addEventListener('click', displayMessages);

    async function sendMessage() {
        let obj = {
            author: name.value,
            content: message.value
        }

        try {

            let response = await fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            if (response.ok != true) {
                throw new Error(response.statusText)
            }

           



        } catch (error) {
            alert(error.message)
        }

        name.value="";
        message.value="";

    }

    async function displayMessages(){
        try{
            let resp = await fetch('http://localhost:3030/jsonstore/messenger');
            if(resp.ok != true){
                throw new Error(resp.statusText)
            }

            let data = await resp.json();
            let output = [];
            Object.values(data).forEach(obj=>{
             output.push(`${obj.author}: ${obj.content}`)
            });

            textarea.value=output.join('\n');

        }catch(error){
          alert(error.message)
        }

    }

}

attachEvents();