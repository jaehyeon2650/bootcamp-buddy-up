
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Video, Mic, MicOff, Monitor, Users, Phone } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [participants] = useState(["김태정", "박지원", "이민수"]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = "김태정";

  useEffect(() => {
    // Mock initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        user: "박지원",
        content: "안녕하세요! 오늘 코딩테스트 문제 풀어보실까요?",
        timestamp: "19:00"
      },
      {
        id: "2", 
        user: "이민수",
        content: "좋네요! 알고리즘 문제부터 시작해봅시다.",
        timestamp: "19:01"
      }
    ];
    setMessages(initialMessages);

    // Mock periodic messages
    const interval = setInterval(() => {
      const mockMessages = [
        "이 문제 어떻게 접근하셨나요?",
        "시간복잡도를 고려해보세요",
        "다른 방법도 있을 것 같은데...",
        "화면 공유해서 보여드릴게요!"
      ];
      
      const randomUser = participants[Math.floor(Math.random() * participants.length)];
      const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      
      if (randomUser !== currentUser && Math.random() > 0.7) {
        const newMsg: Message = {
          id: Date.now().toString(),
          user: randomUser,
          content: randomMessage,
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
      }
    }, 8000);

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
    console.log("Message sent:", message);
  };

  const startScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsScreenSharing(true);
        toast.success("화면 공유가 시작되었습니다!");
        
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          toast.info("화면 공유가 종료되었습니다.");
        };
      } else {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsScreenSharing(false);
        toast.info("화면 공유를 종료했습니다.");
      }
    } catch (error) {
      console.error("Screen share error:", error);
      toast.error("화면 공유를 시작할 수 없습니다.");
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast.success(isMicOn ? "마이크가 음소거되었습니다." : "마이크가 켜졌습니다.");
    console.log("Mic toggled:", !isMicOn);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.success(isVideoOn ? "비디오가 꺼졌습니다." : "비디오가 켜졌습니다.");
    console.log("Video toggled:", !isVideoOn);
  };

  const startCall = () => {
    toast.success("음성 통화가 시작되었습니다!");
    console.log("Starting voice call...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                나가기
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">알고리즘 코딩테스트 준비</h1>
                <p className="text-sm text-gray-600">우아한테크코스 • 코딩테스트</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {participants.length}명 참여중
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Screen Share Video */}
            {isScreenSharing && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">화면 공유</CardTitle>
                </CardHeader>
                <CardContent>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 bg-gray-900 rounded-lg"
                  />
                </CardContent>
              </Card>
            )}

            {/* Chat Messages */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg">채팅</CardTitle>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">참여자</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div key={participant} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{participant}</span>
                      {participant === currentUser && (
                        <Badge variant="outline" className="text-xs">나</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">미디어 제어</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={startScreenShare}
                  variant={isScreenSharing ? "destructive" : "default"}
                  className="w-full"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  {isScreenSharing ? "화면 공유 중지" : "화면 공유"}
                </Button>
                
                <Button 
                  onClick={toggleMic}
                  variant={isMicOn ? "default" : "secondary"}
                  className="w-full"
                >
                  {isMicOn ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                  {isMicOn ? "마이크 끄기" : "마이크 켜기"}
                </Button>
                
                <Button 
                  onClick={toggleVideo}
                  variant={isVideoOn ? "default" : "secondary"}
                  className="w-full"
                >
                  <Video className="w-4 h-4 mr-2" />
                  {isVideoOn ? "비디오 끄기" : "비디오 켜기"}
                </Button>
                
                <Button 
                  onClick={startCall}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  음성 통화
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
