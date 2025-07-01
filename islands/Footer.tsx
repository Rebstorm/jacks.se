export const Footer = () => {
  const date = new Date();

  return <footer class="footer">&copy; 2023-{date.getFullYear()} Paul Jacks</footer>;
};

export default Footer;