import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/animation/contact.json";
import Spinner from "../Spinner/Spinner";
import { MdMail } from "react-icons/md";

const Contact = () => {
  const [state, handleSubmit] = useForm("xqazqwbr");

  return (
    <section className="contact-us my-8">
      <div className="flex gap-4 items-center mb-4 text-3xl">
        <MdMail className="text-light-title dark:text-dark-subtitle" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-light-title dark:text-dark-title">
          Contact Us
        </h1>
      </div>

      <p className="text-light-subtitle dark:text-dark-subtitle mb-8 leading-6">
        Contact us for more information and get notified when we publish
        something new.
      </p>

      <div className="flex justify-between">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-4 mb-6 text-light-subtitle dark:text-dark-subtitle"
        >
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
            className="border border-light-border dark:border-dark-border p-2 
                       focus:outline-none bg-dark-title dark:bg-light-title 
                       rounded-md transition-colors duration-300 
                       focus:border-teal-500 hover:border-teal-500"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="message">Your Message:</label>
          <textarea
            name="message"
            id="message"
            required
            rows="6"
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
            Submit
          </button>

          {state.succeeded && (
            <p className="text-xl mt-6">
              Your message has been sent successfully 👌
            </p>
          )}
        </form>

        <div className="w-1/2 hidden lg:block">
          {/* <Lottie
            className="contact-animation h-[355px]"
            animationData={contactAnimation}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
