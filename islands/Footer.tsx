export const Footer = () => {
  const date = new Date();

  return <div class={"footer"}>&copy; {date.getFullYear()} Paul Jacks</div>;
};

export default Footer;
