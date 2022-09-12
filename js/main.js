let sort = document.querySelector('#sort');
sort.addEventListener('change', getData);

let url = "events.php";

getData();
function getData() {
    let info = sort.value;
    try {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) { return response.json() })
            .then((res) => {
                if (sort.value == 3) {
                    showTable(res);
                } else if (sort.value == 2) {
                    res.sort(function (a, b) {
                        if (a.event > b.event) {
                            return 1;
                        }
                        if (a.event < b.event) {
                            return -1;
                        }
                        return 0;
                    });
                    showTable(res);
                } else if (sort.value == 1) {
                    res.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    showTable(res);
                }
            });
    } catch (error) {
        console.error('Error:', error);
    }
}

function showTable(res) {
    let result = document.getElementById('result');
    result.innerHTML = "";
    let resLength = res.length;
    if (resLength > 0) {
        let arrThead = ['#', 'Name', 'Event name', 'Date'];
        let arrTheadLength = arrThead.length;
        let table = document.createElement("table");
        table.className = "table";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        let trThead = document.createElement("tr");
        for (let i = 0; i < arrTheadLength; i++) {
            let th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerText = arrThead[i];
            trThead.append(th);
        }
        thead.append(trThead);
        table.append(thead);
        let resFields = ['name', 'event', 'data', 'price'];
        let totalPrice = 0;
        let resFieldsLength = resFields.length;
        loop1:
        for (let i = 0; i < resLength; i++) {
            let tr = document.createElement("tr");
            loop2:
            for (let j = 0; j <= resFieldsLength; j++) {
                if (j == 0) {
                    let th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    th.innerText = i + 1;
                    tr.append(th);
                    continue loop2;
                } else if (j == resFieldsLength) {
                    totalPrice += +res[i][`${resFields[j - 1]}`];
                    tbody.append(tr);
                    continue loop1;
                }
                let td = document.createElement("td");
                td.innerText = res[i][`${resFields[j - 1]}`];
                tr.append(td);
            }
        }
        table.append(tbody);
        result.append(table);
        let total = document.getElementById("total");
        total.innerText = '';
        total.innerText = `The total price of all filtered entries: ${totalPrice} $`;
    } else {
        let span = document.createElement("span");
        span.innerText = 'No events';
        result.append(span);
    }
}