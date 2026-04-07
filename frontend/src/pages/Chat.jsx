import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, Send, AlertCircle, Sparkles } from "lucide-react";

export default function Chat() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isKeySetup = apiKey && apiKey !== "YOUR_GEMINI_API_KEY_HERE";

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I am the SheRise AI Assistant. I can help you explore government schemes, recommend skills, or brainstorm business ideas. Standard languages supported: English, Hindi (हिंदी), and Marathi (मराठी). How can I empower you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isKeySetup || loading) return;

    const userText = input.trim();
    const newUserMsg = { id: Date.now(), sender: "user", text: userText };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `You are a helpful, empowering, and polite AI assistant for "SheRise", a platform dedicated to empowering women through skill development, government scheme access, and self-employment business ideas in rural/semi-urban areas. Specifically, you MUST accurately answer in the language the user speaks to you (English, Hindi, or Marathi). Keep your answers concise and formatted with markdown bullet points if necessary. User asks: ${userText}`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request at this moment.";
      setMessages((prev) => [...prev, { id: Date.now(), sender: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: Date.now(), sender: "bot", text: "⚠️ Error connecting to Gemini API. Please make sure your API key is valid." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Bot className="w-8 h-8 text-indigo-600" />
            AI Assistant
          </h1>
          <p className="mt-2 text-gray-500 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" /> Powered by Google Gemini
          </p>
        </div>
      </div>

      <div className="flex-grow bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 flex flex-col relative">

        {!isKeySetup && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">API Key Required</h2>
            <p className="text-gray-500 max-w-md">
              In order to use the free Google Gemini integration, please open <code className="bg-gray-100 text-pink-600 px-2 py-1 rounded">frontend/.env</code> and place your active key inside <code className="bg-gray-100 text-indigo-600 px-2 py-1 rounded">VITE_GEMINI_API_KEY</code>.
            </p>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm shadow-md'
                  : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
                }`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-2xl rounded-bl-sm px-5 py-3.5 flex gap-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question in English, Hindi, or Marathi..."
              className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-6 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-700 placeholder-gray-400 disabled:opacity-50"
              disabled={!isKeySetup || loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || !isKeySetup || loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3.5 rounded-full transition-all shadow-md active:scale-95"
            >
              <Send className="w-5 h-5 ml-1 mr-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
