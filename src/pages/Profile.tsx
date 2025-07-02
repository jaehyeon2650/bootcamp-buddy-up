import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Calendar, MessageSquare, Clock } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  // Mock current user data
  const currentUser = {
    id: "u123",
    nickname: "익명7",
    joinedStudyRoomIds: ["room1", "room3"],
    confirmedCoffeeChatIds: ["cc1"]
  };

  // Mock study rooms data
  const studyRooms = [
    {
      id: "room1",
      title: "알고리즘 코딩테스트 준비",
      stage: "코딩테스트",
      participants: 3,
      maxParticipants: 4,
      status: "confirmed",
      nextSession: "19:00",
      bootcampName: "우아한테크코스"
    },
    {
      id: "room3",
      title: "자기소개서 첨삭 스터디",
      stage: "자기소개서",
      participants: 3,
      maxParticipants: 3,
      status: "confirmed",
      nextSession: "18:00",
      bootcampName: "우아한테크코스"
    }
  ];

  // Mock coffee chat data
  const coffeeChats = [
    {
      id: "cc1",
      mentorName: "박선배",
      mentorField: "백엔드",
      mentorCompany: "우아한형제들",
      scheduledTime: "2025-07-03 19:00",
      status: "confirmed"
    }
  ];

  const joinedStudyRooms = studyRooms.filter(room => 
    currentUser.joinedStudyRoomIds.includes(room.id)
  );

  const confirmedChats = coffeeChats.filter(chat =>
    currentUser.confirmedCoffeeChatIds.includes(chat.id)
  );

  const enterStudyRoom = (roomId: string) => {
    navigate(`/chatroom/${roomId}`);
  };

  const enterCoffeeChat = (chatId: string) => {
    navigate(`/coffeechat-room/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{currentUser.nickname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentUser.nickname}</h1>
                  <p className="text-gray-600">내 활동 현황</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 참여 중인 스터디룸 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">참여 중인 스터디룸</h2>
          {joinedStudyRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinedStudyRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{room.title}</CardTitle>
                        <CardDescription className="mt-1">
                          <Badge variant="outline">{room.stage}</Badge>
                          <span className="ml-2 text-sm">{room.bootcampName}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="default">
                        확정
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {room.participants}/{room.maxParticipants}명
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        다음 세션 {room.nextSession}
                      </span>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => enterStudyRoom(room.id)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      스터디룸 입장
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-gray-500 mb-4">참여 중인 스터디룸이 없습니다.</p>
                <Button onClick={() => navigate("/")}>
                  스터디룸 찾아보기
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* 예약된 커피챗 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">예약된 커피챗</h2>
          {confirmedChats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {confirmedChats.map((chat) => (
                <Card key={chat.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback>{chat.mentorName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{chat.mentorName}</CardTitle>
                        <CardDescription>
                          {chat.mentorField} • {chat.mentorCompany}
                        </CardDescription>
                      </div>
                      <Badge variant="default">확정</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {chat.scheduledTime}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => enterCoffeeChat(chat.id)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      커피챗 입장
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-gray-500 mb-4">예약된 커피챗이 없습니다.</p>
                <Button onClick={() => navigate("/")}>
                  멘토 찾아보기
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;