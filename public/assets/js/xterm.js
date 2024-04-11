import { Terminal } from '@xterm/xterm';

var term = new Terminal();
term.open(document.getElementById('terminal'));

term.writeln('Xterm System Security Interface');
term.writeln('Version 4.0.5, Alpha E');
term.writeln('Ready...');

var inputBuffer = ''; 

var keywords = {
  "help": "about /n contact",
  "about": "Show information about the application",
  "contact": "Contact support", 
  "access": "access: PERMISSION DENIED only higher level administrator access",
  "access main security grid": "This command should break the terminal",
  "clear": "Clears the Terminal."
};

term.onKey(e => {
  if (e.domEvent.key === 'Enter') {
    handleInput(inputBuffer.trim());
    inputBuffer = '';
  } else if (e.domEvent.key === 'Backspace') {
    if (inputBuffer.length > 0) {
      term.write('\b \b'); 
      inputBuffer = inputBuffer.slice(0, -1); 
    }
  } else if (e.domEvent.key === 'Delete') {
    if (inputBuffer.length > 0) {
      term.write('\b \b'); 
      inputBuffer = inputBuffer.slice(0, -1); 
    }
  } else if (e.key === '\r') { 
    handleInput(inputBuffer.trim()); 
    inputBuffer = ''; 
  } else {
    term.write(e.key); 
    inputBuffer += e.key;
  }
});

function handleInput(input) {
  var matchedKeyword = false;
  for (const keyword in keywords) {
    if (input === keyword) {
      executeCommand(keyword); 
      matchedKeyword = true;
      break;
    }
  }

  if (!matchedKeyword) {
    term.writeln('\r\nauthorization denied');
    term.prompt(); 
  }
}

function executeCommand(keyword) {
  var action = keywords[keyword];

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
          term.prompt(); 
        }
      }, 100);
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

  term.prompt(); 
}

term.prompt = function() {
  term.focus(); 
}

term.prompt();