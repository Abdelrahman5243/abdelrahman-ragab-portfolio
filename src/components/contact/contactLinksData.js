import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";

export const CONTACT_LINKS = [
  {
    key: "email",
    label: "Email",
    value: "abdelrahman.ragab.abdelbaky@gmail.com",
    description: "Drop me a line",
    href: "mailto:abdelrahman.ragab.abdelbaky@gmail.com",
    icon: Mail,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "abdelrahman-ragab",
    description: "Let's connect",
    href: "https://linkedin.com/in/abdelrahman-ragab-9443b8264",
    icon: Linkedin,
  },
  {
    key: "github",
    label: "GitHub",
    value: "Abdelrahman5243",
    description: "See my work",
    href: "https://github.com/Abdelrahman5243",
    icon: Github,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "+20 102 168 7760",
    description: "Chat directly",
    href: "https://wa.me/201021687760",
    icon: MessageCircle,
  },
];
