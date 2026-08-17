import { FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import {
  SiJavascript,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiGraphql,
  SiApollographql,
  SiAxios,
  SiReactrouter,
  SiI18Next,
  SiFramer,
  SiVite,
} from "react-icons/si";

const TECH_LOGOS = [
  { key: "javascript", icon: SiJavascript, label: "JavaScript", className: "text-[#F7DF1E]" },
  { key: "html5", icon: SiHtml5, label: "HTML5", className: "text-[#E34F26]" },
  { key: "react", icon: SiReact, label: "React", className: "text-[#61DAFB]" },
  {
    key: "nextjs",
    icon: SiNextdotjs,
    label: "Next.js",
    className: "text-light-title dark:text-dark-title",
  },
  { key: "redux", icon: SiRedux, label: "Redux Toolkit", className: "text-[#764ABC]" },
  { key: "tailwind", icon: SiTailwindcss, label: "Tailwind CSS", className: "text-[#38BDF8]" },
  { key: "bootstrap", icon: SiBootstrap, label: "Bootstrap", className: "text-[#7952B3]" },
  { key: "graphql", icon: SiGraphql, label: "GraphQL", className: "text-[#E10098]" },
  {
    key: "apollo",
    icon: SiApollographql,
    label: "Apollo Client",
    className: "text-[#311C87] dark:text-[#8571E5]",
  },
  { key: "axios", icon: SiAxios, label: "Axios", className: "text-[#5A29E4]" },
  {
    key: "reactrouter",
    icon: SiReactrouter,
    label: "React Router DOM",
    className: "text-[#CA4245]",
  },
  { key: "i18next", icon: SiI18Next, label: "i18next", className: "text-[#26A69A]" },
  {
    key: "framer",
    icon: SiFramer,
    label: "Framer Motion",
    className: "text-light-title dark:text-dark-title",
  },
  { key: "vite", icon: SiVite, label: "Vite", className: "text-[#646CFF]" },
  { key: "git", icon: FaGitAlt, label: "Git", className: "text-[#F05032]" },
  {
    key: "github",
    icon: FaGithub,
    label: "GitHub",
    className: "text-light-title dark:text-dark-title",
  },
  { key: "figma", icon: FaFigma, label: "Figma", className: "text-[#F24E1E]" },
];

const TechMarquee = () => {
  const track = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <div
      dir="ltr"
      className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      <div className="flex w-max gap-12 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <span
              key={`${tech.key}-${i}`}
              title={tech.label}
              className={`flex items-center justify-center flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-200 ${tech.className}`}
            >
              <Icon size={30} />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TechMarquee;
