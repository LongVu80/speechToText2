if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").innerHTML = `Sorry, this Web Platform does not support Google Speech Regconition. Please use keyboard microphone. With keyboard microphone, you can even use your native language.`;
    
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").innerHTML = `Speech Recognition is off due to no activity or Stop. Please press Start button again.`
  };


  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (!(event.results[i][0].confidence > 0)) continue;
      if (event.results[i].isFinal && event.results[i][0].confidence >= 0.7) {
        final_transcript += event.results[i][0].transcript;
      } 
      else {
        interim_transcript += event.results[i][0].transcript;
      }
      console.log(document.querySelector("#final").innerHTML = final_transcript + interim_transcript)
    // document.querySelector("#interim").innerHTML = interim_transcript;
    document.querySelector("#final").innerHTML = final_transcript + interim_transcript;
    document.querySelector("#textbox").innerHTML = final_transcript + interim_transcript
    
  };
  };

  document.querySelector("#start").onclick = () => {
      speechRecognition.start();
    // this.openFullscreen()
    document.querySelector("#status").innerHTML =`Voice Recognition is on`
  };

  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
    document.querySelector("#status").innerHTML =`Press the Start Button`
    // this.closeFullscreen()
  };

  document.querySelector("#clear").onclick = () => {
    
    document.querySelector("#final").innerHTML =""
    location.reload()
  };
  document.querySelector('#textbox').addEventListener('change', function(e){
  final_transcript = e.target.elements.final.value
})
} else {
  console.log("Speech Recognition Not Available");
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}



// var elem = document.documentElement;
// function openFullscreen() {
//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.webkitRequestFullscreen) { /* Safari */
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) { /* IE11 */
//     elem.msRequestFullscreen();
//   }
// }

// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) { /* Safari */
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) { /* IE11 */
//     document.msExitFullscreen();
//   }
// }

