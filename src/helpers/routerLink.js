const routerLink = ({href, children}) =>
  href.match(/^(https?:)?\/\//)
    ? <a href={href}>{children}</a>
    : <Link to={href}>{children}</Link>

export default routerLink;
