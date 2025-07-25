import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
} from "react";
import { useForm, ValidationError } from "@formspree/react";
import Spinner from "../spinner/Spinner";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import "./contact.css"

const Lottie = React.lazy(() => import("lottie-react"));

const Contact = () => {
  const { t } = useTranslation("main");
  const [state, handleSubmit] = useForm("xqazqwbr");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load animation JSON only when in view
    if (isInView && !animationData) {
      import("../../assets/animation/contact.json").then((mod) =>
        setAnimationData(mod.default || mod)
      );
    }
  }, [isInView, animationData]);

  return (
    <section id="contact" className="my-8" ref={ref}>
      <div className="flex gap-4 items-center mb-4 text-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Mail className="section-title" aria-hidden="true" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="title mb-0"
        >
          {t("contact.title")}
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="description mb-8 leading-6"
      >
        {t("contact.description")}
      </motion.p>

      <div className="flex my-8 items-center flex-col-reverse md:flex-row">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-4 mb-6 modal-text"
          aria-labelledby="contact-form"
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
            {animationData && (
              <Lottie
                className="contact-animation h-[355px]"
                animationData={animationData}
                aria-label="contact animation"
                role="img"
              />
            )}
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
