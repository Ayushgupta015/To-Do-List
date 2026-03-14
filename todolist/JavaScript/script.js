"use strict"
const taskList = document.getElementById('taskList');
const input = document.getElementById('taskInput');
const description=document.getElementById('Description');
function addTask(){
    try{
    const task = input.value.trim() ;
    const desc=description.value.trim();
    if(task==="" && desc===""){
        alert("Enter your Task and Description");
        return; 
    }

    if(task===""){
        alert("Enter your task");
        return;
    }

    if(desc===""){
        alert("Enter your Description");
        return;
    }

    //Local Storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask={
      task: task,
      desc: desc
    };
    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    //Session Storage
    // if(task!==''){
    //    let tasks=JSON.parse(sessionStorage.getItem("Task-Input"))|| [];
    //    tasks.push(task);
    //    sessionStorage.setItem("Task-Input",JSON.stringify(tasks));
    // }

    // if(desc!==''){
    //    let descs=JSON.parse(sessionStorage.getItem("Description-Input"))|| [];
    //    descs.push(desc);
    //    sessionStorage.setItem("Description-Input",JSON.stringify(descs));
    // }



    const li = document.createElement('li');
    li.innerHTML=`<div><strong>${task}</strong><br>${desc}</div>`;
    taskList.appendChild(li);
    deleteTask(li,tasks.length-1);
    input.value="";
    description.value="";
   }catch(error){
      console.log(error);
   }
}


function deleteTask(list,index){
    const deleteBtn=document.createElement('button');
    const iconImage=document.createElement('img');
    iconImage.src="assets/trash_9915690.png";
    deleteBtn.className="Delete";
    deleteBtn.appendChild(iconImage);
    list.appendChild(deleteBtn);
    deleteBtn.onclick=function(){
        try{
        list.remove();
        const tasks=JSON.parse(localStorage.getItem("tasks"))|| [];

        tasks.splice(index,1);
        
        localStorage.setItem("tasks",JSON.stringify(tasks)) ;
        }catch(error){
            console.log(error);
        }

    }
}

window.onload = function(){
   
   try{
   const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   tasks.forEach((item,index) => {
      const li=document.createElement('li');
      li.innerHTML=`<div><strong>${item.task}</strong><br>${item.desc}</div>`;
      taskList.appendChild(li);
      deleteTask(li,index);
   });
   } catch(error){
       console.log(error);
   } 
}

