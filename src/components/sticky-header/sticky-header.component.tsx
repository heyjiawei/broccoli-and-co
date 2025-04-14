import classes from "./style.module.css";

export default function StickyHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className={`${classes.sticky} ${classes.container}`}>
      {children}
    </header>
  );
}
