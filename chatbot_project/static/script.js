const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;
const micBtn = document.getElementById('micBtn');
const statusEl = document.getElementById('status');
const convo = document.getElementById('conversation');

let recognition;
let active = false;

function speak(text, callback){
  if (synth.speaking) synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.onend = () => callback && setTimeout(callback, 800);
  synth.speak(utter);
}

function addMessage(sender, text){
  const p = document.createElement('p');
  p.innerHTML = `<strong>${sender}:</strong> ${text}`;
  convo.appendChild(p);
  convo.scrollTop = convo.scrollHeight;
}

function startRecognition(){
  if(!SpeechRecognition){
    statusEl.textContent = 'Speech Recognition not supported in this browser.';
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event)=>{
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    addMessage('User', transcript);
    recognition.stop();

    if(!active && transcript.includes('hello')){
      active = true;
      statusEl.textContent = 'Assistant activated. Ask a math question.';
      speak('Hello! I am ready to help you with math.', startRecognition);
      addMessage('Assistant','Hello! I am ready to help you with math.');
    } else if(active){
      processMath(transcript);
    } else {
      speak('Say hello to activate me.', startRecognition);
    }
  };

  recognition.onerror = (event)=>{
    console.error('Error:', event.error);
    if(event.error === "not-allowed"){
      statusEl.textContent = 'Microphone access blocked. Please allow mic permission in your browser.';
      alert("⚠ Microphone access is blocked. Please allow it in browser settings.");
    } else {
      statusEl.textContent = 'Error: ' + event.error;
    }
  };

  recognition.onend = ()=>{
    if(micBtn.classList.contains('mic-on')){
      setTimeout(startRecognition, 500);
    } else {
      statusEl.textContent = 'Microphone turned off.';
    }
  };

  try {
    recognition.start();
    statusEl.textContent = active ? 'Listening for your math question...' : 'Listening for wake word "hello"...';
  } catch (e) {
    console.error("Recognition start error:", e);
    statusEl.textContent = 'Microphone not accessible. Please allow mic access.';
  }
}

async function processMath(text){
  try {
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    });
    const data = await response.json();
    addMessage('Assistant', data.response);
    speak(data.response, startRecognition);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = 'Sorry, there was an error processing your request.';
    addMessage('Assistant', errorMessage);
    speak(errorMessage, startRecognition);
  }
}

micBtn.addEventListener('click', ()=>{
  if(micBtn.classList.contains('mic-off')){
    micBtn.classList.replace('mic-off','mic-on');
    active = false;
    startRecognition();
  } else {
    micBtn.classList.replace('mic-on','mic-off');
    if (recognition) recognition.abort();
    statusEl.textContent = 'Microphone turned off.';
    if (synth.speaking) synth.cancel();
  }
});

function initialGreeting() {
  addMessage('Assistant', 'I will help you with math problems. Say "hello" to begin!');
  const greeting = "Hello! I am your accessible math assistant. Tap the microphone and say 'hello' to begin.";
  speak(greeting, () => {
    statusEl.textContent = 'Tap the mic and say "hello" to start';
  });
}

window.onload = initialGreeting;
