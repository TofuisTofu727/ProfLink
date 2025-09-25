import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";

interface Appointment {
  id: string;
  facultyName: string;
  facultyTitle: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
  location: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onAddNote: (id: string) => void;
  onCancel: (id: string) => void;
}

const AppointmentCard = ({ appointment, onAddNote, onCancel }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": return "bg-accent text-accent-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{appointment.facultyName}</CardTitle>
            <CardDescription>{appointment.facultyTitle}</CardDescription>
          </div>
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{appointment.time} ({appointment.duration})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{appointment.location}</span>
        </div>

        {appointment.notes && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              {appointment.notes}
            </p>
          </div>
        )}

        {appointment.status === "upcoming" && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onAddNote(appointment.id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Note
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onCancel(appointment.id)}
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const sampleAppointments: Appointment[] = [
  {
    id: "1",
    facultyName: "Dr. Sarah Chen",
    facultyTitle: "Professor, Computer Science",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: "30 min",
    status: "upcoming",
    location: "CS Building, Room 301"
  },
  {
    id: "2",
    facultyName: "Prof. Michael Rodriguez",
    facultyTitle: "Associate Professor, Mathematics", 
    date: "Dec 20, 2024",
    time: "10:00 AM",
    duration: "45 min",
    status: "completed",
    notes: "Discussed thesis methodology and statistical analysis approaches.",
    location: "Math Building, Room 205"
  }
];

export const StudentDashboard = () => {
  const handleAddNote = (id: string) => {
    console.log("Add note for appointment:", id);
  };

  const handleCancel = (id: string) => {
    console.log("Cancel appointment:", id);
  };

  const upcomingAppointments = sampleAppointments.filter(app => app.status === "upcoming");
  const pastAppointments = sampleAppointments.filter(app => app.status !== "upcoming");

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">My Consultations</h1>
        <p className="text-muted-foreground">Manage your appointments and notes</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Appointments
          </h2>
          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onAddNote={handleAddNote}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4" variant="default">
                  Browse Faculty
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
          {pastAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onAddNote={handleAddNote}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No past appointments</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};