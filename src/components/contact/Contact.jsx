import { useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Spinner from "../spinner/Spinner";
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import {
  contactDescriptionVariants,
  contactAnimationVariants,
  contactFormVariants,
  contactSuccessVariants,
} from "../../animations/variants"; 
import "./contact.css";
import SectionHeader from "../SectionHeader";

const Contact = () => {
  const { t } = useTranslation("main");
  const [state, handleSubmit] = useForm("xqazqwbr");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const contactLinks = [
    { label: "Email", value: "abdelrahman.ragab.abdelbaky@gmail.com", note: "Drop me a line", href: "mailto:abdelrahman.ragab.abdelbaky@gmail.com", icon: Mail },
    { label: "LinkedIn", value: "abdelrahman-ragab", note: "Let’s connect", href: "https://linkedin.com/in/abdelrahman-ragab-9443b8264", icon: Linkedin },
    { label: "GitHub", value: "Abdelrahman5243", note: "See my work", href: "https://github.com/Abdelrahman5243", icon: Github },
    { label: "WhatsApp", value: "+20 102 168 7760", note: "Chat directly", href: "https://wa.me/201021687760", icon: MessageCircle },
  ];

  return (
    <section id="contact" className="section-block contact-closing" ref={ref}>
      <SectionHeader title={t("contact.title")} eyebrow="06 / CONTACT" layout="stacked" />

      <motion.p
        variants={contactDescriptionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="description mb-8 leading-6 max-w-2xl"
      >
        {t("contact.description")}
      </motion.p>

      <motion.div
        className="contact-grid"
        variants={contactAnimationVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {contactLinks.map(({ label, value, note, href, icon: Icon }) => (
          <a className="contact-card" href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
            <span className="contact-card-icon"><Icon size={20} strokeWidth={1.8} /></span>
            <span className="contact-card-copy">
              <span className="contact-card-label">{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </span>
            <ArrowUpRight className="contact-card-arrow" size={18} aria-hidden="true" />
          </a>
        ))}
      </motion.div>

      <motion.div
        className="contact-form-panel"
        variants={contactFormVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="contact-form-heading">
          <span className="contact-card-label">{t("contact.form.kicker", "Have a project in mind?")}</span>
          <h2>{t("contact.form.title", "Send me a message")}</h2>
        </div>
        <form onSubmit={handleSubmit} aria-labelledby="contact-form-title">
          <label htmlFor="email">{t("contact.form.emailLabel")}</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            placeholder={t("contact.form.emailPlaceholder")}
            className="form-input"
            aria-required="true"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="message">{t("contact.form.messageLabel")}</label>
          <textarea
            name="message"
            id="message"
            required
            rows="5"
            placeholder={t("contact.form.messagePlaceholder")}
            className="form-input resize-none"
            aria-required="true"
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button type="submit" disabled={state.submitting} className="form-button">
            {state.submitting && <Spinner />}
            {t("contact.submitButton")}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>

          {state.succeeded && (
            <motion.p variants={contactSuccessVariants} initial="hidden" animate="visible" className="contact-success">
              {t("contact.successMessage")}
            </motion.p>
          )}
        </form>
      </motion.div>

      <motion.div
        className="contact-footer-note"
        variants={contactAnimationVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span>{t("contact.footerPrompt", "Prefer a quick chat?")}</span>
        <a href="mailto:abdelrahman.ragab.abdelbaky@gmail.com">{t("contact.footerAction", "Send me an email")}</a>
      </motion.div>
    </section>
  );
};

export default Contact;
