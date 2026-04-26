"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: "1",
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Thank you for the prescription, doctor.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    name: "Emma Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "When should I schedule my follow-up?",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "The medication is working well.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    name: "Sarah Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "I have uploaded my test results.",
    time: "Yesterday",
    unread: false,
  },
]

const messages = [
  { id: "1", sender: "patient", text: "Hello Doctor, I wanted to ask about my medication.", time: "10:30 AM" },
  { id: "2", sender: "doctor", text: "Hi John! Sure, what would you like to know?", time: "10:32 AM" },
  { id: "3", sender: "patient", text: "Should I take it before or after meals?", time: "10:33 AM" },
  { id: "4", sender: "doctor", text: "Take it 30 minutes before your meals for best results. Make sure to take it with a full glass of water.", time: "10:35 AM" },
  { id: "5", sender: "patient", text: "Thank you for the prescription, doctor.", time: "10:36 AM" },
]

export default function DoctorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with your patients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto px-3">
            <div className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                    selectedConversation.id === conv.id
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  )}
                >
                  <Avatar>
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-border py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{selectedConversation.name}</p>
                <p className="text-sm text-muted-foreground">Patient</p>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "doctor" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-2xl",
                    msg.sender === "doctor"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    msg.sender === "doctor" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Paperclip size={20} />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button size="icon">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
