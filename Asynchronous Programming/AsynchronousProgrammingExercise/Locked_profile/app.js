async function lockedProfile() {

  let main = document.getElementById('main');



  try {
    let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles')
    let data = await response.json();
    main.innerHTML = "";
    Object.values(data).forEach((userObj, index) => {
      let divProfile = document.createElement('div');
      divProfile.className = "profile";
      divProfile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="" disabled readonly />
				<div class="user1Username">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user1Age" value="" disabled readonly />
				</div>
				
				<button>Show more</button>`;

      main.appendChild(divProfile);
      let inputName = document.getElementsByName('user1Username')[index];
      inputName.value = userObj.username;
      let inputEmail = document.getElementsByName('user1Email')[index];
      inputEmail.value = userObj.email;
      let inputAge = document.getElementsByName('user1Age')[index];
      inputAge.value = userObj.age;
      let showMoreBtn = document.getElementsByTagName('button')[index];
      let divPro = document.getElementsByClassName("profile")[index];
      let radioBtnLock = divPro.querySelector("input[value='lock']");
      let radioBtnUnlock = divPro.querySelector("input[value='unlock']");

      let divHideContent = document.getElementsByClassName('user1Username')[index];
      divHideContent.style.display = "none";

      showMoreBtn.addEventListener('click', show);
      

      function show(e) {
        if (showMoreBtn.textContent == "Show more") {
          if (radioBtnUnlock.checked == true) {

            divHideContent.style.display = "";
            showMoreBtn.textContent = "Hide it";
          }

          if (radioBtnLock.checked == true) {

            divHideContent.style.display = "none";
          }
        }else if(showMoreBtn.textContent == "Hide it" && radioBtnUnlock.checked == true){
          divHideContent.style.display = "none";
          showMoreBtn.textContent = "Show more";
        }

      }

    

    })

  } catch (error) {
    alert("Error")
  }


}