const startingMinutes=3;
let time=startingMinutes*60;
const countdownMin=document.getElementById('min');
console.log(countdownMin);
const countdownSec=document.getElementById('sec');
var tid=setInterval(updateCountdown,1000);
function updateCountdown()
{
    const minutes=Math.floor(time/60);
    let seconds=time % 60;
    seconds=seconds<10 ? '0' + seconds : seconds;
    countdownMin.innerHTML=minutes;
    countdownSec.innerHTML=seconds;
    time--;
    if (time < 0) {                  
        clearInterval(tid);  // time ends we can change the number  
        alert("시간 초과 게임종료!!");
        window.open('about:blank', '_self').close();
        }       
}

