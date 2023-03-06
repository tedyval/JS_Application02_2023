function students() {
    let tbody = document.querySelector('tbody');
    let form = document.getElementById('form');
    let btn = document.getElementById('submit');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        let formData = new FormData(form);


        try {


            if (formData.get('firstName') == "" || formData.get('lastName') == ""
                || formData.get('facultyNumber') == "" || typeof Number(formData.get('facultyNumber')) != "number") {
                throw new Error("All fields must be fullfilled!")
                return;
            }

            if (formData.get("grade") == '' || typeof Number(formData.get("grade")) != "number") {
                throw new Error("Grade must be fullfilled and be a number!");
                return;
            }

            let studentObj = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                facultyNumber: formData.get("facultyNumber"),
                grade: formData.get("grade")

            }

            let promise = await fetch('http://localhost:3030/jsonstore/collections/students', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentObj)
            });

            if (promise.ok == false) {
                throw new Error(promise.statusText);
            }

            let prom = await fetch('http://localhost:3030/jsonstore/collections/students');
            if (prom.ok == false) {
                throw new Error(prom.statusText);
            }

            let data = await prom.json();

            Object.values(data).forEach(student => {
                let tr = document.createElement('tr');
                let tdFirstName = document.createElement('td');
                tdFirstName.textContent = student.firstName;
                let tdLastName = document.createElement('td');
                tdLastName.textContent = student.lastName;
                let tdFacultyNumber = document.createElement('td');
                tdFacultyNumber.textContent = student.facultyNumber;
                let tdGrade = document.createElement('td');
                tdGrade.textContent = student.grade;
                tr.appendChild(tdFirstName);
                tr.appendChild(tdLastName);
                tr.appendChild(tdFacultyNumber);
                tr.appendChild(tdGrade);
                tbody.appendChild(tr);

            });

            Array.from(document.querySelectorAll(".inputs input"))
            .forEach(input=>input.value = "");


        } catch (error) {
            alert(error.message)
        }




    });
}

students();
