

const output = document.getElementById('output');
const input = document.getElementById('input');

function printOutput(message, type = 'normal') {
  const output = document.getElementById('output');
  const outputMessage = document.createElement('div');
  outputMessage.classList.add(type);
  outputMessage.textContent = message;
  output.appendChild(outputMessage);
}

const commands = {
	list: {
		description: 'Affiche une liste des commandes disponibles',
		fn: function() {
			printOutput('----');
			for (let command in commands) {
				if (command !== 'list') {
					printOutput('- ' + command + ': ' + commands[command].description);
				}
			}
		}
	},
  
  ip: {
	description: 'Affiche l\'adresse IP de l\'utilisateur',
	fn: async function() {
		try {
			const response = await fetch('https://api.ipify.org?format=json');
			const data = await response.json();
      const ip = data.ip;
      //logWithStyle('color: green', `Votre adresse IP est : ${data.ip}`);
			printOutput(`Votre adresse IP est : ${data.ip}`, '.rep');
		} catch (error) {
			printOutput('Une erreur est survenue lors de la récupération de votre adresse IP.');
		}
	}
},

  
	dialog: {
		description: 'Ouvre un dialogue de test',
		fn: function() {
			const message = prompt('Entrez un message:');
			if (message) {
				printOutput('Vous avez entré le message suivant: ' + message);
			} else {
				printOutput('Vous n\'avez pas entré de message.');
			}
		}
	},

  mdp: {
    description: 'Génère des mots de passe aléatoire',
    fn: function() {
        startMatrixAnimation();
      function startMatrixAnimation() {
    // Définir la durée de l'animation en millisecondes (10 secondes)
    const duration = 500;
    // Définir la fréquence de mise à jour de l'animation en millisecondes
    const updateFrequency = 450;

    // Stocker les caractères possibles dans un tableau
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#!?§アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    // Récupérer la hauteur de la console pour définir le nombre de lignes
    const consoleHeight = output.clientHeight;
    // Définir la largeur de la ligne
    const lineWidth = 10;

    // Définir le nombre de lignes
    const numLines = Math.floor(consoleHeight / 20);

    // Créer un tableau pour stocker les lignes de caractères
    const lines = [];

    // Initialiser les lignes avec des caractères aléatoires
    for (let i = 0; i < numLines; i++) {
        let line = '';
        for (let j = 0; j < lineWidth; j++) {
            line += characters[Math.floor(Math.random() * characters.length)];
        }
        lines.push(line);
    }

    // Définir la fonction de mise à jour de l'animation
    function updateAnimation() {
        // Déplacer toutes les lignes vers le haut
        for (let i = 0; i < numLines; i++) {
            let line = lines[i];
            // Ajouter un nouveau caractère en haut de la ligne
            line = characters[Math.floor(Math.random() * characters.length)] + line.slice(0, -1);
            // Mettre à jour la ligne dans le tableau
            lines[i] = line;
        }
        // Afficher les lignes dans la console
        printOutput(lines.join('\n'));
    }

    // Lancer l'animation
    let startTime = Date.now();
    let interval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        if (elapsedTime < duration) {
            updateAnimation();
        } else {
            // Arrêter l'animation après la durée spécifiée
            clearInterval(interval);
            printOutput('Génèrateur terminée.');
        }
    }, updateFrequency);
}

    }
},

  
  password: {
  description: 'Répondre à une question pour accéder à un message caché',
  fn: function() {
    const question = 'Quel est le nom de votre animal de compagnie ?';
    const reponseAttendue = 'fluffy';
    const messageCache = 'Le mot de passe est "123456".';
    
    const reponse = prompt(question);
    
    if (reponse === reponseAttendue) {
      printOutput(messageCache);
    } else {
      printOutput('Mauvaise réponse, accès refusé.');
    }
  }
},

  
  meteo: {
    description: 'Affiche la météo actuelle dans une ville donnée',
    fn: async function() {
        const ville = prompt('Entrez le nom de la ville :');
        const apiKey = 'votre-clé-d-api';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const meteo = data.weather[0].description;
            const temperature = data.main.temp;
            printOutput(`Il fait actuellement ${temperature} degrés Celsius à ${ville} et le temps est ${meteo}.`);
        } catch (error) {
            printOutput('Une erreur est survenue lors de la récupération des informations météorologiques.');
        }
    }
},


  date: {
	description: 'Affiche l\'heure et la date US',
	fn: function() {
		const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
		printOutput(`Il est ${date}`);
	}
},
  
  clear: {
		description: 'Efface la console',
		fn: function() {
			output.innerHTML = '';
		}
	},

	matrix: {
  description: 'Mode Matrix',
  fn: function() {
    const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '0987654321ABCDEFGHIJKLMNOPQRSTUVXYZazertyuiopqsdfghjklmwxcvbnアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 10, 
          columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
ctx.clearRect(0, 0, canvas.width, canvas.height);
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
          drops[i] = 0;
        }
      }
    }
    printOutput('"Ctrl+r" pour quitter')
    let intervalId = setInterval(draw, 50);
    setTimeout(function() {
      clearInterval(intervalId);
    },time);
  }
},

 

	credit: {
		description: 'Signature 3000',
		fn: function() {
			const canvas = document.createElement('canvas');
			canvas.width = 200;
			canvas.height = 200;
			canvas.style.position = 'absolute';
			canvas.style.top = '50%';
			canvas.style.left = '50%';
			canvas.style.transform = 'translate(-50%, -50%)';
			document.body.appendChild(canvas);
      printOutput('Github/berru-g','rep');
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(0, 0, 200, 200);
			ctx.fillStyle = '#FF0000';
			ctx.font = 'bold 32px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('github', 100, 100);
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 4;
			ctx.strokeText('berru-g', 100, 150);

			setTimeout(function() {
				document.body.removeChild(canvas);
			}, 2000);
		}
	}
};

function printOutput(text) {
	const line = document.createElement('div');
	line.textContent = text;
	output.appendChild(line);
	output.scrollTop = output.scrollHeight;
}

function runCommand() {
	const inputValue = input.value.trim().toLowerCase();
	input.value = '';
	if (inputValue === '') {
		return;
	}
	if (commands[inputValue]) {
		commands[inputValue].fn();
	} else {
		printOutput('Commande inconnue. Tapez "list" pour une liste des commandes disponibles.');
	}
}

input.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		runCommand();
	}
});

printOutput('Bienvenue sur cette console interactive !');
printOutput('>')
printOutput('Tapez "list" pour la liste des commandes disponibles.');
