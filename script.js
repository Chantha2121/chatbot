function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Display user's message
    displayMessage(userInput, "user");

    // Simulate bot response
    var botResponse = getBotResponse(userInput);
    typeMessage(botResponse, "bot");

    // Clear the input
    document.getElementById("user-input").value = "";
}

function displayMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.className = "message " + sender;

    var imgElement = document.createElement("img");
    imgElement.src = sender === "user" ? "./user.png" : "./chatbot.png";

    var textElement = document.createElement("div");
    textElement.className = "text";

    // Split message by new lines and create new div for each line
    const messageLines = message.split("\n");
    messageLines.forEach((line) => {
        const lineElement = document.createElement("div");
        lineElement.innerText = line;
        textElement.appendChild(lineElement);
    });

    messageElement.appendChild(imgElement);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase().trim();
    const words = input.split(",");

    // Check for encryption command
    if (words[0] === "encrypt" && words.length === 5) {
        const textToEncrypt = words[1];
        const p = parseInt(words[2]);
        const q = parseInt(words[3]);
        const e = parseInt(words[4]);
        if (!isNaN(p) && !isNaN(q) && !isNaN(e)) {
            return encryptTextToNumbers(textToEncrypt, p, q, e);
        } else {
            return "Invalid values. Please provide two prime numbers and the public exponent.";
        }
    }

    // Check for decryption command
    if (words[0] === "decrypt" && words.length === 5) {
        const numbersToDecrypt = words[1].split(" ").map(Number);
        const p = parseInt(words[2]);
        const q = parseInt(words[3]);
        const e = parseInt(words[4]);
        if (!isNaN(p) && !isNaN(q) && !isNaN(e)) {
            return decryptNumbersToText(numbersToDecrypt, p, q, e);
        } else {
            return "Invalid values. Please provide two prime numbers and the public exponent.";
        }
    }

    // Simple bot responses for demonstration
    const responses = {
        "hi": "Hello!",
        "how are you": "I'm a bot, so I'm always good.",
        "bye": "Goodbye!",
        "thanks": "No problem if you have questions, please ask me.",
        "thank you": "No problem if you have questions, please ask me.",
        "do you know cambodia?": "Yes, I know.\nCambodia, officially the Kingdom of Cambodia, is a country in Southeast Asia on the Indochinese Peninsula, spanning an area of 181,035 square kilometers (69,898 square miles), bordered by Thailand to the northwest, Laos to the north, Vietnam to the east, and the Gulf of Thailand to the southwest. The capital and most populous city is Phnom Penh.",
        "សួស្តី": "បាទ​! សួស្តី",
        "តើអ្នកសុខសប្បាយទេ?": "បាទ! ខ្ញុំសុខសប្បាយទេ ចោះអ្នកវិញ។",
        "សុខសប្បាយ": "អូ! ពិតជាល្អណាស់",
    };

    return responses[input] || "I don't understand that.";
}

// Function to compute the modular inverse
function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;

    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;

        // phi is remainder now, process same as Euclid's algo
        phi = e % phi;
        e = t;
        t = x0;

        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0) x1 += m0;

    return x1;
}

function encryptTextToNumbers(text, p, q, e) {
    const n = p * q;
    const encrypted = text.split("").map(char => {
        const asciiValue = char.charCodeAt(0);
        return modExp(asciiValue, e, n);
    }).join(" ");
    return `Encrypted text: ${encrypted}`;
}

function decryptNumbersToText(numbers, p, q, e) {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const d = modInverse(e, phi);
    const decrypted = numbers.map(num => {
        const decryptedAscii = modExp(num, d, n);
        return String.fromCharCode(decryptedAscii);
    }).join("");
    return `Decrypted text: ${decrypted}`;
}

// Function to perform modular exponentiation
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function typeMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.className = "message " + sender;

    var imgElement = document.createElement("img");
    imgElement.src = sender === "user" ? "./user.png" : "./chatbot.png";

    var textElement = document.createElement("div");
    textElement.className = "text";
    
    messageElement.appendChild(imgElement);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);

    let index = 0;
    function typeNextLetter() {
        if (index < message.length) {
            let char = message[index];
            if (char === "\n") {
                textElement.appendChild(document.createElement("br"));
            } else if (char === " ") {
                textElement.innerHTML += "&nbsp;";
            } else {
                textElement.innerHTML += char;
            }
            index++;
            setTimeout(typeNextLetter, 50); // Adjust typing speed here
        } else {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
    typeNextLetter();
}
