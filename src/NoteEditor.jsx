import React from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';


function NoteEditor({ note, onUpdate, onDelete, onBack }) {
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

  if (!note) {
    return (
      <div className="hidden md:flex items-center justify-center h-full flex-1 bg-white">
        <div className="text-center text-gray-400">
          <p className="text-xl">Select a note or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <button
          onClick={onBack}
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1"></div>
        <button
          onClick={() => onDelete(note.id)}
          className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => onUpdate(note.id, 'title', e.target.value)}
          className="w-full text-3xl font-bold mb-2 focus:outline-none"
        />
        <div className="text-sm text-gray-500 mb-4">
          {formatDate(note.updatedAt)}
        </div>
        <textarea
          placeholder="Start typing..."
          value={note.content}
          onChange={(e) => onUpdate(note.id, 'content', e.target.value)}
          className="w-full h-full min-h-96 text-lg focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}export default NoteEditor;