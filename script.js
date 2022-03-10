let countSlot; // this holds the Interval that is running currently 

// Buttons
let startPress = document.querySelector('#start'); 
let stopPress = document.querySelector('#stop');
let resetPress = document.querySelector('#reset');

// Basically the length of cards on which we are seeing time
let length = 2;

// This is the NodeList of various shownCards that users see
let currentB  = document.querySelectorAll('.box .current');

// This is the NodeList of various shownCards that users don't see pr I can say that are hidden below the shown cards (basically due to overflow prop of the Box Container)

let nextB  = document.querySelectorAll('.box .next');

// It is simply a counter that continuosly increments like a cycle till reset is not clicked basically helps in finding the condition where we reaches maximum  
let countr=0;

// triggering of various events/button clicking
startPress.addEventListener('click',startCounter);
stopPress.addEventListener('click',stopCounter);
resetPress.addEventListener('click',resetVal);
 
// Main Logic for counting
function startCounter(event){
   
   clearInterval(countSlot);       //Did this to remove the previous Interval
   
  countSlot = setInterval(function(){
     console.log("Inside strtCounter");   
     if(countr==3599){ // Basically added a condition to throw an alert when the stopwatch show 59min : 59sec :) :)
        alert(" Max Capacity Reached ");
        clearInterval(countSlot);
        window.location.reload ();
        return; 
     }
     increment(currentB,nextB,1);   //Increment function called to increase the card value 
     countr++; 
   },1000);
}

//resetting the values 
function resetVal(){
  console.log('RESET CLICKED!!!');
        clearInterval(countSlot);
        window.location.reload ();
        return; 
}

// incrementing the values of the stopwatch
function increment(currentB,nextB,index){
   
   if(currentB[index].innerText==59){   //when the current card show 59sec it means 1 min is complete
       console.log("going ahead");
       increment(currentB,nextB,index-1); //so called increment on index-1
   }
    
   nextB[index].classList.add('animated');  //check this class in CSS file it add transition to the card
   setTimeout(function(){
   currentB[index].innerText = nextB[index].innerText;
   nextB[index].classList.remove('animated');
   nextB[index].innerText = (parseInt(nextB[index].innerText) + 1)%60;
   },500);
}

//stopping the counter 
function stopCounter(event){
  console.log('Inside STOP');
  clearInterval(countSlot); //just cleared the current Interval in order to stop the function
  return;
}