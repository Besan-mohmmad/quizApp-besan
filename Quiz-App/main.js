// quiz Questions
const quizQuestions=[
    {
        id:"0",
        question: "Everything in JavaScript is...",
        a :" primitive or object",
        b : "function or object",
        c : "only objects",
        d  : "number or object",
        correct : "a",  
    },
    {
        id:"1",
        question : "What is the value of `num`? const num = parseInt('7*6', 10);",
        a  :"42",
        b : "24",
        c : "7",
        d : "NaN",
        correct : "c", 
    },
    {
        id:"2",
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        id:"3",
        question : "inside which html element do we put the javascript",
        a  :"javaacript",
        b : "js",
        c : "scripiting",
        d: "script",
        correct : "d", 
    },
    {
        id:"4",
        question : "The first page of a website is called _____.",
        a :"  Design page",
        b: " Home page",
        c: " Front page",
        d: "Main page",
        correct : "b", 
    },
    {
        id:"5",
        question : "The Head tag is used for?",
        a :" Writing CSS styles",
        b  : " Writing Javascript",
        c : "Including CSS and JS files",
        d : " All the answers are true ",
        correct : "d", 
    },
    {
        id:"6",
        question : " What are the three phases of event propagation?",
        a :" Target > Capturing > Bubbling",
        b : "Bubbling > Target > Capturing",
        c  : "Capturing > Target > Bubbling ",
        d : "Target > Bubbling > Capturing",
        correct : "c", 
    },
    {
        id:"7",
        question : " What's the output? console.log(3 + 4 + '5');",
        a  :"'345'",
        b  : "'75'",
        c  : "12",
        d  : "'12'",
        correct : "b", 
    },
    {
        id:"8",
        question:" What's its value? console.log('❤️' === '❤️');" ,
        a  :" true",
        b : "false",
        correct:"a", 
    },

    {
        id:"9",
        question: "How We Specify Document Type Of HTML5 Page",
        a: "<DOCTYPE html>",
        b: "<DOCTYPE html5>",
        c: "<!DOCTYPE html5>",
        d: "<!DOCTYPE html>",
        correct: "d"
      },
];


const start=document.getElementById('start');
const fname=document.getElementById('fname');
const errorName=document.getElementById('Errorname');
const startBtn=document.getElementById('startBtn'); 
const leaderBtn=document.getElementById('Leaderbtn');
const container= document.getElementById('container');
const timer = document.getElementById('timer');
const questionId=document.getElementById('question');
const inputs =document.querySelectorAll('.answer'); 
const txt_a=document.getElementById('txt_a');
const txt_b=document.getElementById('txt_b');
const txt_c=document.getElementById('txt_c');
const txt_d=document.getElementById('txt_d');
const next=document.getElementById('next');
const leaderboard = document.getElementById('leaderboard');

// start  
startBtn.addEventListener('click' , (event)=>{
    event.preventDefault();
    let userName= fname.value;
    if(userName === ""){
        errorName.textContent="* Enter Your Name";
        errorName.style.color="red";
    }
    else{
        errorName.textContent='';
        container.style.display ='flex';
        start.style.display='none';
       
        }
});


let currentQustions= 0;
let score =0 ;


const questionCounter=[];
while(questionCounter.length < 10){
 const questionIndex = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    
 if(!questionCounter.includes(questionIndex)) {
    questionCounter.push(questionIndex);
    }
}

startGame();
function startGame() {
    uncheckedAnswer();
    const currentQuestionData = questionCounter[currentQustions];
    questionId.innerText= currentQuestionData.question;
    txt_a.innerText =currentQuestionData.a;
    txt_b.innerText =currentQuestionData.b;
    txt_c.innerText =currentQuestionData.c;
    txt_d.innerText =currentQuestionData.d;
    if(currentQustions === 10){
        next.textContent ="submit";
    }
}

function uncheckedAnswer() {
    inputs.forEach(inputs => (inputs.checked = false));
}


function  checkedAnswer() {
    let answer;
    inputs.forEach(inputs => {
        if (inputs.checked){
            answer =inputs.id;
        }
    });
    return answer;
}

next.addEventListener('click' , () => {
    const answer =checkedAnswer();
    if (answer){
        if (answer === questionCounter[currentQustions].correct){
            score++; 
        }
        currentQustions++;

        timer.textContent=`${currentQustions + 1}/10`;
        if (currentQustions < questionCounter.length){
            startGame();

        } 
        else {
            resultScore(fname.value, score);       
            start.style.display ='none';
            container.style.display='none';
            leaderboard.style.display ="flex";
            leaderboardtable();
            
        }
    }
});



function  resultScore(username , score ){
    localStorage.setItem('data' ,JSON.stringify(quizQuestions));
    localStorage.setItem('questions' ,JSON.stringify(questionCounter));
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (!leaderboard){
        leaderboard =[];
    }
    const outUser =leaderboard.find((enterr) => enterr.username === username);
    if (outUser){
        outUser.score = score ;
    } else {
        leaderboard.push({ username, score});
    }
    localStorage.setItem('leaderboard' , JSON.stringify(leaderboard));
}

leaderBtn.addEventListener('click' , ()=>{
    start.style.display ='none';
    container.style.display='none';
    leaderboard.style.display ="flex";
    leaderboardtable();
})


function leaderboardtable(){
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    const leaderBoardBody = document.getElementById('leaderboard-body');
    if(leaderboard && leaderboard.length > 0 ) {
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.forEach((enterr) => {
            const row = document.createElement('tr');
            const user = document.createElement('td');
            const resultt = document.createElement('td');

            user.textContent = enterr.username;
            resultt.textContent =enterr.score;
            row.appendChild(user);
            row.appendChild(resultt);
            leaderBoardBody.appendChild(row);
        });
    }
    
}

   