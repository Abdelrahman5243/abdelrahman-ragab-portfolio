import { Mail, Linkedin, Github, Codepen } from "lucide-react";

export const HERO_CONTENT = {
  titleKey: "hero.title",
  descriptionKey: "hero.description",
  showCVKey: "hero.showCV",
  cvUrl: "https://flowcv.com/resume/gsawfcbwff",
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
