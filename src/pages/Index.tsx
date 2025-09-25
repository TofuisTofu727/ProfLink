import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FacultyDirectory } from "@/components/FacultyDirectory";
import { StudentDashboard } from "@/components/StudentDashboard";
import { FacultyDashboard } from "@/components/FacultyDashboard";
import { GraduationCap, Users, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-consultation.jpg";

type ViewType = "home" | "student-dashboard" | "faculty-dashboard" | "browse-faculty";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const renderCurrentView = () => {
    switch (currentView) {
      case "student-dashboard":
        return <StudentDashboard />;
      case "faculty-dashboard":
        return <FacultyDashboard />;
      case "browse-faculty":
        return <FacultyDirectory />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView("home")}
              className="text-xl font-bold text-primary hover:text-primary-glow"
            >
              <GraduationCap className="h-6 w-6 mr-2" />
              ProfLink
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("browse-faculty")}
              >
                Browse Faculty
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("student-dashboard")}
              >
                Student Portal
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView("faculty-dashboard")}
              >
                Faculty Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

const HomeView = ({ onNavigate }: { onNavigate: (view: ViewType) => void }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Connect Students with Faculty
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Streamline academic consultations with our simple booking platform. 
            Browse faculty, book appointments, and manage your academic meetings all in one place.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <img 
            src={heroImage} 
            alt="Students and faculty in consultation"
            className="rounded-2xl shadow-elegant w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => onNavigate("browse-faculty")}
            className="text-lg px-8"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Browse Faculty
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => onNavigate("student-dashboard")}
            className="text-lg px-8"
          >
            <Users className="h-5 w-5 mr-2" />
            Student Portal
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 md:grid-cols-3">
        <Card className="text-center hover:shadow-card transition-all duration-300">
          <CardHeader>
            <Calendar className="h-12 w-12 mx-auto text-primary" />
            <CardTitle>Easy Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Browse faculty profiles, view available time slots, and book consultations with just a few clicks.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-card transition-all duration-300">
          <CardHeader>
            <Users className="h-12 w-12 mx-auto text-accent" />
            <CardTitle>Faculty Management</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Faculty can easily set office hours, manage appointment requests, and track upcoming meetings.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-card transition-all duration-300">
          <CardHeader>
            <GraduationCap className="h-12 w-12 mx-auto text-primary-glow" />
            <CardTitle>Academic Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Designed specifically for academic consultations with features like note-taking and specialization filtering.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Quick Access Section */}
      <section className="text-center space-y-8 py-8">
        <h2 className="text-3xl font-bold">Get Started</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer group" 
                onClick={() => onNavigate("student-dashboard")}>
            <div className="space-y-4">
              <Users className="h-16 w-16 mx-auto text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">I'm a Student</h3>
              <p className="text-muted-foreground">
                Book consultations, manage appointments, and add notes to your meetings.
              </p>
              <Button className="w-full">
                Access Student Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer group"
                onClick={() => onNavigate("faculty-dashboard")}>
            <div className="space-y-4">
              <GraduationCap className="h-16 w-16 mx-auto text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold">I'm Faculty</h3>
              <p className="text-muted-foreground">
                Set office hours, manage consultation requests, and track your appointments.
              </p>
              <Button variant="outline" className="w-full">
                Access Faculty Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;