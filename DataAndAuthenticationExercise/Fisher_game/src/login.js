function login(){
    window.addEventListener('load', () => {
       

        let form = document.querySelector('form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let formData = new FormData(e.target);
            let emailData = formData.get("email");
            let passwordData = formData.get("password");
           


            try {
                if (emailData == '' || passwordData == '') {
                    throw new Error("All fields must be fullfilled");
                }

                let user = {
                    email: emailData,
                    password: passwordData
                }

                let response = await fetch('http://localhost:3030/users/login',{
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })

                if(response.ok == false){
                    throw new Error(response.statusText);
                }

                let postedData = await response.json();

                sessionStorage.setItem("accessToken",postedData.accessToken);
                sessionStorage.setItem("email",postedData.email);
                window.location = "index.html"

                


            } catch (error) {
                alert(error.message);
                window.location= "login.html";
            }
        })





    })
}

login();