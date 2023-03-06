function getInfo() {
    let ul = document.getElementById('buses');
    let stopId = document.getElementById('stopId').value;
    let stopNameDiv = document.getElementById('stopName');
    ul.innerHTML="";

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    .then((response)=> response.json())
    .then((data)=> {
        stopNameDiv.textContent = data.name;
        Object.entries(data.buses).forEach(([busNum,time]) => {
          let li = document.createElement('li');
          li.textContent =`Bus ${busNum} arrives in ${time} minutes`;  
          ul.appendChild(li);
        });
    })
    .catch((error)=> 
    stopNameDiv.textContent = "Error");
}