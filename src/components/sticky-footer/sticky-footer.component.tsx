import classes from "./style.module.css";

export default function StickyFooter({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <footer className={`${classes.sticky} ${classes.container}`}>
      {children}
    </footer>
  );
}
