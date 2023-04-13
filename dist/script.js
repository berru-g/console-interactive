function logWithStyle(style, message) {
	console.log(`%c${message}`, style);
}
const output = document.getElementById('output');
const input = document.getElementById('input');
const commands = {
	help: {
		description: 'Affiche une liste des commandes disponibles',
		fn: function() {
			printOutput('----');
			for (let command in commands) {
				if (command !== 'help') {
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
			printOutput(`Votre adresse IP est : ${data.ip}`);
		} catch (error) {
			printOutput('Une erreur est survenue lors de la récupération de votre adresse IP.');
		}
	}
},

  /*
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
	},*/

  mdp: {
    description: 'Génère des mots de passe aléatoire',
    fn: function() {
        startMatrixAnimation();
      function startMatrixAnimation() {
    // Définir la durée de l'animation en millisecondes (10 secondes)
    const duration = 1000;
    // Définir la fréquence de mise à jour de l'animation en millisecondes
    const updateFrequency = 400;

    // Stocker les caractères possibles dans un tableau
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#!?§';

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
            printOutput('MDP A terminée.');
        }
    }, updateFrequency);
}

    }
},

  
adt: {
	description: 'Affiche une anecdote différente chaque jour de la semaine',
	fn: function() {
		const date = new Date();
		const dayOfWeek = date.getDay();
		let anecdote = '';

		switch(dayOfWeek) {
			case 0:
				anecdote = 'Le nom de la planète Mars vient du dieu romain de la guerre.';
				break;
			case 1:
				anecdote = 'La Terre est la seule planète du système solaire qui n’a pas été nommée d’après une divinité.';
				break;
			case 2:
				anecdote = 'La Voie Lactée contient environ 200 milliards d’étoiles.';
				break;
			case 3:
				anecdote = 'L’Univers observable contient environ 100 milliards de galaxies.';
				break;
			case 4:
				anecdote = 'La planète la plus proche de la Terre est Vénus.';
				break;
			case 5:
				anecdote = 'Jupiter est la plus grande planète du système solaire.';
				break;
			case 6:
				anecdote = 'Le Soleil représente plus de 99 % de la masse totale du système solaire.';
				break;
			default:
				anecdote = 'Je n\'ai pas d\'anecdote pour ce jour.';
		}

		printOutput(anecdote);
	}
},

  meteo: {
	description: 'Affiche la météo pour une ville donnée',
	fn: async function(city) {
		const apiKey = 'votre_clé_api'; // Remplacez 'votre_clé_api' par votre clé API OpenWeatherMap
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		const data = await response.json();
		const temperature = data.main.temp;
		const weatherDescription = data.weather[0].description;
		const formattedWeather = `Il fait ${temperature} degrés Celsius et ${weatherDescription} à ${city}.`;
		printOutput(formattedWeather);
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
/*
	autres: {
		description: 'Affiche une liste d\'autres commandes',
		fn: function() {
			printOutput('Autres commandes:');
			printOutput('- clear: Efface la console');
			
			printOutput('- credit');
		}
	},
  */

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
      printOutput('Github/berru-g')
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
			}, 3000);
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
		printOutput('Commande inconnue. Tapez "help" pour une liste des commandes disponibles.');
	}
}

input.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		runCommand();
	}
});

printOutput('Bienvenue sur cette console interactive !');
printOutput('=>')
printOutput('Tapez "help" pour la liste des commandes disponibles.');