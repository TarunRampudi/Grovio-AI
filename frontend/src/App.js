import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const API_URL = "https://grovio-ai-u49q.onrender.com";

let timer; // for debounce

function App() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");

  // Load notes from backend
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setNotes(res.data);
      if (res.data.length > 0) {
        setActiveId(res.data[0].id);
      }
    });
  }, []);

  const activeNote = notes.find(note => note.id === activeId);

  // Search filter
  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // Create note
  const addNote = async () => {
    const res = await axios.post(API_URL, { content: "" });
    const newNote = { id: res.data.id, content: "" };
    setNotes([newNote, ...notes]);
    setActiveId(newNote.id);
  };

  // Auto-save (debounce)
  const handleChange = (value) => {
    setNotes(notes.map(note =>
      note.id === activeId ? { ...note, content: value } : note
    ));

    clearTimeout(timer);

    timer = setTimeout(async () => {
      await axios.put(`${API_URL}/${activeId}`, { content: value });
      console.log("Auto-saved");
    }, 800);
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    const filtered = notes.filter(note => note.id !== id);
    setNotes(filtered);

    if (filtered.length > 0) {
      setActiveId(filtered[0].id);
    } else {
      setActiveId(null);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "20%", borderRight: "1px solid gray", padding: "10px" }}>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
        />

        <button onClick={addNote}>+ New Note</button>

        {filteredNotes.map(note => (
          <div
            key={note.id}
            onClick={() => setActiveId(note.id)}
            style={{
              marginTop: "10px",
              padding: "8px",
              cursor: "pointer",
              backgroundColor: note.id === activeId ? "#ddd" : "transparent"
            }}
          >
            <div>Note {note.id}</div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Editor */}
      <textarea
        style={{ width: "40%", padding: "10px" }}
        value={activeNote?.content || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write Markdown here..."
      />

      {/* Preview */}
      <div style={{ width: "40%", padding: "10px", borderLeft: "1px solid gray" }}>
        <ReactMarkdown>{activeNote?.content}</ReactMarkdown>
      </div>

    </div>
  );
}

export default App;
