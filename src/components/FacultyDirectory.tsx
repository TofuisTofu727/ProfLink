import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, Star, Calendar } from "lucide-react";
import { useState } from "react";

interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  specializations: string[];
  avatar?: string;
  rating: number;
  officeLocation: string;
  nextAvailable: string;
}

interface FacultyCardProps {
  faculty: FacultyMember;
  onViewProfile: (id: string) => void;
}

export const FacultyCard = ({ faculty, onViewProfile }: FacultyCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={faculty.avatar} alt={faculty.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-medium">
              {faculty.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight">{faculty.name}</CardTitle>
            <CardDescription className="text-sm font-medium text-primary">{faculty.title}</CardDescription>
            <CardDescription className="text-xs">{faculty.department}</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-sm text-accent">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{faculty.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {faculty.specializations.slice(0, 3).map((spec, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
          {faculty.specializations.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{faculty.specializations.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{faculty.officeLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Next available: {faculty.nextAvailable}</span>
          </div>
        </div>
        
        <Button 
          onClick={() => onViewProfile(faculty.id)}
          className="w-full"
          variant="default"
        >
          <Calendar className="h-4 w-4 mr-2" />
          View Profile & Book
        </Button>
      </CardContent>
    </Card>
  );
};

const sampleFaculty: FacultyMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Professor",
    department: "Computer Science",
    specializations: ["Machine Learning", "Data Science", "AI Ethics"],
    rating: 4.8,
    officeLocation: "CS Building, Room 301",
    nextAvailable: "Tomorrow 2:00 PM"
  },
  {
    id: "2", 
    name: "Prof. Michael Rodriguez",
    title: "Associate Professor",
    department: "Mathematics",
    specializations: ["Statistics", "Calculus", "Research Methods"],
    rating: 4.9,
    officeLocation: "Math Building, Room 205",
    nextAvailable: "Today 4:30 PM"
  },
  {
    id: "3",
    name: "Dr. Emily Johnson",
    title: "Assistant Professor", 
    department: "Physics",
    specializations: ["Quantum Physics", "Lab Techniques", "Thesis Guidance"],
    rating: 4.7,
    officeLocation: "Physics Lab, Room 102",
    nextAvailable: "Friday 10:00 AM"
  }
];

export const FacultyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = sampleFaculty.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewProfile = (id: string) => {
    // This would typically navigate to a detailed profile page
    console.log("View profile for faculty ID:", id);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Find Your Faculty</h2>
        <p className="text-muted-foreground">Browse available faculty and book consultations</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFaculty.map((faculty) => (
          <FacultyCard
            key={faculty.id}
            faculty={faculty}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>
    </div>
  );
};