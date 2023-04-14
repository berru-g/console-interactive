//import * as fetch from "https://cdn.skypack.dev/fetch@1.1.0";
//import * as nodeFetch from "https://cdn.skypack.dev/node-fetch@3.3.1";

// Créer une balise img pour le GIF
const gif = document.createElement('img');
const output = document.getElementById('output');
const input = document.getElementById('input');
// Fonction pour afficher le GIF pendant une durée définie
function showGif(url, duration) {
  // Ajouter l'URL du GIF à l'attribut src de l'image
  gif.src = url;
  // Ajouter l'image à la page
  document.body.appendChild(gif);
  // Effacer l'URL de l'attribut src après la durée spécifiée
  setTimeout(() => {
    gif.src = '';
  }, duration);
}

const commands = {
  list: {
    description: 'Affiche une liste des commandes disponibles',
    color: 'blue',
    fn: function () {
      printOutput('----', 'rep');
      for (let command in commands) {
        if (command !== 'list') {
          printOutput('>> ' + command + ': ' + commands[command].description, commands[command].color);
        }
      }
    }
  },

  model: {
    description: 'Affiche le nom du modèle de l\'appareil',
    fn: function () {
      const userAgent = navigator.userAgent;
      const deviceModel = userAgent.match(/\(([^)]+)\)/)[1];
      printOutput('----', 'rep');
      printOutput(`Modèle de l'appareil: ${deviceModel}`);
    }
  },
  device: {
    description: 'Affiche des informations sur l\'appareil et la connexion',
    fn: function () {
      const platform = navigator.platform;
      const language = navigator.language;
      const isOnline = navigator.onLine;
      const connection = navigator.connection;
      printOutput('----', 'rep');
      printOutput(`Plateforme : ${platform}`);
      printOutput(`Langue : ${language}`);
      printOutput(`Connecté à Internet : ${isOnline}`);

      if (connection) {
        printOutput('----', 'rep');
        printOutput(`Type de connexion : ${connection.effectiveType}`);
        printOutput(`Vitesse de téléchargement : ${connection.downlink} Mbits/s`);
        printOutput(`Latence de la connexion : ${connection.rtt} ms`);
      } else {
        printOutput('Informations sur la connexion non disponibles');
      }
    }
  },

  perf: {
    description: 'Affiche les statistiques de performance de l\'appareil',
    fn: function () {
      const cpu = navigator.hardwareConcurrency;
      const memory = navigator.deviceMemory;
      const storage = navigator.storage;
      const storageEstimate = storage && storage.estimate;

      const cpuUsage = 0; // TODO: Ajouter la logique pour récupérer l'utilisation du processeur.
      const memoryUsage = 0; // TODO: Ajouter la logique pour récupérer la consommation de mémoire.
      const diskSpeed = 0; // TODO: Ajouter la logique pour récupérer la vitesse du disque dur.

      printOutput('----', 'rep');
      printOutput(`CPU Nb de cœurs de processeur : ${cpu}`);
      printOutput(`Mémoire disponible: ${memory} Go`);
      printOutput(`Utilisation du processeur : ${cpuUsage}%`);
      printOutput(`Consommation de mémoire : ${memoryUsage}%`);

      if (storageEstimate) {
        printOutput(`Espace de stockage disponible: ${Math.round(storageEstimate.usage / 1000000000)} Go sur ${Math.round(storageEstimate.quota / 1000000000)} Go`);
      } else {
        printOutput('Espace de stockage non disponible.');
      }

      printOutput(`Vitesse du disque dur : ${diskSpeed} Mo/s`);
    }
  },

  serial: {
    description: 'Affiche le numéro de série de l\'appareil',
    fn: function () {
      printOutput('----', 'rep');
      printOutput('Récupération du numéro de série de l\'appareil...');

      fetch('/serialNumber')
        .then(response => response.text())
        .then(serialNumber => {
          printOutput(`Le numéro de série de l'appareil est : ${serialNumber}`);
        })
        .catch(error => {
          printOutput(`Erreur lors de la récupération du numéro de série de l'appareil : ${error}`);
        });
    }
  },

  size: {
    description: 'Affiche la taille de l\'écran de l\'appareil', color: 'blue',
    fn: function () {
      const width = window.innerWidth;
      const height = window.innerHeight;
      printOutput('----', 'rep');
      printOutput(`La taille de votre écran est : ${width} x ${height} pixels`);
    }
  },
  /*
  cpu: {
    description: 'Affiche son CPU', color: 'blue',
    fn: async function() {
      const cores = navigator.hardwareConcurrency;
      printOutput('----','rep');
printOutput(`Nombre de coeurs du CPU : ${cores}`);
 
    }
  },
  
  sys: {
    description: 'Affiche le système d\'exploitation utilisé',
    fn: async function() {
      let osName;
      const userAgent = navigator.userAgent;
      if (/(android)/i.test(userAgent)) {
        osName = 'Android';
      } else if (/(iphone|ipad|ipod)/i.test(userAgent)) {
        osName = 'iOS';
      } else {
        osName = navigator.platform;
      }
      printOutput('----','rep');
      printOutput(`Système d exploitation : ${osName}`);
    }
},
 
  
  memory: {
  description: 'Affiche les mémoires de l\'appareil',
  fn: function() {
    const memory = navigator.deviceMemory;
    const storage = navigator.storage;
    const storageEstimate = storage && storage.estimate;
    printOutput('----','rep');
    printOutput(`Mémoire disponible: ${memory} Go`);
    
    if (storageEstimate) {
      printOutput(`Espace de stockage disponible: ${Math.round(storageEstimate.usage / 1000000000)} Go sur ${Math.round(storageEstimate.quota / 1000000000)} Go`);
    } else {
      printOutput('Espace de stockage non disponible.');
    }
  }
},
  */
  ip: {
    description: 'Affiche l\'adresse IP de l\'utilisateur',
    fn: async function () {
      try {
        printOutput('Cela peut prendre une minute!')
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        //logWithStyle('color: green', `Votre adresse IP est : ${data.ip}`);
        printOutput('----', 'rep');
        printOutput(`Votre adresse IP est : ${data.ip}`, '.rep');
      } catch (error) {
        printOutput('Une erreur est survenue lors de la récupération de votre adresse IP.');
      }
    }
  },
  wifi: {
    description: 'Affiche le code WiFi de la box spécifiée',
    fn: function () {
      const boxName = prompt('Entrez le nom de votre box:');
      if (boxName === null || boxName === '') {
        printOutput('Nom de box invalide.');
        return;
      }
      printOutput('----', 'rep');
      printOutput(`Récupération du mot de passe WiFi pour la box "${boxName}".`);
      //env node.js only
      const { exec } = require('child_process');
      exec(`netsh wlan show profile "${boxName}" key=clear`, (error, stdout, stderr) => {
        if (error) {
          printOutput('----', 'rep');
          printOutput(`Erreur lors de la récupération du mot de passe WiFi pour la box "${boxName}": ${error}`);
          return;
        }

        const regex = /Key Content\s+:\s(.+)/;
        const match = regex.exec(stdout);
        if (match) {
          const password = match[1].trim();
          printOutput(`Le mot de passe WiFi pour la box "${boxName}" est: ${password}`, 'rep');
        } else {
          printOutput(`Impossible de récupérer le mot de passe WiFi pour la box "${boxName}".`);
        }
      });
    }
  },


  mdp: {
    description: 'Génère des mots de passe',
    fn: function () {
      startMatrixAnimation();
      function startMatrixAnimation() {
        // Définir la durée de l'animation en millisecondes (10 secondes)
        const duration = 200;
        // Définir la fréquence de mise à jour de l'animation en millisecondes
        const updateFrequency = 180;

        // Stocker les caractères possibles dans un tableau
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKUVWXYZ1234567890!?§アイウエオカキクケコサシスセソタチツテトナニヌ';

        // Récupérer la hauteur de la console pour définir le nombre de lignes
        const consoleHeight = output.clientHeight;
        // Définir la largeur de la ligne
        const lineWidth = 8;

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
          printOutput('----', 'rep');
          printOutput(lines.join('\n'));
        }

        // Lancer l'animation
        let startTime = Date.now();
        let interval = setInterval(function () {
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

  /*
  password: {
  description: 'Répondre pour accéder à un message caché',
  fn: function() {
    const question = 'Quel est le nom de ce script ?';
    const reponseAttendue = 'Console interactive';
    const messageCache = 'Créer une soirée de pluie avec chatgpt. Tu t ennuie, apprends!';
    
    const reponse = prompt(question);
    
    if (reponse === reponseAttendue) {
      printOutput(messageCache);
    } else {
      printOutput('Mauvaise réponse, accès refusé.','error');
    }
  }
},
  */
  btc: {
    description: 'Affiche le cours actuel de Bitcoin en EUR',
    fn: async function () {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur');
        const data = await response.json();
        const rate = data.bitcoin.eur;
        printOutput('----', 'rep');
        printOutput(`Le cours actuel de Bitcoin est de ${rate} EUR`, 'normal');
      } catch (error) {
        printOutput('Une erreur est survenue lors de la récupération du cours de BTC.');
      }
    }
  },


  eth: {
    description: 'Affiche le cours actuel de l\'Ethereum en EUR',
    fn: async function () {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur');
        const data = await response.json();
        const rate = data.ethereum.eur;
        printOutput('----', 'rep');
        printOutput(`Le cours actuel de l'Ethereum est de ${rate} EUR`, 'normal');
      } catch (error) {
        printOutput('Une erreur est survenue lors de la récupération du cours de l\'Ethereum.');
      }
    }
  },
  /*   
   news: {
       description: 'Affiche les dernières nouvelles sur un sujet spécifique',
       fn: async function() {
           const topic = prompt('De quel sujet souhaitez-vous voir les dernières nouvelles?');
           try {
               const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=58e291d01b1d496bbba792839e9e37a7`);
             //API key == https://newsapi.org/register
               const data = await response.json();
               const articles = data.articles;
               if (articles.length === 0) {
                 printOutput('----','rep');
                   printOutput(`Aucune nouvelle trouvée pour le sujet "${topic}"`);
               } else {
                 printOutput('----','rep');
                   printOutput(`Dernières nouvelles sur le sujet "${topic}" :`, 'green');
                   articles.forEach((article, index) => {
                       printOutput(`${index+1}. ${article.title} (${article.source.name}): ${article.url}`);
                   });
               }
           } catch (error) {
             printOutput('----','rep');
               printOutput('Une erreur est survenue lors de la récupération des nouvelles.');
           }
       }
   },
   */

  meteo: {
    description: 'Affiche la météo dans une ville donnée',
    fn: async function () {
      const ville = prompt('Entrez le nom de la ville :');
      const apiKey = '50085979d51d9dcb97879256118a8c17';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const meteo = data.weather[0].description;
        const temperature = data.main.temp;
        printOutput('----', 'rep');
        printOutput(`Il fait actuellement ${temperature} degrés Celsius à ${ville} et le temps est ${meteo}.`);
      } catch (error) {
        printOutput('Une erreur est survenue Vérifiez votre clef API.');
      }
    }
  },
  /*
  play: {
      description: 'Joue une vidéo à partir de YouTube',
      fn: async function() {
          const searchTerm = prompt('Quelle vidéo souhaitez-vous lire? Ajouter son API key!');
          try {
              const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=VOTRE_CLE_API`);
            //API key == https://console.developers.google.com/
              const data = await response.json();
              const videoId = data.items[0].id.videoId;
              const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
              printOutput(`Lecture de la vidéo "${data.items[0].snippet.title}"...`, 'green');
              window.open(videoUrl, '_blank');
          } catch (error) {
              printOutput('Une erreur est survenue lors de la récupération de la vidéo. Pensez à ajouter votre API KEY!');
          }
      }
  },
  
    apikeymeteo58e291d01b1d496bbba792839e9e37a7
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
  
  
  
    date: {
    description: 'Affiche l\'heure et la date US',
    fn: function() {
      const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      printOutput(`Il est ${date}`);
    }
  },
    */

  matrix: {
    description: 'Mode Matrix',
    fn: function () {
      const canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const letters = '0987654321ABCNOPQRSTUVXYZazertyuidfghjklmwxcvbnアイウエオカキクナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
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
      printOutput('"Ctrl+r" pour quitter ou actualiser')
      let intervalId = setInterval(draw, 50);
      setTimeout(function () {
        clearInterval(intervalId);
      }, time);
    }
  },


  // Utilisation de la fonction showGif dans la commande zen
  zen: {
    description: 'Active le mode zen',
    fn: async function () {
      try {
        // Charger le fichier audio
        const audio = new Audio('https://github.com/berru-g/console-play-music/blob/master/son/FL_HHL_Ride_069_Piano.wav?raw=true');
        audio.play();

        // Baisser la luminosité de l'écran de 30%
        const currentBrightness = window.screen.brightness;
        window.screen.brightness = currentBrightness * 0.3;

        // Afficher le GIF pendant 5 secondes
        //showGif('https://media.giphy.com/media/k8kITi9SAwe9JWbUaH/giphy.gif', 12000);
        document.body.style.backgroundColor = '#2a9d8f';
        document.body.style.color = '#e76f51';
        printOutput('----', '#f4a261');
        printOutput('Mode zen activé.');

      } catch (error) {
        printOutput('Une erreur est survenue lors de l\'activation du mode zen.');
      }
    }
  },

  clear: {
    description: 'Efface la console',
    fn: function () {
      output.innerHTML = '';
    }
  },
  /*
  function sendEmail() {
  const accessToken = 'YOUR_ACCESS_TOKEN';
  const from = 'YOUR_EMAIL_ADDRESS';
  const to = 'RECIPIENT_EMAIL_ADDRESS';
  const subject = 'Test email';
  const body = 'Ceci est un test d\'email envoyé depuis un script JavaScript à l\'aide de l\'API Gmail.';
 
  fetch(`https://www.googleapis.com/gmail/v1/users/${from}/messages/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: window.btoa(`From: ${from}\nTo: ${to}\nSubject: ${subject}\n\n${body}`)
    })
  })
  .then(response => {
    if (response.ok) {
      console.log('E-mail envoyé avec succès !');
    } else {
      console.error('Erreur lors de l\'envoi de l\'e-mail : ', response.statusText);
    }
  })
  .catch(error => console.error('Erreur lors de l\'envoi de l\'e-mail : ', error));
}
 
sendEmail();
 
 
 mail: {
   description: 'envoyer un mail auto',
   fn: function(){
     const sendEmail = () => {
  const email = {
    to: 'recipient@example.com',
    subject: 'Test email',
    body: 'Ceci est un test d\'email envoyé depuis un script JavaScript.'
  };
 
  // Vérifie si l'utilisateur est connecté à un compte de messagerie dans le navigateur
  if ('mail' in window) {
    if (window.mail.isLoggedIn()) {
      window.mail.compose({
        to: email.to,
        subject: email.subject,
        body: email.body
      });
      return;
    }
  }
 
  // Si l'utilisateur n'est pas connecté, demandez-lui de se connecter
  const confirmLogin = confirm('Veuillez vous connecter à votre compte Gmail pour envoyer un e-mail.');
  if (confirmLogin) {
    const loginUrl = 'https://www.google.com/search?q=gmail';
    window.open(loginUrl, '_blank');
  }
};
 
sendEmail();
 
   }
 },
  */
  credit: {
    description: 'Signature 3000',
    fn: function () {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      canvas.style.position = 'absolute';
      canvas.style.top = '50%';
      canvas.style.left = '50%';
      canvas.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(canvas);
      printOutput('Github/berru-g', 'rep');
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
      const audio = new Audio('https://github.com/berru-g/console-play-music/blob/master/son/MARIO.wav?raw=true');
      audio.play();

      // Baisser la luminosité de l'écran de 30%
      const currentBrightness = window.screen.brightness;
      window.screen.brightness = currentBrightness * 0.3;

      printOutput('Visit me other skills.');


      setTimeout(function () {
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
    printOutput('Commande inconnue. Notez "list" pour une liste des commandes disponibles.');
  }
}

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    runCommand();
  }
});

printOutput('Bienvenue sur cette console interactive !');
printOutput('>')
printOutput('Suivez les instruction pour avoir vos réponses techniques.');
