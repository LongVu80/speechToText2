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
      const final = document.querySelector("#final");
      const textbox = document.querySelector("#textbox");
      if (!(event.results[i][0].confidence > 0)) continue;
      if (event.results[i].isFinal && event.results[i][0].confidence >= 0.7) {
        final_transcript += event.results[i][0].transcript;
      } 
      else {
        interim_transcript += event.results[i][0].transcript;
      }
      
    final.innerHTML = final_transcript + interim_transcript;
    
    textbox.innerHTML = `<strong class="text-light notranslate">Translation:</strong> <div class="form-control bg-dark text-light text-left" style="border: 1px solid gray; border-radius: 8px;">${final_transcript + interim_transcript}</div>`
    setTimeout(() => {
      speechRecognition.start();
    }, 50);
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
  
} else {
  console.log("Speech Recognition Not Available");
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  
}

document.querySelector('#final').addEventListener('input', function(e){
  document.querySelector('#transl').innerHTML = `<strong class="text-light notranslate">Translation:</strong> <div class="form-control bg-dark text-light" style="border: 1px solid gray; border-radius: 8px;">${e.target.value}</div>`
})

document.querySelector("#translate").addEventListener('click', function(e){
  const textbox = document.querySelector("#textbox");
  const transl = document.querySelector("#transl");
  const google = document.querySelector("#showTranslate");
  const toTranslate = document.querySelector("#toTranslate");
  const translate = document.querySelector("#translate");

  e.preventDefault()
  if(textbox.style.display === "none"){
    textbox.style.display = "block";
  } else {
    textbox.style.display = "none"
  }
  if(transl.style.display === "none"){
    transl.style.display = "block";
  } else {
    transl.style.display = "none";
  }
  
  if(google.style.display === "none"){
    google.style.display = "block";
    toTranslate.innerHTML = `Stop Translate: `
    translate.style.backgroundColor = "#ff4444"
    
  }
  else{
    google.style.display = "none"
    toTranslate.innerHTML = `To Translate: `
    translate.style.backgroundColor = "#4285F4"
  }
 
  
})

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

