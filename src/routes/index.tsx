import { useState } from "react";
import classes from "../App.module.css";
import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "../components/ContactForm/ContactForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(1);
  const handleCounter = () => {
    setCount((prevCount) => {
      if (prevCount >= 10) {
        return 1;
      }
      return prevCount + 1;
    });
  };
  return (
    <>
      <main className={classes.card}>
        <button className={classes.counterButton} onClick={handleCounter}>
          count is {count}
        </button>{" "}
        <ContactForm email="" name="" message="" />
      </main>
    </>
  );
}
