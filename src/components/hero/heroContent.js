import { Mail, Linkedin, MessageCircle, Github, Codepen } from "lucide-react";

export const HERO_CONTENT = {
  titleKey: "hero.title",
  descriptionKey: "hero.description",
  showCVKey: "hero.showCV",
  cvUrl: "https://drive.google.com/file/d/1BRF9Q8cnHP5lJ86PbUodL65i1j2CR5rB/view",
  socialLinks: [
    {
      href: "mailto:abdelrahman.ragab.abdelbaky@gmail.com",
      icon: Mail,
      ariaLabel: "Send an email",
    },
    {
      href: "https://linkedin.com/in/abdelrahman-ragab-9443b8264",
      icon: Linkedin,
      ariaLabel: "LinkedIn profile",
    },
    {
      href: "https://wa.me/201021687760",
      icon: MessageCircle,
      ariaLabel: "WhatsApp",
    },
    {
      href: "https://github.com/Abdelrahman5243",
      icon: Github,
      ariaLabel: "GitHub profile",
    },
    {
      href: "https://codepen.io/Abdelrahman-Ragab",
      icon: Codepen,
      ariaLabel: "CodePen profile",
    },
  ],
};
