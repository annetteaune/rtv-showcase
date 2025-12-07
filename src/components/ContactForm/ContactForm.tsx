import { useState } from "react";
import { z } from "zod";
import classes from "./ContactForm.module.css";
import { submitForm } from "../../utils/api";

interface ContactFormProps {
  email: string;
  name: string;
  message: string;
}

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

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
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
    // clear error upon typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationResult = contactFormSchema.safeParse(formInput);

    // if validation fails, set errors
    if (!validationResult.success) {
      const errors: { name?: string; email?: string; message?: string } = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors;
        if (field) {
          errors[field] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    // clear prev errors if validation is sucessful
    setFieldErrors({});
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
            id="name"
            name="name"
            placeholder="Name"
            value={formInput.name}
            onChange={handleChange}
          />
          {fieldErrors.name && (
            <span className={classes.errorMessage}>{fieldErrors.name}</span>
          )}
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formInput.email}
            onChange={handleChange}
          />
          {fieldErrors.email && (
            <span className={classes.errorMessage}>{fieldErrors.email}</span>
          )}
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formInput.message}
            onChange={handleChange}
          />
          {fieldErrors.message && (
            <span className={classes.errorMessage}>{fieldErrors.message}</span>
          )}
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
