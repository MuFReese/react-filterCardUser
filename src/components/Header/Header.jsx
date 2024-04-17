import classes from './header.module.css'


export default function Header() {

  return(
    <>
      <header className={classes.header}>
        <h1 className={classes.label}>User list</h1>
      </header>
    </>
  )
}