//necessary DOM objects
var butt = document.getElementById('but');
var score = document.querySelector('#score h2');
var div = document.getElementById('message');
var aud = document.createElement('audio');

//initail button width and height
var btnwdth = 300;   
var btnhgt = 300;   

//score of the user
var intscore = 0;

//initially buttton moves every half a second (400 millisecond)
var interval = 400; 

//random co-ordinates for the button
var t = (Math.random() * (window.innerHeight - btnhgt - 5));   
var le = (Math.random() * (window.innerWidth - btnwdth - 5)); 

//initially the button makes down right movement
var up = false; 
var left = false; 


aud.src = "audio/angry.mp3";
aud.setAttribute("loop", "true");

//display the current score and the button
score.innerHTML = "your score is: " + intscore;
butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + t +"px;" + "left:" + le +"px;");

//calling the function that makes the dynamics for the button
setInterval(play,interval, butt);

butt.onclick = levelLogic;

//function responsible for the movement of the button
function play(obj)
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
    obj.style.top = t > innerHeight - btnhgt? (innerHeight - btnhgt) + "px" : t + "px";
    obj.style.left = le > innerWidth - btnwdth ? (innerWidth - btnwdth) + "px" : le +"px";

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

function levelLogic(){
    intscore++;
    score.innerHTML = "your score is: " + intscore;
    var congrats = document.createElement('h1');
    congrats.classList.add("congrats");
    congrats.innerHTML = "Congratulations You passed this stage press this text to proceed,<br> be aware it gets harder as you proceed";
    congrats.style.height = "-2.5vw";
    congrats.style.fontSize = "3em";
    //play the worst music of all time
    if(intscore == 5){
        aud.play()
    }
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
        if(intscore >= 10 && intscore <= 15)
        {
            butt.onmouseover = function(){
                butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + (t + 5) +"px;" + "left:" + (le - 5) +"px;");
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
            butt.onmouseover = function(){
                butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + (t + 20) +"px;" + "left:" + (le - 20) +"px;");
            }
            interval = 100;
        }
        if(intscore == 10){
            butt.classList.replace("location", "image-anger");
            butt.innerHTML = "";
        }

        //interval is cleared here to put the new interval for the new difficulty of the game which should be less than the previous value(faster movement)
        clearInterval();

        t = (Math.random() * (window.innerHeight - btnhgt - 5));
        le = (Math.random() * (window.innerWidth - btnwdth- 5));
        
        //reduce the button size and appear in a random place on the screen
        butt.setAttribute("style", "width:"+btnwdth+"px;"+"height:"+btnhgt+"px;" + "top:" + t +"px;" + "left:" + le +"px;");

        setInterval(play, interval, butt);

    }
}
