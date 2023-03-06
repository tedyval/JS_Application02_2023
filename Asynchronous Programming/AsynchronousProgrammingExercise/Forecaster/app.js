function attachEvents() {
    let input = document.getElementById('location');
    let button = document.getElementById('submit');
    let divCurrent = document.getElementById('current');
    let divUpcomming = document.getElementById('upcoming');
    let divForecast = document.getElementById('forecast');
    let codeLocation = "";
    button.addEventListener('click', createForecast);


    let symbols = {
        'Sunny': '&#x2600;',// ☀
        'Partly sunny': '&#x26C5;', // ⛅
        'Overcast': '&#x2601;', // ☁
        'Rain': '&#x2614;', // ☂
        'Degrees': '&#176;',   // °

    }

    function createForecast(e) {
        e.preventDefault();

        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(response => response.json())
            .then(data => {
                codeLocation = data.find(obj => obj.name == input.value).code;

                return Promise.all([fetch(`http://localhost:3030/jsonstore/forecaster/today/${codeLocation}`),
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${codeLocation}`)])
            }).then(responses => Promise.all(responses.map(resp => resp.json())))
            .then(values => {
                divForecast.style.display = "block";
                /*current condition*/
                let div = document.createElement('div');
                div.className = "forecasts";
                let spanSymbol = document.createElement('span');
                spanSymbol.className = "condition symbol";
                let searched = Object.entries(symbols).find(([k, v]) => k == values[0].forecast.condition)[1].replace("'", '').replace("'", '');
                spanSymbol.innerHTML = `${searched}`;
                let spanContainer = document.createElement('span');
                spanContainer.className = 'condition';
                let spanName = document.createElement('span');
                spanName.className = "forecast-data";
                spanName.textContent = values[0].name;
                let spanTEMP = document.createElement('span');
                spanTEMP.className = "forecast-data";
                spanTEMP.innerHTML = `${values[0].forecast.low}&#176;/${values[0].forecast.high}&#176;`
                let spanQuality = document.createElement('span');
                spanQuality.className = "forecast-data";
                spanQuality.textContent = values[0].forecast.condition;
                spanContainer.appendChild(spanName);
                spanContainer.appendChild(spanTEMP);
                spanContainer.appendChild(spanQuality);
                div.appendChild(spanSymbol);
                div.appendChild(spanContainer);
                divCurrent.appendChild(div);
                

                /* three days forecast*/

                values[1].forecast.forEach(day => {
                    let div = document.createElement('div');
                    div.className = "forecast-info";

                    let spanContainer = document.createElement('span');
                    spanContainer.className = 'upcoming';
                    let spanSymbol = document.createElement('span');
                    spanSymbol.className = "symbol";
                    let searched = Object.entries(symbols).find(([k, v]) => k == day.condition)[1].replace("'", '').replace("'", '');
                    spanSymbol.innerHTML = `${searched}`;

                    let spanTEMP = document.createElement('span');
                    spanTEMP.className = "forecast-data";
                    spanTEMP.innerHTML = `${day.low}&#176;/${day.high}&#176;`
                    let spanQuality = document.createElement('span');
                    spanQuality.className = "forecast-data";
                    spanQuality.textContent = day.condition;
                    spanContainer.appendChild(spanSymbol);
                    spanContainer.appendChild(spanTEMP);
                    spanContainer.appendChild(spanQuality);

                    divUpcomming.appendChild(spanContainer);
                })
            })
            .catch(error => divForecast.textContent = "Error");




    }


}






attachEvents();