import { loadAllNotes, saveNoteToStorage, deleteNoteFromStorage } from './storage';
import NoteEditor from './NoteEditor';
import NotesList from './NotesList';
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';


// Main NotesApp Component
export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const loadedNotes = loadAllNotes();
    setNotes(loadedNotes);
    setIsLoading(false);
  };

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setSelectedNote(newNote);
    saveNoteToStorage(newNote);
  };

  const updateNote = (id, field, value) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        const updated = { ...note, [field]: value, updatedAt: Date.now() };
        saveNoteToStorage(updated);
        if (selectedNote?.id === id) {
          setSelectedNote(updated);
        }
        return updated;
      }
      return note;
    });
    setNotes(updatedNotes.sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const deleteNote = (id) => {
    deleteNoteFromStorage(id);
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${selectedNote ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-96 bg-white border-r`}>
       {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Notes</h1>
              <button
                onClick={createNewNote}
                className="p-2 rounded-full hover:bg-pink-100 bg-pink-500 text-white transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <NotesList 
            notes={filteredNotes}
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
            searchQuery={searchQuery}
          />
              </div>

              {/* Editor */}
      <NoteEditor 
        note={selectedNote}
        onUpdate={updateNote}
        onDelete={deleteNote}
        onBack={() => setSelectedNote(null)}
      />
    </div>
  );
}