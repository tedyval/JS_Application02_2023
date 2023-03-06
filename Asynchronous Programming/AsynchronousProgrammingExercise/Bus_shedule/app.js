function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let info = document.getElementsByClassName('info')[0];
    
   

    let busStop = {
       
        next: "2572"
    }

  
    function depart() {
      
        departBtn.disabled= true;
        arriveBtn.disabled = false;
        
    
       
            fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`)
                .then(resp => resp.json())
                .then(data => {
                    busStop.next=data.next
                    if(data.next == 'depot'){
                       data.next ="Depot"
                    }
                    
                    
                    info.textContent = `Next stop ${data.next}.`;
    
                })
                .catch(error => {
                    info.textContent = 'Error';
                    departBtn.disable = true;
                    arriveBtn.disable = true;
                })
        
        
       
    }

    function arrive() {
      
        departBtn.disabled = false;
        arriveBtn.disabled = true;
       
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`)
            .then(resp => resp.json())
            .then(data => {
                busStop.next=data.next
                info.textContent = `Arriving at  ${data.name}`;

            })
            .catch(error => {
                info.textContent = 'Error';
                departBtn.disable = true;
                arriveBtn.disable = true;
            })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();