let sort = document.querySelector('#sort');
sort.addEventListener('change', getData);

let url = "events.php";

// getData();
async function getData() {
    let info = sort.value;
    console.log('info :>> ', info);
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        // console.log('Успех:', JSON.stringify(json));
        let res = JSON.stringify(json);
        console.log('res :>> ', res);
        if (sort.value == 3) {
            showTable(res);
        } else if (sort.value == 2) {
            showTable(res.sort(function (a, b) {
                if (a.event > b.event) {
                    return 1;
                }
                if (a.event < b.event) {
                    return -1;
                }
                return 0;
            }));
        } else if (sort.value == 1) {
            showTable(res.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showTable(res) {
    console.log('res2 :>> ', res);
}


// fetch(url)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(arr) {
//     let table = document.createElement("table");
//     table.id = "info-table";
//     table.className = "table";
//     let thead = document.createElement("thead");
//     let tbody = document.createElement("tbody");
//     for (let i = 0; i < 1; i++) {
//       let tr = document.createElement("tr");
//       for (let j = 0; j < arr[i].length - 1; j++) {
//         let th = document.createElement("th");
//         th.textContent = arr[i][j];
//         tr.append(th);
//         thead.append(tr);
//         table.append(thead);
//       }
//       info.append(table);
//     }
//     for (let i = 1; i < arr.length; i++) {
//       let tr = document.createElement("tr");
//       let tr2 = document.createElement("tr");
//       tr2.id = `t${i}`;
//       tr2.className = "tr2";
//       tr2.style.display = "none";
//       let td2 = document.createElement("td");
//       td2.setAttribute("colspan", arr[i].length);
//       let ul = document.createElement("ul");
//       let li = document.createElement("li");
//       li.innerHTML = `День народження: <span class="fontWeight">${arr[i][8]} р.</span>`;
//       ul.append(li);
//       let li2 = document.createElement("li");
//       let a = document.createElement("a");
//       a.className = "linkPosad";
//       let to = `./posadovi/${arr[i][1]}.docx`;
//       a.setAttribute("href", to);
//       a.innerText = `Посадова`;
//       li2.append(a);
//       ul.appendChild(li2);
//       td2.append(ul);
//       tr2.append(td2);
//       for (let j = 0; j < arr[i].length - 1; j++) {
//         let td = document.createElement("td");
//         td.textContent = arr[i][j];
//         tr.append(td);
//       }
//       tr.addEventListener("click", function() {
//         let list = document.getElementById(`t${i}`);
//         if (list.style.display == "") {
//           list.style.display = "none";
//         } else {
//           list.style.display = "";
//         }
//       });
//       tbody.append(tr);
//       tbody.appendChild(tr2);
//       table.appendChild(tbody);
//       info.appendChild(table);
//     }
//     loader.style.display = "none";
//     return arr;
//   })
//   .then(function(arr) {
//     let mySearch = document.getElementById("mySearch");
//     mySearch.addEventListener("input", function() {
//       let infoTable = document.getElementById("info-table");
//       var regPhrase = new RegExp(mySearch.value, "i");
//       var flag = false;
//       for (var i = 1; i < infoTable.rows.length; i++) {
//         flag = false;
//         for (var j = infoTable.rows[i].cells.length - 1; j >= 1; j--) {
//           flag = regPhrase.test(infoTable.rows[i].cells[j].innerHTML);
//           if (flag) break;
//         }
//         if (flag) {
//           infoTable.rows[i].style.display = "";
//         } else {
//           infoTable.rows[i].style.display = "none";
//         }
//       }
//     });
//   });