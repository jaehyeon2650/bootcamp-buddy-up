
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Clock, Video, MessageSquare, Calendar, Star } from "lucide-react";
import { toast } from "sonner";

const BootcampDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const bootcampData = {
    woowa: {
      name: "우아한테크코스",
      description: "웹 백엔드 집중 부트캠프",
      fullDescription: "우아한형제들에서 운영하는 웹 백엔드 개발자 양성 과정입니다. 실무 중심의 프로젝트와 페어 프로그래밍을 통해 협업 능력을 기를 수 있습니다.",
      duration: "10개월",
      nextDeadline: "2025-07-15",
      stages: ["코딩테스트", "면접"]
    }
  };

const [stageFilter, setStageFilter] = useState("전체");
  
  const studyRooms = [
    {
      id: "room1",
      title: "알고리즘 코딩테스트 준비",
      stage: "코딩테스트",
      participants: 3,
      maxParticipants: 4,
      status: "recruiting",
      nextSession: "19:00",
      hostId: "u999",
      applicants: ["u123"],
      members: ["u999", "u456"]
    },
    {
      id: "room2", 
      title: "기술면접 질문 준비",
      stage: "면접",
      participants: 2,
      maxParticipants: 4,
      status: "recruiting",
      nextSession: "20:30",
      hostId: "u777",
      applicants: ["u555"],
      members: ["u777"]
    },
    {
      id: "room3",
      title: "자기소개서 첨삭 스터디",
      stage: "자기소개서",
      participants: 2,
      maxParticipants: 3,
      status: "confirmed",
      nextSession: "18:00",
      hostId: "u888",
      applicants: [],
      members: ["u888", "u123"]
    },
    {
      id: "room4",
      title: "코딩테스트 문제 풀이",
      stage: "코딩테스트",
      participants: 4,
      maxParticipants: 4,
      status: "confirmed",
      nextSession: "20:00",
      hostId: "u333",
      applicants: [],
      members: ["u333", "u444", "u555", "u666"]
    }
  ];

  const filteredStudyRooms = studyRooms.filter(room => 
    stageFilter === "전체" || room.stage === stageFilter
  );

  const alumni = [
    {
      id: "mentor1",
      name: "박선배",
      field: "백엔드",
      company: "우아한형제들",
      rating: 4.9,
      reviews: 23,
      availableSlots: ["2025-07-02 14:00", "2025-07-03 19:00", "2025-07-05 16:00"]
    },
    {
      id: "mentor2",
      name: "김멘토",
      field: "백엔드",
      company: "카카오",
      rating: 4.8,
      reviews: 18,
      availableSlots: ["2025-07-02 15:00", "2025-07-04 18:00"]
    }
  ];

  const currentBootcamp = bootcampData[id] || bootcampData.woowa;

  const applyStudyRoom = (roomId: string, roomTitle: string) => {
    console.log(`Applying to room: ${roomId}`);
    toast.success(`${roomTitle} 스터디룸에 신청했습니다!`);
    // 실제로는 서버에 신청 요청을 보내고 상태를 업데이트
  };

  const approveApplicant = (roomId: string, applicantId: string) => {
    console.log(`Approving applicant ${applicantId} for room ${roomId}`);
    toast.success("신청자를 승인했습니다!");
    // 실제로는 서버에 승인 요청을 보내고 상태를 업데이트
  };

  const createStudyRoom = (stage: string) => {
    const newRoomId = `room_${Date.now()}`;
    console.log(`Creating new ${stage} study room`);
    toast.success(`${stage} 스터디룸을 생성했습니다!`);
    navigate(`/chatroom/${newRoomId}`);
  };

  const bookCoffeeChat = (mentorName: string, slot: string) => {
    console.log(`Booking coffee chat with ${mentorName} at ${slot}`);
    toast.success(`${mentorName}님과 커피챗이 예약되었습니다! (${slot})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentBootcamp.name}</h1>
              <p className="text-gray-600">{currentBootcamp.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">부트캠프 소개</TabsTrigger>
            <TabsTrigger value="study">스터디룸</TabsTrigger>
            <TabsTrigger value="coffee">커피챗</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>프로그램 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{currentBootcamp.fullDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">교육 기간:</span> {currentBootcamp.duration}
                  </div>
                  <div>
                    <span className="font-semibold">지원 마감:</span> {currentBootcamp.nextDeadline}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {currentBootcamp.stages.map((stage) => (
                    <Badge key={stage} variant="secondary">{stage}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study" className="space-y-6">
            {/* Stage Filter */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["전체", "코딩테스트", "면접", "자기소개서"].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setStageFilter(stage)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                      stageFilter === stage
                        ? "bg-white text-blue-600 shadow-sm font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStudyRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{room.title}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mt-1">{room.stage}</Badge>
                        </CardDescription>
                      </div>
                      <Badge variant={room.status === 'confirmed' ? 'default' : room.status === 'recruiting' ? 'secondary' : 'outline'}>
                        {room.status === 'confirmed' ? '모집 종료' : room.status === 'recruiting' ? '모집 중' : '대기중'}
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
                    {room.status === 'confirmed' ? (
                      <Button className="w-full" disabled>
                        모집 완료
                      </Button>
                    ) : room.status === 'recruiting' ? (
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={() => applyStudyRoom(room.id, room.title)}
                          disabled={room.applicants.includes("u123")}
                        >
                          {room.applicants.includes("u123") ? '신청 완료' : '신청하기'}
                        </Button>
                        {room.hostId === "u999" && room.applicants.length > 0 && (
                          <div className="text-sm text-gray-600">
                            <p className="mb-1">신청자 목록:</p>
                            {room.applicants.map((applicantId) => (
                              <div key={applicantId} className="flex justify-between items-center">
                                <span>{applicantId}</span>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => approveApplicant(room.id, applicantId)}
                                >
                                  승인
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => applyStudyRoom(room.id, room.title)}
                        disabled={room.participants >= room.maxParticipants}
                      >
                        {room.participants >= room.maxParticipants ? '정원 마감' : '신청하기'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-semibold mb-4">새 스터디룸 만들기</h3>
                <div className="space-x-4">
                  <Button onClick={() => createStudyRoom('코딩테스트')}>
                    코딩테스트 스터디
                  </Button>
                  <Button variant="outline" onClick={() => createStudyRoom('면접')}>
                    면접 스터디
                  </Button>
                  <Button variant="outline" onClick={() => createStudyRoom('자기소개서')}>
                    자기소개서 스터디
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coffee" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {alumni.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.field} • {mentor.company}</CardDescription>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {mentor.rating} ({mentor.reviews}개 후기)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">예약 가능 시간</h4>
                      <div className="space-y-2">
                        {mentor.availableSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => bookCoffeeChat(mentor.name, slot)}
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BootcampDetail;
