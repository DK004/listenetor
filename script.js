let download = document.getElementById('download');
var speechRecog = window.webkitSpeechRecognition;
var recognition = new speechRecog();

var textbox = $('#textbox');
var instruct = document.getElementById('instruct');

var content = '';

recognition.continuous = true;

recognition.onstart  = function(){
    instruct.classList = 'alert alert-success my-3'
    instruct.innerText = "Voice-Regonition is ON. Please speak! Click Stop to stop.";
}


recognition.onresult = function(event){
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    content += transcript;
    textbox.val(content)
}


var startbtn = document.getElementById('start');

startbtn.addEventListener('click',function(){
    if(content.length){
        content += '';
    }
    recognition.start();
    // startbtn.innerText ='Stop';
    // startbtn.classList = 'btn btn-outline-danger mx-5';
    startbtn.style.display='none';
    stopbtn.style.display = 'inline-block';
})


var stopbtn = document.getElementById('stop');

stopbtn.addEventListener('click', function(){
    startbtn.style.display = 'inline-block';
    stopbtn.style.display = 'none';
    
    instruct.classList = 'alert alert-warning my-3'
    instruct.innerText="Recognition has stopped! Press start."
    recognition.stop();
    if(content != ""){
        download.style.display='inline-block';
    
    }
});


// taking content from textarea
textbox.on('input', function(){
    content = $(this).val();
})








// saving file
download.addEventListener('click', function(){
   var blob = new Blob([content],
    {type: "text/plain;charset-utf8"}
   );
   saveAs(blob,"Lisenetor-file.txt");

});

