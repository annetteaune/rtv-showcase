import { useState } from "react";
import classes from "../App.module.css";
import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "../components/ContactForm/ContactForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className={classes.card}>
        <ContactForm email="" name="" message="" />
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
