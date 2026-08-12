import { useRef, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Spinner from "../spinner/Spinner";
import { Mail, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import {
  contactIconVariants,
  contactTitleVariants,
  contactDescriptionVariants,
  contactFormVariants,
  contactAnimationVariants,
  contactSuccessVariants,
} from "../../animations/variants";
import { CONTACT_LINKS } from "./contactLinksData";
import "./contact.css";
import { button_click, form_submit, external_link_click } from "../../analytics";

const Contact = () => {
  const { t } = useTranslation("main");
  const [state, handleSubmit] = useForm("xqazqwbr");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const wasSubmitting = useRef(false);

  // Example: form_submit tracking. Formspree's `state.succeeded` flips once
  // per successful submission, so we fire on that transition (not on the
  // click) — this measures completed submissions, not just attempts.
  useEffect(() => {
    if (state.succeeded && wasSubmitting.current) {
      form_submit({ formName: "contact", formId: "xqazqwbr" });
    }
    wasSubmitting.current = state.submitting;
  }, [state.succeeded, state.submitting]);

  return (
    <section id="contact" className="my-16 w-full" ref={ref}>
      <div className="flex gap-4 items-center mb-4 text-3xl">
        <motion.div
          variants={contactIconVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Mail className="section-title" aria-hidden="true" />
        </motion.div>

        <motion.h2
          variants={contactTitleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="title mb-0"
        >
          {t("contact.title")}
        </motion.h2>
      </div>

      <motion.p
        variants={contactDescriptionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="description mb-8 leading-6"
      >
        {t("contact.description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 my-8 items-start">
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 modal-text"
          aria-labelledby="contact-form"
          variants={contactFormVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <label htmlFor="email">{t("contact.form.emailLabel")}</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
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
            rows="6"
            placeholder={t("contact.form.messagePlaceholder")}
            className="form-input resize-none"
            aria-required="true"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button
            type="submit"
            disabled={state.submitting}
            className="form-button relative"
            onClick={() =>
              // Example: CTA button click tracking (fires on click; actual
              // completion is tracked separately by the form_submit effect above).
              button_click({ label: "Send message", location: "contact_form", variant: "primary" })
            }
          >
            {state.submitting && (
              <Spinner className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            )}
            {t("contact.submitButton")}
          </button>

          {state.succeeded && (
            <motion.p
              variants={contactSuccessVariants}
              initial="hidden"
              animate="visible"
              className="text-xl mt-6"
            >
              {t("contact.successMessage")}
            </motion.p>
          )}
        </motion.form>

        <motion.div
          className="grid grid-cols-1 gap-3"
          variants={contactAnimationVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  // Example: external link click tracking (contact channels).
                  external_link_click({ url: link.href, label: link.label, location: "contact_links" })
                }
                className="
                  group relative flex items-center gap-4 p-4 rounded-2xl
                  border border-light-border dark:border-dark-border
                  bg-light-secondary/90 dark:bg-dark-secondary/90
                  transition-colors duration-300
                  hover:border-light-blue/60 dark:hover:border-dark-blue/60
                "
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-light-blue/10 dark:bg-dark-blue/10 text-light-blue dark:text-dark-blue flex-shrink-0">
                  <Icon size={19} />
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-light-subtitle dark:text-dark-subtitle mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-light-title dark:text-dark-title truncate">
                    {link.value}
                  </p>
                </div>

                <p className="hidden sm:block text-xs text-light-subtitle dark:text-dark-subtitle flex-shrink-0">
                  {link.description}
                </p>

                <ExternalLink size={15} className="text-light-subtitle dark:text-dark-subtitle opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
