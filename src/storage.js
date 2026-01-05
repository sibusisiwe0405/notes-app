

// Storage utility functions - using localStorage for local development
function loadAllNotes() {
  try {
    const notesData = localStorage.getItem('notes');
    if (notesData) {
      const notes = JSON.parse(notesData);
      return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    }
  } catch (error) {
    console.log('No existing notes found');
  }
  return [];
}

function saveNoteToStorage(note) {
  
  try {
    const notesData = localStorage.getItem('notes');
    const notes = notesData ? JSON.parse(notesData) : [];
    
    // Find and update existing note, or add new one
    const existingIndex = notes.findIndex(n => n.id === note.id);
    if (existingIndex >= 0) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving note:', error);
  }
}

function deleteNoteFromStorage(id) {
  try {
    const notesData = localStorage.getItem('notes');
    if (notesData) {
      const notes = JSON.parse(notesData);
      const filteredNotes = notes.filter(note => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}
export { loadAllNotes, saveNoteToStorage, deleteNoteFromStorage };