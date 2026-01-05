import React from 'react';


function NotesList({ notes, selectedNote, onSelectNote, searchQuery }) {
  const getPreviewText = (content) => {
    return content.split('\n')[0] || 'No additional text';
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {notes.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {searchQuery ? 'No notes found' : 'No notes yet. Create one!'}
        </div>
      ) : (
        notes.map(note => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedNote?.id === note.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold truncate flex-1 text-pink-500">
                {note.title || 'New Note'}
              </h3>
              <span className="text-xs text-gray-500 ml-2">
                {formatDate(note.updatedAt)}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              {getPreviewText(note.content)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
export default NotesList;