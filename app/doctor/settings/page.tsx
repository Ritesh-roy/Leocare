"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Clock, Shield, Camera } from "lucide-react"

export default function DoctorSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <User size={20} className="text-primary" />
            <CardTitle>Profile Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Dr. Sarah Wilson</h3>
              <p className="text-muted-foreground">Cardiologist</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Dr. Sarah Wilson" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah.wilson@leocare.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input id="specialty" defaultValue="Cardiology" className="mt-2" />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue="Board-certified cardiologist with expertise in preventive cardiology and heart disease management."
              className="mt-2"
              rows={3}
            />
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Availability Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-primary" />
            <CardTitle>Availability</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Accept Video Consultations</p>
              <p className="text-sm text-muted-foreground">Allow patients to book video calls</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Accept Walk-in Appointments</p>
              <p className="text-sm text-muted-foreground">Allow in-person appointments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div>
            <div>
              <Label>Consultation Duration</Label>
              <Input defaultValue="30 minutes" className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">New Appointment Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified for new bookings</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">Receive reminders before appointments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Patient Messages</p>
              <p className="text-sm text-muted-foreground">Get notified for new messages</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
