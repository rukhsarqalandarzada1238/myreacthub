import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Chat.css";

const menuItems = [
  { label: "Dashboard", icon: "▣", path: "/dashboard" },
  { label: "Appointments", icon: "▤", path: "/appointments" },
  { label: "Find Doctor", icon: "♟", path: "/find-doctor" },
  { label: "Find Clinic", icon: "▦", path: "/find-clinic" },
  { label: "Chat", icon: "▣", path: "/chat" },
  { label: "Find MarketPlace", icon: "▤", path: "/marketplace" },
  { label: "Find Pharmacy", icon: "💊", path: "/find-pharmacy" },
  { label: "My Dependents", icon: "▤", path: "/my-dependents" },
  { label: "My Account", icon: "♟", path: "/account" },
  { label: "Settings", icon: "⚙", path: "/settings" },
];

const initialContacts = [
  {
    id: 1,
    name: "Dr. Murtaza",
    specialty: "Cardiologist",
    status: "online",
    avatar: "https://i.pravatar.cc/150?img=12",
    messages: [
      { id: 1, sender: "them", text: "Hello, how can I help you today?", time: "10:00" },
      { id: 2, sender: "me", text: "I have a question about my prescription.", time: "10:05" },
    ],
  },
  {
    id: 2,
    name: "Dr. Ahmadi",
    specialty: "Neurologist",
    status: "online",
    avatar: "https://i.pravatar.cc/150?img=13",
    messages: [
      { id: 1, sender: "them", text: "Hi hope you feel better", time: "2:30" },
    ],
  },
  {
    id: 3,
    name: "Dr. Noman",
    specialty: "Dentist",
    status: "online",
    avatar: "https://i.pravatar.cc/150?img=11",
    messages: [
      { id: 1, sender: "them", text: "Your appointment is confirmed.", time: "09:15" },
    ],
  },
];

const emojis = ["😀", "😂", "😍", "👍", "🙏", "😊", "😎", "😭", "🤔", "❤️", "🔥", "🎉", "👋", "🙌", "💯"];

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContact, setActiveContact] = useState(initialContacts[0]);
  const [searchContact, setSearchContact] = useState("");
  const [inputText, setInputText] = useState("");
  const [topSearch, setTopSearch] = useState("");
  
  const [activeCall, setActiveCall] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContact) return;

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: inputText,
      time: time,
      type: "text",
    };

    const updatedContacts = contacts.map((contact) => {
      if (contact.id === activeContact.id) {
        return { ...contact, messages: [...contact.messages, newMessage] };
      }
      return contact;
    });

    setContacts(updatedContacts);
    setActiveContact(updatedContacts.find((c) => c.id === activeContact.id));
    setInputText("");
    setShowEmojis(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
      const newMessage = {
        id: Date.now(),
        sender: "me",
        text: "Voice Message (0:05)",
        time: time,
        type: "audio",
      };

      const updatedContacts = contacts.map((contact) => {
        if (contact.id === activeContact.id) {
          return { ...contact, messages: [...contact.messages, newMessage] };
        }
        return contact;
      });

      setContacts(updatedContacts);
      setActiveContact(updatedContacts.find((c) => c.id === activeContact.id));
    }
    setIsRecording(!isRecording);
  };

  const handleTopSearch = (e) => {
    if (e.key === "Enter") {
      const query = topSearch.toLowerCase().trim();
      if (!query) return;

      const foundContact = contacts.find((c) =>
        c.name.toLowerCase().includes(query)
      );

      if (foundContact) {
        setActiveContact(foundContact);
        setTopSearch("");
      } else {
        alert(`Doctor "${topSearch}" not found!`);
      }
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchContact.toLowerCase()) ||
    contact.specialty.toLowerCase().includes(searchContact.toLowerCase())
  );

  const handleSearchContactKey = (e) => {
    if (e.key === "Enter" && filteredContacts.length > 0) {
      setActiveContact(filteredContacts[0]);
    }
  };

  const addEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <div className="chat-page-layout">
      <aside className={`chat-sidebar-menu ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="chat-brand">
          <div className="chat-logo">M<span>HUB</span></div>
          {!sidebarCollapsed && <span>MyPatientHUB</span>}
        </div>

        <nav className="chat-nav">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`chat-nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
              title={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="chat-main-area">
        <header className="chat-top-header">
          <div className="chat-header-left">
            <button
              className="chat-hamburger"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              ☰
            </button>
            <div>
              <div className="chat-breadcrumb">
                <span>⌂</span> / <span>Chat</span>
              </div>
              <h2>Chat</h2>
            </div>
          </div>

          <div className="chat-header-right">
            <div className="chat-search">
              <span>⌕</span>
              <input 
                type="text" 
                placeholder="Type here..." 
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                onKeyDown={handleTopSearch}
              />
            </div>
            <button className="chat-logout" onClick={() => navigate("/login")}>
              ◉ Log out
            </button>
            <button className="chat-icon-btn" onClick={() => navigate("/settings")}>⚙</button>
            
            <div className="notification-wrapper">
              <button className="chat-icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
                🔔
                <span className="notification-dot"></span>
              </button>
              
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <button className="close-notif" onClick={() => setShowNotifications(false)}>✕</button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <p>New message from Dr. Murtaza</p>
                      <span>2 mins ago</span>
                    </div>
                    <div className="notif-item">
                      <p>Your appointment is confirmed for tomorrow.</p>
                      <span>1 hour ago</span>
                    </div>
                    <div className="notif-item">
                      <p>Dr. Ahmadi sent you a voice message.</p>
                      <span>3 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        <div className="chat-container">
          <div className="contacts-panel">
            <div className="contact-search">
              <input
                type="text"
                placeholder="Search Contacts"
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                onKeyDown={handleSearchContactKey}
              />
              <span>⌕</span>
            </div>

            <div className="contact-list">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-item ${activeContact?.id === contact.id ? "active" : ""}`}
                  onClick={() => setActiveContact(contact)}
                >
                  <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
                  <div className="contact-info">
                    <div className="contact-top">
                      <h4>{contact.name}</h4>
                    </div>
                    <p>
                      {contact.status === "online" ? (
                        <span className="status-online">online</span>
                      ) : (
                        contact.specialty
                      )}
                    </p>
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px", color: "#8a92a3" }}>No contacts found</p>
              )}
            </div>
          </div>

          {activeContact ? (
            <div className="chat-window">
              <div className="chat-window-header">
                <div className="chat-user-info">
                  <img src={activeContact.avatar} alt={activeContact.name} />
                  <div>
                    <h3>{activeContact.name}</h3>
                    {activeContact.status === "online" ? (
                      <span className="status-online">online</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#8a92a3" }}>{activeContact.specialty}</span>
                    )}
                  </div>
                </div>
                <div className="chat-window-actions">
                  <button className="action-icon video-icon" onClick={() => setActiveCall("video")}>🎥</button>
                  <button className="action-icon call-icon" onClick={() => setActiveCall("audio")}>📞</button>
                </div>
              </div>

              <div className="chat-messages-area">
                {activeContact.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-row ${msg.sender === "me" ? "my-message" : "their-message"}`}
                  >
                    {msg.sender !== "me" && (
                      <img src={activeContact.avatar} alt="avatar" className="msg-avatar" />
                    )}
                    
                    <div className="message-bubble">
                      {msg.type === "audio" ? (
                        <div className="audio-msg-content">
                          <span className="audio-play-icon">▶</span>
                          <span>{msg.text}</span>
                        </div>
                      ) : (
                        <div className="msg-content">{msg.text}</div>
                      )}
                      <div className="msg-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
                {isRecording && (
                  <div className="message-row my-message">
                    <div className="message-bubble recording-bubble">
                      <div className="msg-content">Recording audio...</div>
                    </div>
                  </div>
                )}
              </div>

              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <div className="emoji-wrapper">
                  <button type="button" className="emoji-btn" onClick={() => setShowEmojis(!showEmojis)}>😊</button>
                  {showEmojis && (
                    <div className="emoji-picker">
                      {emojis.map((emoji, index) => (
                        <span key={index} onClick={() => addEmoji(emoji)}>
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder={isRecording ? "Recording..." : "Enter Message"}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isRecording}
                />
                <button 
                  type="button" 
                  className={`mic-btn ${isRecording ? "recording" : ""}`} 
                  onClick={toggleRecording}
                >
                  {isRecording ? "⏹" : "🎤"}
                </button>
                <button type="submit" className="send-btn">➤</button>
              </form>
            </div>
          ) : (
            <div className="chat-window" style={{ justifyContent: "center", alignItems: "center" }}>
              <p style={{ color: "#8a92a3" }}>Select a contact</p>
            </div>
          )}
        </div>
      </main>

      {activeCall && activeContact && (
        <div className="call-overlay">
          <div className="call-modal">
            <img src={activeContact.avatar} alt="Calling" className="call-avatar" />
            <h2>Calling {activeContact.name}...</h2>
            <p>{activeCall === "video" ? "Video Call" : "Audio Call"}</p>
            <div className="call-actions">
              <button className="end-call-btn" onClick={() => setActiveCall(null)}>
                📞 End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}