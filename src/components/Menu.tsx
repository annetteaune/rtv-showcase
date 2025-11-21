import classes from "./Menu.module.css";

export const Menu = () => {
  return (
    <nav className={classes.menu}>
      <span>
        <a href="/">Home</a>
      </span>
      <span>
        <a href="/about">About</a>
      </span>
    </nav>
  );
};
