//necessary DOM objects
var butt = document.getElementById('but');
var score = document.querySelector('#score h2');
var div = document.getElementById('message');

//initail button width and height
var btnwdth = 300;   
var btnhgt = 300;    
//score of the user
var intscore = 0;    
//initially buttton moves every half a second (400 millisecond)
var interval = 400;  
//random co-ordinates for the button
var t = (Math.random() * (window.innerHeight - btnhgt));   
var le = (Math.random() * (window.innerWidth - btnwdth)); 
//initially the button makes down right movement
var up = false; 
var left = false; 

//display the current score and the button
score.innerHTML = "your score is: " + intscore;
butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + t +"px;" + "left:" + le +"px;");

//calling the function that makes the dynamics for the button
setInterval(play,interval);

butt.onclick = function(){
    intscore++;
    score.innerHTML = "your score is: " + intscore;
    var congrats = document.createElement('h1');
    congrats.innerHTML = "Congratulations You passed this stage press this text to proceed,<br> be aware it gets harder as you proceed";
    
    // remove the button and show a congratulations message
    div.replaceChild(congrats, butt);
    congrats.onclick = function(){
        //start the next difficulty
        div.replaceChild(butt, congrats);
        if(btnwdth > 40){
            btnwdth -= 50;
        }
        if(btnwdth < 40){
            btnwdth = 40;
        }
        if(btnhgt > 40)
        {
            btnhgt -= 50;
        }
        if(btnhgt < 40){
            btnhgt = 40;
        }
        if(intscore >= 10)
        {
            butt.onmouseover = function(){
                butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + (t + 10) +"px;" + "left:" + (le - 30) +"px;");
            }
            if(interval > 170){
                interval -= 100;
            }
            if(interval < 170)
            {
                interval = 170;
            }
                
        }
        if(intscore > 15){
            interval = 150;
        }

        //interval is cleared here to put the new interval for the new difficulty of the game which should be less than the previous value(faster movement)
        clearInterval();

        t = (Math.random() * (window.innerHeight - btnhgt));
        le = (Math.random() * (window.innerWidth - btnwdth));
        
        //reduce the button size and appear in a random place on the screen
        butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + t +"px;" + "left:" + le +"px;");

        setInterval(play, interval);

    }
}

//function responsible for the movement of the button
function play()
{
    if(up)
    {
        t -=  intscore > 15 ? Math.random() * 10 : 10;
    }
    else{
        t +=  intscore > 15 ? Math.random() * 10 : 10;
    }
    if(left)
    {
        le -= intscore > 15 ? Math.random() * 10 : 10;        
    }
    else{
        le += intscore > 15 ? Math.random() * 10 : 10;
    }

    //apply the new location for the button
    butt.style.top = t + "px";
    butt.style.left = le +"px";


    //those if statements are responsible for the direction of the movement
    if(t <= 0){
        up = false;
    }
    else if(t >= innerHeight - btnhgt){
        up = true;
    }

    if(le <= 0){
        left = false;
    }
    else if(le >= innerWidth - btnwdth){
        left = true;
    }

}