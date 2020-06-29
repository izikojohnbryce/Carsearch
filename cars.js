const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
// const images = [{"BMW":"https://www.bmw.co.il/content/dam/bmw/common/all-models/x-series/x7/2018/Navigation/bmw-x7-modelfinder-890x501.png"},
// {"MRCDS": "https://www.cartube.co.il/images/stories/benz/A-class/2018/mercedes-benz_a_180_d_amg_line_9-970px.jpg"}, 
// {"Mazda": "https://media.carzone.co.il/eyJidWNrZXQiOiJjYXJ6b25lLW1lZGlhIiwia2V5IjoiY2Fycy9NYXpkYS9NYXpkYS1DWC0zLUNyb3Nzb3Zlci01ZG9vcnMvMS4xLzViZjU4YWQwLTdlNzYtMTFlOS1hMDI1LWUxODU1YTBjODY0MS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjE5MjB9fX0="},
//  {"Subaro": "https://images.auto.co.il/Attachment/Gallery/1629/1626640/Subaru-Outback-2015.png?height=402"}];
const DOM = {}


// function getImag(carData)  {
//     if(carData.type==="Mazda"){
//                return  "https://media.carzone.co.il/eyJidWNrZXQiOiJjYXJ6b25lLW1lZGlhIiwia2V5IjoiY2Fycy9NYXpkYS9NYXpkYS1DWC0zLUNyb3Nzb3Zlci01ZG9vcnMvMS4xLzViZjU4YWQwLTdlNzYtMTFlOS1hMDI1LWUxODU1YTBjODY0MS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjE5MjB9fX0=";
//              }else if(carData.type==="BMW"){
//                 return "https://www.bmw.co.il/content/dam/bmw/common/all-models/x-series/x7/2018/Navigation/bmw-x7-modelfinder-890x501.png";
//              }else if(carData.type==="Subaro"){
//                 return "https://images.auto.co.il/Attachment/Gallery/1629/1626640/Subaru-Outback-2015.png?height=402";
//              }
//              else if(carData.type==="MRCDS"){
//                 return "https://www.cartube.co.il/images/stories/benz/A-class/2018/mercedes-benz_a_180_d_amg_line_9-970px.jpg";
//              }
//              else return ;
//     }


const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getTableItem,
};
console.log(displayFunctions)


function generateCars(numberOfCars, isArray) { //return array with Cars ( each car is an object in JS)
    if (typeof numberOfCars !== 'number') return;
    const cars = isArray ? [] : {};
    for (let index = 0; index < numberOfCars; index++) {
        if (isArray) cars.push(generateSingleCar(index))
        else {
            const singleCar = generateSingleCar(index)
            cars[singleCar.lp.toString()] = singleCar;
        }
    }
    return cars;
}

function generateSingleCar(index) {
    return {
        lp: _generateLP(),
        color: _generateColor(),
        type: _generateType(),
        doors: _generateDoors(),
        isSunRoof: _isSunRoof(index)
    };


    function _generateLP() {
        return Math.ceil(Math.random() * 999999);
    }
    function _generateColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function _generateDoors() {
        return doors[Math.floor(Math.random() * doors.length)];
    }
    function _isSunRoof(index) {
        return index % 2 === 0 ? true : false
    }
    function _generateType() {
        return types[Math.floor(Math.random() * types.length)];
    }

}


// array [....]
// filter - filter by boolean statment
// find - like filter but exactly one, the first one.
// findIndex - exactly like find, but return only the index.
// map - return partial result
// reduce - next time..


(function () {
    const cars = generateCars(10000, true)
    DOM.listData = document.getElementById("data");
    DOM.cardsData = document.getElementById("data-cards");
    DOM.tableData = document.getElementById("dataTable");
    draw(cars, DOM.tableData, "table");

    const listViewButton = document.getElementById("listView");
    const cardViewButton = document.getElementById("cardView");
    const tableViewButton = document.getElementById("tableView");
    listViewButton.addEventListener("click", function () {
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        draw(cars, DOM.cardsData, "cards")
    })
    tableViewButton.addEventListener("click", function () {
        draw(cars, DOM.tableData, "table")
    })
}())





function draw(data, domContainer, displayType) {
    clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    data.forEach(car => {
        domContainer.append(displayFunction(car))
    });
}

function clearDOM() {
    DOM.listData.innerHTML = "";
    DOM.cardsData.innerHTML = "";
    DOM.tableData.innerHTML = "";
}

const textInput = document.querySelector("#textInput")
const search=document.querySelector("#search")
search.addEventListener("click", function(){
    clearDOM()
   if (types.find(o => o === textInput.value)){
   getCardItem()
   }
    
})

function getListItem(carData) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
    return listItem;
}

function getTableItem(carData) {
  
    
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerText=` ${carData.lp}`
    tr.appendChild(td);
    const td1 = document.createElement("td");
    td1.innerText=` ${carData.color}`
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    td2.innerText=` ${carData.type}`
    tr.appendChild(td2);
    const td3 = document.createElement("td");
    td3.innerText=` ${carData.doors}`
    tr.appendChild(td3);
    const td4 = document.createElement("td");
    td4.innerText=` ${carData.isSunRoof}`
    tr.appendChild(td4);
    
    const th = document.createElement("th")
    th.scope="col"
    tr.appendChild(th)

    return tr;
}

// table class="table">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">First</th>
//       <th scope="col">Last</th>
//       <th scope="col">Handle</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//     <tr>
//       <th scope="row">2</th>
//       <td>Jacob</td>
//       <td>Thornton</td>
//       <td>@fat</td>
//     </tr>
//     <tr>
//       <th scope="row">3</th>
//       <td>Larry</td>
//       <td>the Bird</td>
//       <td>@twitter</td>
//     </tr>
//   </tbody>
// </table>




function getCardItem(carData) {
    const card = document.createElement("div");
    card.className="card";
    card.style.width = "18rem";
    const cardImg = document.createElement("img");
    cardImg.className="card-img-top";
        if(carData.type==="Mazda"){
            cardImg.src= "https://media.carzone.co.il/eyJidWNrZXQiOiJjYXJ6b25lLW1lZGlhIiwia2V5IjoiY2Fycy9NYXpkYS9NYXpkYS1DWC0zLUNyb3Nzb3Zlci01ZG9vcnMvMS4xLzViZjU4YWQwLTdlNzYtMTFlOS1hMDI1LWUxODU1YTBjODY0MS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjE5MjB9fX0="
         }else if(carData.type==="BMW"){
            cardImg.src= "https://www.bmw.co.il/content/dam/bmw/common/all-models/x-series/x7/2018/Navigation/bmw-x7-modelfinder-890x501.png"
         }else if(carData.type==="Subaro"){
            cardImg.src= "https://images.auto.co.il/Attachment/Gallery/1629/1626640/Subaru-Outback-2015.png?height=402"
         }
         else if(carData.type==="MRCDS"){
            cardImg.src= "https://www.cartube.co.il/images/stories/benz/A-class/2018/mercedes-benz_a_180_d_amg_line_9-970px.jpg"
         }
       
    
         card.appendChild(cardImg);
    const cardbody = document.createElement("div");
    cardbody.className="card-body";
    card.appendChild(cardbody);
    const cardP = document.createElement("div");
    cardP.className="card-text"
    cardP.innerText = `car lp: ${carData.lp}, car color: ${carData.color} , car type ${carData.type}`;
    cardbody.appendChild(cardP);
    return card;
}









