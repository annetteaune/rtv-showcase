import { Menu } from "../Menu/Menu";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <h1>RTV Showcase</h1>
      <Menu />
    </header>
  );
}
