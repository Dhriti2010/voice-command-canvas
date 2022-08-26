x=0;
y=0;
screenwidth=0;
screenheight=0;
drawapple="";
apple="";
speakdata="";
tonumber=0;
function preload(){
    apple=loadImage("apple.png");
}
var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();
function start(){
    document.getElementById("status").innerHTML="system is listening. please speak.";
    recognition.start();
}
recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;
    document.getElementById("status").innerHTML="The speech has been recognised as: "+content;
    tonumber=Number(content);
    if(Number.isInteger(tonumber)){
        document.getElementById("status").innerHTML="Started drawing apple.";
        drawapple="set";
    }
    else{
        document.getElementById("status").innerHTML="The speech has not recognised the number.";
    }

}
function setup(){
    screenwidth=window.innerWidth;
    screenheight=window.innerHeight;
    canvas=createCanvas(screenwidth,screenheight-150);
    canvas.position(0,150);
}
function draw(){
    if(drawapple=="set"){
        for(var i=1; i<=tonumber;i++){
            x=Math.floor(Math.random()*700);
            y=Math.floor(Math.random()*500);
            image(apple, x,y,50, 50);
        }
document.getElementById("status").innerHTML=tonumber+" apples drawn";
speakdata=tonumber+" apples drawn";
speak();
drawapple="";
    }
}
function speak(){
    var synth=window.speechSynthesis;
    utterthis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterthis);
    speakdata="";
}