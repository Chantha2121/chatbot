// script.js

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Display user's message
    displayMessage(userInput, "user");

    // Simulate bot response
    var botResponse = getBotResponse(userInput);
    setTimeout(() => {
        displayMessage(botResponse, "bot");
    }, 1000);

    // Clear the input
    document.getElementById("user-input").value = "";
}

function displayMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.className = "message " + sender;
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase().trim();
    const words = input.split(" ");
    
    // Check for encryption command
    if (words[0] === "encrypt" && words.length === 3) {
        const textToEncrypt = words[1];
        const shift = parseInt(words[2]);
        if (!isNaN(shift)) {
            return encryptCaesarCipher(textToEncrypt, shift);
        } else {
            return "Invalid shift value. Please provide a number.";
        }
    }

    // Simple bot responses for demonstration
    const responses = {
        "hi": "Hello!",
        "how are you": "I'm a bot, so I'm always good.",
        "bye": "Goodbye!",
        "thanks": "No problem if you have question please ask me.",
        "thank you": "No problem if you have question please ask me.",
        "do you know cambodia?":"Yes I know. cambodiaCambodia officially the Kingdom of Cambodia is a country in Southeast Asia on the Indochinese Peninsula, spanning an area of 181,035 square kilometres (69,898 square miles), bordered by Thailand to the northwest, Laos to the north, Vietnam to the east, and the Gulf of Thailand to the southwest. The capital and most populous city is Phnom Penh.",
        "សួស្តី":"បាទ​! សួស្តី",
        "តើអ្នកសុខសប្បាយទេ?":"បាទ! ខ្ញុំសុខសប្បាយទេ ចោះអ្នកវិញ។",
        "សុខសប្បាយ":"អូ! ពិតជាល្អណាស់",
    };

    return responses[input] || "I don't understand that.";
}

function encryptCaesarCipher(text, shift) {
    const shiftNormalized = shift % 26;
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/)) {
            const code = text.charCodeAt(i);
            const shiftedCode = ((code - 97 + shiftNormalized + 26) % 26) + 97;
            result += String.fromCharCode(shiftedCode);
        } else {
            result += char;
        }
    }
    return `Encrypted text: ${result}`;
}