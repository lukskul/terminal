import { Terminal } from '@xterm/xterm';

var term = new Terminal();
term.open(document.getElementById('terminal'));

term.writeln('Xterm System Security Interface');
term.writeln('Version 4.0.5, Alpha E');
term.writeln('Ready...');

var inputBuffer = ''; // Buffer to store user input

// Define the keywords variable with the JSON data
var keywords = {
  "help": "about /n contact",
  "about": "Show information about the application",
  "contact": "Contact support", 
  "access": "access: PERMISSION DENIED only higher level administrator access",
  "access main security grid": "This command should break the terminal",
  "clear": "Clears the Terminal."
  // Add more keywords as needed
};

// Add event listener for key presses
term.onKey(e => {
  if (e.domEvent.key === 'Enter') {
    handleInput(inputBuffer.trim());
    inputBuffer = '';
  } else if (e.domEvent.key === 'Backspace') {
    // Handle backspace key
    if (inputBuffer.length > 0) {
      term.write('\b \b'); // Move cursor left, write space, move cursor left again
      inputBuffer = inputBuffer.slice(0, -1); // Remove last character from buffer
    }
  } else if (e.domEvent.key === 'Delete') {
    // Handle delete key
    if (inputBuffer.length > 0) {
      term.write('\b \b'); // Move cursor left, write space, move cursor left again
      inputBuffer = inputBuffer.slice(0, -1); // Remove last character from buffer
    }
  } else if (e.key === '\r') { // Check if the user pressed Enter
    handleInput(inputBuffer.trim()); // Trim leading and trailing whitespace
    inputBuffer = ''; // Clear the input buffer
  } else {
    term.write(e.key); // Write other characters to the terminal
    inputBuffer += e.key; // Add character to input buffer
  }
});

// Function to handle user input
function handleInput(input) {
  // Check if input matches any keyword
  var matchedKeyword = false;
  for (const keyword in keywords) {
    if (input === keyword) {
      executeCommand(keyword); // Execute command associated with the keyword
      matchedKeyword = true;
      break;
    }
  }

  // If no keyword matched, display "authorization denied"
  if (!matchedKeyword) {
    term.writeln('\r\nauthorization denied');
    term.prompt(); // Add prompt after message
  }
}

// Function to execute commands associated with keywords
function executeCommand(keyword) {
  // Get the action/message associated with the keyword
  var action = keywords[keyword];
  
  // Perform action based on the keyword
  switch (keyword) {
    case "help":
      term.writeln('\r\nCommands:');
      term.writeln('- about');
      term.writeln('- contact');
      term.writeln('- access'); 
      term.writeln('- clear'); 
      term.writeln('- access main security grid'); 
      break;
    case "about":
      term.writeln('\r\nAbout:');
      term.writeln('- lukSkul is an NFT built on Polygon Network.');
      term.writeln('- Version: 1.0');
      break;
    case "contact":
      term.writeln('\r\nContact:');
      term.writeln('- Email: lukskul.nft@gmail.com');
      term.writeln('- WebSite: lukskul.nft');
      break;
    case "access": 
      term.writeln('\r\n> access: PERMISSION DENIED.'); 
      break; 
    case "access main security grid": 
      term.writeln('\r\nPERMISSION DENIED....and....'); 

      var count = 0;
      var interval = setInterval(function() {
        term.writeln("YOU DIDN'T SAY THE MAGIC WORD!");
        count++;
        if (count === 50) {
          clearInterval(interval);
          term.prompt(); // Add prompt after message
        }
      }, 100); // Adjust the delay (in milliseconds) as needed
      break; 
    case "clear":
      term.clear();
      term.writeln('\r\nReady...'); 
      term.prompt(); 
      break; 
    default:
      term.writeln('\r\nUnknown command: ' + keyword);
      break;
  }

  term.prompt(); // Add prompt after message
}

// Function to add a prompt
term.prompt = function() {
  term.focus(); // Write prompt text to the terminal
}

// Initial prompt
term.prompt();