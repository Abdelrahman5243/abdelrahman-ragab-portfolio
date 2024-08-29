import React, { useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/animation/contact.json";
import Spinner from "../spinner/Spinner";
import { MdMail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const { t } = useTranslation("main");
  const [state, handleSubmit] = useForm("xqazqwbr");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contact" className="my-8" ref={ref}>
      <div className="flex gap-4 items-center mb-4 text-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6 }}
        >
          <MdMail
            className="text-light-title dark:text-dark-subtitle"
            aria-hidden="true"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="title mb-0"
        >
          {t("contact.title")}
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="description mb-8 leading-6"
      >
        {t("contact.description")}
      </motion.p>

      <div className="flex my-8 items-center flex-col-reverse md:flex-row">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-4 mb-6 text-light-subtitle dark:text-dark-subtitle"
          aria-labelledby="contact-form"
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
          transition={{ duration: 0.6 }}
        >
          <label htmlFor="email">{t("contact.form.emailLabel")}</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
            placeholder={t("contact.form.emailPlaceholder")}
            className="border border-light-border dark:border-dark-border p-2
                       focus:outline-none bg-dark-title dark:bg-light-title
                       rounded-md transition-colors duration-300
                       focus:border-teal-500 hover:border-teal-500"
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
            className="border border-light-border dark:border-dark-border p-2
                       focus:outline-none bg-dark-title dark:bg-light-title
                       rounded-md transition-colors duration-300
                       focus:border-teal-500 hover:border-teal-500 resize-none"
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
            className="relative max-w-max bg-light-title border-none
                       py-2 px-8 my-4 text-lg rounded-md flex items-center gap-4
                       transition-transform duration-300 hover:scale-95 text-dark-title"
          >
            {state.submitting && (
              <Spinner className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            )}
            {t("contact.submitButton")}
          </button>

          {state.succeeded && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xl mt-6"
            >
              {t("contact.successMessage")}
            </motion.p>
          )}
        </motion.form>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.6 }}
        >
          <Lottie
            className="contact-animation h-[355px]"
            animationData={contactAnimation}
            aria-label="contact animation"
            role="img"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
