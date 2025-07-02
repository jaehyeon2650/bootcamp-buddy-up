
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Video, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recruiting");
  
  const bootcamps = [
    {
      id: "woowa",
      name: "우아한테크코스",
      description: "웹 백엔드 집중 부트캠프",
      stages: ["코딩테스트", "면접"],
      studyRooms: 12,
      activeUsers: 45,
      nextDeadline: "2025-07-15",
      status: "모집 중",
      popularity: 5
    },
    {
      id: "ssafy",
      name: "삼성 청년 SW 아카데미",
      description: "프론트엔드/백엔드 통합 교육",
      stages: ["적성검사", "면접"],
      studyRooms: 8,
      activeUsers: 32,
      nextDeadline: "2025-08-01",
      status: "모집 중",
      popularity: 4
    },
    {
      id: "boostcamp",
      name: "네이버 부스트캠프",
      description: "AI Tech & Web/Mobile 과정",
      stages: ["코딩테스트", "프로젝트", "면접"],
      studyRooms: 15,
      activeUsers: 67,
      nextDeadline: "2025-07-20",
      status: "모집 예정",
      popularity: 5
    },
    {
      id: "42seoul",
      name: "42 서울",
      description: "혁신적인 소프트웨어 교육",
      stages: ["라피신", "온라인 테스트"],
      studyRooms: 20,
      activeUsers: 89,
      nextDeadline: "2025-09-01",
      status: "모집 예정",
      popularity: 3
    }
  ];

  const filteredBootcamps = bootcamps.filter(bootcamp => {
    if (activeTab === "recruiting") return bootcamp.status === "모집 중";
    if (activeTab === "upcoming") return bootcamp.status === "모집 예정";
    if (activeTab === "popular") return true;
    return true;
  }).sort((a, b) => {
    if (activeTab === "popular") return b.popularity - a.popularity;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">부트캠프 버디업</h1>
              </div>
              <Button variant="outline" onClick={() => navigate("/profile")}>
                내 프로필
              </Button>
            </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            부트캠프 준비, 혼자 하지 마세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            실시간 스터디룸과 졸업생 멘토링으로 함께 성장하는 커뮤니티
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Video className="w-5 h-5 mr-2" />
              화면 공유 스터디
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              실시간 채팅
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              멘토 커피챗
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamps Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            부트캠프 둘러보기
          </h3>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("recruiting")}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === "recruiting"
                    ? "bg-white text-blue-600 shadow-sm font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                모집 중
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === "upcoming"
                    ? "bg-white text-blue-600 shadow-sm font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                모집 예정
              </button>
              <button
                onClick={() => setActiveTab("popular")}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === "popular"
                    ? "bg-white text-blue-600 shadow-sm font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                인기순
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBootcamps.map((bootcamp) => (
              <Card 
                key={bootcamp.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(`/bootcamp/${bootcamp.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {bootcamp.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {bootcamp.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {bootcamp.activeUsers}명 활동중
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {bootcamp.stages.map((stage) => (
                        <Badge key={stage} variant="outline">
                          {stage}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {bootcamp.studyRooms}개 스터디룸
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        마감 {bootcamp.nextDeadline}
                      </span>
                    </div>
                    
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      스터디 참여하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
