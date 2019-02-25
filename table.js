
var table = document.getElementById("table");
var api = "https://ghibliapi.herokuapp.com/films/";
var tableData;
var data = fetch(api).then(function(res){
    if(res.status !== 200){
        errorLoading(table);
        return;
    }
    res.json().then(function(data){
        addData(table, data);
    });
    
})
.catch(function(err){
    errorLoading(table);
});



function addData(table, data){
    var tablekeys = Object.keys(data[0]);
    tablekeys.forEach(function(elm){
        addThToTable(table, elm);
    });
    data.forEach(function(d){
        addDataToTable(table, d);
    });
}

function addThToTable(table, elm){
    if(table.innerHTML === "") table.innerHTML = "<table><thead></thead></table>";
    var th = table.getElementsByTagName("thead")[0];
    if (th.innerHTML === "") th.innerHTML = "<tr></tr>"
    else th.querySelector("tr").innerHTML += "<th>"+ elm +"</th>";
}

function addDataToTable(table, data){
    if(!table.querySelector("tbody")) table.innerHTML += "<tbody></tbody>";
    var tbody = table.querySelector("tbody");
    tag = "<tr>";
    Object.keys(data).forEach(function(d){
        if (d === "id") return;
        if(typeof data[d] === "string") tag += "<td>"+data[d]+"</td>";
        else tag += "<td>"+arrayToList(data[d])+"</td>"
    });
    tag += "<tr>"
    tbody.innerHTML += tag;
}

function arrayToList(array){
    var list = "<ul>";
    array.forEach(function(arr){
        list += "<li>"+arr+"</li>";
    })
    list += "</li>";
    return list;
}

function erroLoading(){};