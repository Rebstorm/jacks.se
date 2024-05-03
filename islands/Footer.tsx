export const Footer = () => {
  const date = new Date();

  return <div class={"footer"}>&copy; 2023-{date.getFullYear()} Paul Jacks</div>;
};

export default Footer;
