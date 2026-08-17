import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { HERO_CONTENT } from "./heroContent.js";
import { ExternalLink, MapPin, ArrowDown } from "lucide-react";
import { external_link_click, button_click } from "../../analytics";

const Hero = () => {
  const { t } = useTranslation("main");

  return (
    <section id="about" aria-labelledby="hero-title" className="flex flex-col items-center px-4">
      <div className="flex mt-8 items-center flex-col-reverse md:flex-row py-8">
        <div className="left-section w-full text-center relative">
          <div className="flex justify-center mb-5">
            <span
              className="
                inline-flex items-center gap-2
                py-1.5 pl-2.5 pr-3.5
                rounded-full
                border border-light-border dark:border-dark-border
                bg-light-secondary/80 dark:bg-dark-secondary/80
                text-xs sm:text-sm font-medium
                text-light-subtitle dark:text-dark-subtitle
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{t("hero.openToWork", "Open to Work")}</span>
            </span>
          </div>

          <h1
            id="hero-title"
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-bold leading-tight
              text-light-title dark:text-dark-title
            "
          >
            {t(HERO_CONTENT.titleKey)}
          </h1>

          <h2
            className="
              mt-2
              text-base sm:text-lg md:text-xl lg:text-2xl
              font-medium tracking-wide
              text-light-blue dark:text-dark-blue
            "
          >
            {t("hero.jobTitle", "Front-End Developer")}
          </h2>

          <div className="flex justify-center mt-3">
            <span
              className="
                inline-flex items-center gap-1
                text-xs sm:text-sm font-medium
                text-light-subtitle dark:text-dark-subtitle
              "
            >
              <MapPin size={13} className="text-light-blue dark:text-dark-blue" />
              {t("hero.location", "Cairo, Egypt")}
            </span>
          </div>

          <p
            className="
              mt-4
              text-sm sm:text-base md:text-lg lg:text-xl
              text-light-subtitle dark:text-dark-subtitle
              max-w-2xl mx-auto
            "
            style={{ lineHeight: 1.8 }}
          >
            {t(HERO_CONTENT.descriptionKey)}
          </p>

          <div className="flex m-auto gap-4 mb-8 max-w-max mt-6 flex-wrap justify-center">
            <div>
              <HashLink
                to="/#projects"
                className="
                  relative py-3 px-8
                  bg-light-blue dark:bg-dark-blue
                  text-sm font-semibold
                  text-white
                  rounded-full flex gap-2 items-center justify-center
                  transition-opacity duration-200
                  hover:opacity-90
                "
                aria-label="View Projects"
                onClick={() =>
                  // Example: CTA button click tracking.
                  button_click({ label: "View Projects", location: "hero", variant: "primary" })
                }
              >
                <span>{t("hero.viewProjects")}</span>
                <ArrowDown size={15} />
              </HashLink>
            </div>

            <a
              href={HERO_CONTENT.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative py-3 px-8
                border border-light-border dark:border-dark-border
                bg-light-secondary/80 dark:bg-dark-secondary/80
                text-sm font-semibold
                text-light-title dark:text-dark-title
                rounded-full flex gap-2 items-center justify-center
                transition-colors duration-200
                hover:border-light-blue dark:hover:border-dark-blue
                hover:text-light-blue dark:hover:text-dark-blue
              "
              aria-label="Preview CV"
              onClick={() =>
                // Example: external link click tracking.
                external_link_click({
                  url: HERO_CONTENT.cvUrl,
                  label: "Preview CV",
                  location: "hero",
                })
              }
            >
              <span>{t(HERO_CONTENT.showCVKey)}</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>

      <div
        className="
          flex gap-6 mb-8
          text-lg sm:text-xl md:text-2xl
          dark:text-dark-subtitle text-light-subtitle
        "
      >
        {HERO_CONTENT.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-200"
            aria-label={link.ariaLabel}
            onClick={() =>
              // Example: external link click tracking (social profiles).
              external_link_click({
                url: link.href,
                label: link.ariaLabel,
                location: "hero_social",
              })
            }
          >
            <link.icon size="1em" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
