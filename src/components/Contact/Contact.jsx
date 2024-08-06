import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/animation/contact.json";
import Spinner from "../Spinner/Spinner";
import { MdMail } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("main");
  const [state, handleSubmit] = useForm("xqazqwbr");

  return (
    <section id="contact" className="my-8">
      <div className="flex gap-4 items-center mb-4 text-3xl">
        <MdMail className="text-light-title dark:text-dark-subtitle" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-light-title dark:text-dark-title">
          {t("contact.title")}
        </h1>
      </div>

      <p className="text-light-subtitle dark:text-dark-subtitle mb-8 leading-6">
        {t("contact.description")}
      </p>

      <div className="flex my-8 items-center flex-col-reverse md:flex-row">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-4 mb-6 text-light-subtitle dark:text-dark-subtitle"
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
            <p className="text-xl mt-6">{t("contact.successMessage")}</p>
          )}
        </form>

        <div className="w-full md:w-1/2">
          <Lottie
            className="contact-animation h-[355px]"
            animationData={contactAnimation}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
