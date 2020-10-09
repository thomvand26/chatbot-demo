// Referenties naar HTML-elementen
const sendBtn = document.querySelector('.chat-send');
const chatInput = document.querySelector('.chat-input');
const chatDisplay = document.querySelector('.chat-display');

// Input van de gebruiker
let inputValue;

// Instantieer de chatbot
let bot = new RiveScript();

initializeBot();

// Initialiseer de chatbot
async function initializeBot() {
    try {
        // Laad het RiveScript bestand
        await bot.loadFile("demo.rive");

        // Verwerk en sorteer de triggers en antwoorden
        bot.sortReplies();

        console.log("De chatbot is geïnitialiseerd!");
    } catch (error) {
        console.log(error);
    }
}

// Voeg een bericht toe aan het chatvenster
function addChat(message, isUser = false) {
    // Maak een nieuw HTML-element
    const element = document.createElement('div');
    
    // Pas de tekst van het element aan
    element.innerText = message;
    
    // Voeg de nodige classes toe
	element.classList.add('chat-message');
    isUser && element.classList.add('chat-message--user');
    
    // Voeg het element toe aan het chatvenster
    chatDisplay.append(element);

    // Scroll naar beneden (naar het laatste bericht)
    chatDisplay.scrollTo({
        top: chatDisplay.scrollHeight,
    });
}

// Verstuur het bericht
async function send() {
    // Stop de functie als er geen input is
    if (inputValue.length < 1) return;

    // Voeg het bericht toe aan het chatvenster
    addChat(inputValue, true);
    
    // Verwerk het bericht door de chatbot en krijg een gepast antwoord
    const reply = await bot.reply('local-user', inputValue);

    // Voeg het antwoord toe aan het chatvenster
    addChat(reply);

    chatInput.value = '';
    inputValue = '';
}

// Luister naar veranderingen van het inputveld
chatInput.addEventListener('input', () => {
    // Verwijder de witruimte van de input en sla deze op
    inputValue = chatInput.value.trim();
});

// Luister naar het klikken op de 'Verstuur'-knop (en het drukken op de Enter-toets)
sendBtn.addEventListener('click', (e) => {
    // Voorkom dat het scherm ververst wordt
    e.preventDefault();

    // Verstuur de opgeslagen input
    send();
});
