const baseURL = 'https://trackapi.nutritionix.com/v2/search/instant?'
const headers = {
    'Content-Type': 'application/json',
    'x-app-id' : '2265ede8',
    'x-app-key' : '8302c959a2eba3d08103d4daa816f6a6',
    'x-remote-user-id' : 0
  };

document.getElementById('btn-submit').addEventListener('click', searchFood);


function addPicture(photo) {
    document.getElementById('picture').src = photo;
}

// function rowHandlers() {
//     let table = document.getElementById("data-table");
//     let rows = table.getElementsByTagName("tr");
//     for (i = 0; i < rows.length; i++) {
//         let currentRow = table.rows[i];
//         let createClickHandler = (row) => {
//             return function() { 
//                 let cell = row.getElementsByTagName("td")[3];
//                 let photo = cell.innerHTML;
//                 console.log("Photo:" + photo);
//                 addPicture(photo);
//                 };
//             };
//         currentRow.onclick = createClickHandler(currentRow);
//     }
// }


function buildTable(data) {
    // console.log(data)
    // console.log(data.common)
    console.log(data.common)
    
    let table = document.getElementById('data-table');
    let headers = `<thead><tr><th>Food Name</th><th>Serving Unit</th><th>Serving Qty</th></tr></thead>`
    table.innerHTML = headers;
    let tbody = document.createElement('tbody');
    
    data.common.forEach(e => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');


        td.innerHTML = e.food_name;
        tr.classList.add('img-result');
        tr.append(td);

        td = document.createElement('td');
        td.innerHTML = e.serving_unit;
        tr.append(td);

        td = document.createElement('td');
        td.innerHTML = e.serving_qty;
        tr.append(td);

        td = document.createElement('td');
        td.classList.add('no-display');
        td.innerHTML = e.photo.thumb;
        tr.append(td);

        tr.addEventListener('click', (event) => {
            addPicture(event.target.parentNode.cells[3].innerHTML);
        })
        
        tbody.append(tr);
      
    })
    table.append(tbody);
    // rowHandlers();   
}


function searchFood() {
    let search = document.getElementById('search-input').value;
    let url = baseURL + `query=${search}`
    // console.log(url);

    getData(url)
        .then(data => {
            buildTable(data);
        });
    document.getElementById('search-input').value = '';
}


// MDN website
async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

