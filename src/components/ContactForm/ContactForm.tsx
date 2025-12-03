import { useState } from "react";
import classes from "./ContactForm.module.css";
import { submitForm } from "../../utils/api";

interface ContactFormProps {
  email: string;
  name: string;
  message: string;
}

export default function ContactForm({
  email,
  name,
  message,
}: ContactFormProps) {
  const [formInput, setFormInput] = useState({
    name: name,
    email: email,
    message: message,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailRegex.test(formInput.email)) {
      setSubmissionResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await submitForm(formInput);
      setSubmissionResult(result);
      if (result.success) {
        setFormInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      setSubmissionResult({
        success: false,
        message: "Failed to submit form",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className={classes.contactFormWrapper}>
      <h2>Contact us</h2>
      <form className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formInput.name}
            onChange={handleChange}
          />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formInput.email}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            placeholder="Message"
            value={formInput.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {submissionResult && (
        <div className={classes.submissionResult}>
          {submissionResult.success
            ? "Form submitted successfully"
            : submissionResult.message}
        </div>
      )}
    </section>
  );
}
