import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Calendar } from "lucide-react";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

const CoffeeChatRoom = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = "익명7";
  const mentor = {
    name: "박선배",
    field: "백엔드",
    company: "우아한형제들",
    scheduledTime: "2025-07-03 19:00"
  };

  useEffect(() => {
    // Mock initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        user: "박선배",
        content: "안녕하세요! 우아한테크코스 준비하고 계시는군요. 어떤 부분이 궁금하신가요?",
        timestamp: "19:00"
      },
      {
        id: "2", 
        user: "익명7",
        content: "안녕하세요! 코딩테스트 준비 과정이 가장 궁금합니다.",
        timestamp: "19:01"
      }
    ];
    setMessages(initialMessages);

    // Mock periodic messages from mentor
    const interval = setInterval(() => {
      const mockMentorMessages = [
        "코딩테스트는 알고리즘 기초가 중요해요",
        "백준이나 프로그래머스에서 꾸준히 문제를 푸는 것을 추천드려요",
        "특히 자료구조와 알고리즘 이론을 탄탄히 하세요",
        "궁금한 점이 더 있으면 언제든 물어보세요!"
      ];
      
      const randomMessage = mockMentorMessages[Math.floor(Math.random() * mockMentorMessages.length)];
      
      if (Math.random() > 0.8) {
        const newMsg: Message = {
          id: Date.now().toString(),
          user: "박선배",
          content: randomMessage,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: currentUser,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                나가기
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{mentor.name}</h1>
                  <p className="text-sm text-gray-600">{mentor.field} • {mentor.company}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {mentor.scheduledTime}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Chat Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">커피챗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.user === currentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.user === currentUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {message.user !== currentUser && (
                      <div className="text-xs font-semibold mb-1">{message.user}</div>
                    )}
                    <div>{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.user === currentUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoffeeChatRoom;