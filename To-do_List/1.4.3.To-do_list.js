function AddTask(){
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
     // here input.value.trim() - heer input is a variable that holds the value of input element in html,
     //.value is a property in JS that is used to get the value that is entered by user.
     //trim is used to remove spaces from starting and end of string so our code doesn't mistake spaces-only as a valid task 


    if(taskText === ""){
    alert("Please enter a task!")  
    return;
    }
    // If the user press Add button without typing anything this will show a popup alert on screen.
    
    let li = document.createElement("li");
    li.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn"

    deleteBtn.onclick= function (){
        li.remove();
    };

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);

    input.value="";


}