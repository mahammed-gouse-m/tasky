const taskContainer = document.querySelector(".task__container");

let globalStore = [];


const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4">
                <div class="card text-center">
                    <div class="card-header d-flex justify-content-end gap-2">
                        <button type="button" id=${taskData.id} class="btn btn-outline-success" onclick="editCard.apply(this, arguments)">
                        <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" id=${taskData.id}  onclick="deleteCard.apply(this, arguments)" >
                         <i class="fas fa-trash-alt" id=${taskData.id}  onclick="deleteCard.apply(this, arguments)" ></i>
                        </button>
                    </div>
                    <img src=${taskData.imageUrl}
                    class="card-img-top"
                     alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${taskData.taskTitle}</h5>
                      <p class="card-text">${taskData.taskDescription}</p>
                      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                    </div>
                    <div class="card-footer text-muted">
                        <button type="button" class="btn btn-outline-primary float-end">Open Task
                        </button>
                    </div>
                </div>
</div>
 `;

const loadInitialCardData = () => {

    const getCardData = localStorage.getItem("tasky");
    const {cards} = JSON.parse(getCardData);

    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        globalStore.push(cardObject);
   
    })

}





const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,//unique number for id 1235445587855
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };  

  taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem ("tasky", JSON.stringify({cards:globalStore}));

};

const deleteCard = (event) => {
    event=window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName; //button;
    


 globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
 localStorage.setItem ("tasky", JSON.stringify({cards:globalStore}));

    if(tagname =="BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};

const editCard = (event) => {
    event=window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname === "Button"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }
    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1]
    console.log(taskTitle);
    console.log(taskDescription);
    console.log(taskType);

    taskTitle.setAttribute("contentEditable", "true");
    taskDescription.setAttribute("contentEditable", "true");
    taskType.setAttribute("contentEditable", "true");
    submitButton.innerHTML ="save Changes"
};