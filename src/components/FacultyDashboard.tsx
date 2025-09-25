import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Plus, Settings, Users } from "lucide-react";
import { useState } from "react";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  duration: string;
  available: boolean;
  bookedBy?: string;
}

interface FacultyRequest {
  id: string;
  studentName: string;
  requestedDate: string;
  requestedTime: string;
  message: string;
  status: "pending" | "approved" | "declined";
}

const sampleTimeSlots: TimeSlot[] = [
  {
    id: "1",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: "30 min",
    available: false,
    bookedBy: "John Doe"
  },
  {
    id: "2", 
    date: "Tomorrow",
    time: "3:00 PM",
    duration: "30 min",
    available: true
  },
  {
    id: "3",
    date: "Friday",
    time: "10:00 AM", 
    duration: "45 min",
    available: true
  }
];

const sampleRequests: FacultyRequest[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    requestedDate: "Dec 23, 2024",
    requestedTime: "3:30 PM",
    message: "I'd like to discuss my research proposal and get feedback on methodology.",
    status: "pending"
  }
];

export const FacultyDashboard = () => {
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotDuration, setNewSlotDuration] = useState("30");

  const handleApproveRequest = (id: string) => {
    console.log("Approve request:", id);
  };

  const handleDeclineRequest = (id: string) => {
    console.log("Decline request:", id);
  };

  const handleAddTimeSlot = () => {
    console.log("Add time slot:", { date: newSlotDate, time: newSlotTime, duration: newSlotDuration });
  };

  const pendingRequests = sampleRequests.filter(req => req.status === "pending");
  const upcomingAppointments = sampleTimeSlots.filter(slot => !slot.available);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Manage your office hours and consultations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Pending Requests ({pendingRequests.length})
            </CardTitle>
            <CardDescription>Review and respond to consultation requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{request.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {request.requestedDate} at {request.requestedTime}
                      </p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <p className="text-sm">{request.message}</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeclineRequest(request.id)}>
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No pending requests</p>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Upcoming Appointments ({upcomingAppointments.length})
            </CardTitle>
            <CardDescription>Your scheduled consultations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((slot) => (
                <div key={slot.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{slot.bookedBy}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{slot.date}</span>
                        <span>{slot.time}</span>
                        <span>({slot.duration})</span>
                      </div>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">Confirmed</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No upcoming appointments</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Manage Office Hours
          </CardTitle>
          <CardDescription>Add new available time slots for consultations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newSlotDate}
                onChange={(e) => setNewSlotDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newSlotTime}
                onChange={(e) => setNewSlotTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input
                id="duration"
                type="number"
                value={newSlotDuration}
                onChange={(e) => setNewSlotDuration(e.target.value)}
                min="15"
                max="120"
                step="15"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddTimeSlot} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Slot
              </Button>
            </div>
          </div>

          {/* Current Time Slots */}
          <div className="space-y-2">
            <h4 className="font-medium">Current Time Slots</h4>
            <div className="grid gap-2 md:grid-cols-3">
              {sampleTimeSlots.map((slot) => (
                <div 
                  key={slot.id} 
                  className={`p-3 border rounded-lg ${
                    slot.available 
                      ? "border-accent bg-accent/5" 
                      : "border-muted bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium">{slot.date} {slot.time}</div>
                      <div className="text-muted-foreground">({slot.duration})</div>
                    </div>
                    <Badge variant={slot.available ? "secondary" : "outline"}>
                      {slot.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};