//set initial count

let count=0;

//select value and buttons

const value=document.querySelector("#value");
const btns=document.querySelectorAll(".btn");
const body=document.querySelector(".container");

btns.forEach(function(btn){
  btn.addEventListener("click",function(e){
    const btns=e.currentTarget.classList;
    if (btns.contains("decrease")){
      count --;
    } else if (btns.contains("increase")) {
      count ++;
      
    } else{
      count=0;
    }
    if(count>0){
      value.style.color="green";
      body.style.background="#d2f2f2";

    } else if(count===0){
      value.style.color="#222";
      body.style.background="orange";
    }
      
      else if(count<0){
      value.style.color="red";
      body.style.background="yellow";
    }
    
     
    value.textContent=count;  
  });

});
    