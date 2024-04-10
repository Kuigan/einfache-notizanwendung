// Import des FileSystem-Moduls
import * as fs from 'fs';

// Funktion zum Hinzufügen einer Notiz
function addNote(note: string): void {
  fs.appendFileSync('notes.txt', note + '\n');
}

// Funktion zum Anzeigen aller Notizen
function showNotes(): void {
  const notes = fs.readFileSync('notes.txt', 'utf8').split('\n');
  notes.forEach(note => console.log(note));
}

// Funktion zum Löschen einer Notiz
function deleteNote(note: string): void {
  const notes = fs.readFileSync('notes.txt', 'utf8').split('\n');
  const updatedNotes = notes.filter(existingNote => existingNote !== note);
  fs.writeFileSync('notes.txt', updatedNotes.join('\n'));
}

// Import des readline-Moduls
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funktion zur Verarbeitung von Benutzereingaben
function processCommand(command: string): void {
  const [action, ...args] = command.split(' ');

  switch (action) {
    case 'add':
      addNote(args.join(' '));
      console.log('Notiz erfolgreich hinzugefügt.');
      break;
    case 'show':
      console.log('Gespeicherte Notizen:');
      showNotes();
      break;
    case 'delete':
      deleteNote(args.join(' '));
      console.log('Notiz erfolgreich gelöscht.');
      break;
    default:
      console.log('Ungültiger Befehl.Bitte noch einmal versuchen.');
  }
}

// Benutzerinteraktion über die Befehlszeile
rl.question('Befehl eingeben (add/show/delete): ', (command) => {
  processCommand(command);
  rl.close();
});