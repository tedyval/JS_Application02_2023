let form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    let dataForm = new FormData(event.target);

    let data = Object.fromEntries(dataForm.entries());

    try {
        if (dataForm.get('email') == '' || dataForm.get('password') == '') {
            throw new Error("Email and password are requered!");
        }



        let credentials = {
            email: data.email,
            password: data.password
        }

        let resp = await fetch('http://localhost:3030/users/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });

        if (resp.ok != true) {
            throw new Error(resp.status);
        }

        let dataReg = await resp.json();
        sessionStorage.setItem("accessToken", dataReg.accessToken);
        window.location = "index.html";

    } catch (error) {
        alert(error.message);
    }




});
