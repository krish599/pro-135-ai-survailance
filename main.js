objectDetector = "";


var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
img = "";
objects = [];
status = "";
function setup(){
 canvas = createCanvas(380,380);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();

}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
     console.log("Model Loaded !");
     status = true;
     
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
     console.log(results);
     objects = results;
     input = document.getElementById("answerse").value;
}
function speak(){
    var synth = window.speechSynthesis;
    found = "found";
    speak_data =  input + found;
   
    var  utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}
function not_speak(){
    var synth = window.speechSynthesis;
    found = " not   found";
    speak_data =  input + found;
   
    var  utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}
function draw(){
     image(video, 0 ,0 , 380,380);

     if(status != ""){
         objectDetector.detect(video, gotResult);
           r = random(255);
           g = random(255);
           b = random(255);
        
         for (var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of  Object Detected are :" + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%"  ,objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
             detect = objects[i].label.toLowerCase();
            if( detect == input ){
               document.getElementById("found").innerHTML = input + "" + found;
                speak();
             }
             if(( detect != input )) {
             document.getElementById("found").innerHTML = input +"not" + found;
             console.log(objects[i].label);
             console.log(input);
             not_speak();
             }
             
             }
             }
            }