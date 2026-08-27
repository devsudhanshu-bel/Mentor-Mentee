import {
  FileText,
  MessageCircle,
  CheckSquare,
  BookOpen,
  Star,
  CalendarDays,
} from "lucide-react";

export const sidebarItems = [
  {
    id: "notes",
    title: "Meeting Notes",
    icon: FileText,
  },
  {
    id: "discussion",
    title: "Discussion",
    icon: MessageCircle,
  },
  {
    id: "actions",
    title: "Action Items",
    icon: CheckSquare,
  },
  {
    id: "resources",
    title: "Resources",
    icon: BookOpen,
  },
  {
    id: "feedback",
    title: "Feedback",
    icon: Star,
  },
  {
    id: "followup",
    title: "Follow-up",
    icon: CalendarDays,
  },
];