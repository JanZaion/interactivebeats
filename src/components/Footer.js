const Footer = () => {
  console.log(window.innerHeight);
  return (
    <footer className="contentBox">
      <div className="footerDivider" />
      Developed by Jan Zaion. If you like this project, consider starring it on&nbsp;
      <a href="https://github.com/JanZaion/bossequencer" target="about:blank" className="githubLink">
        Github
      </a>
    </footer>
  );
};

export default Footer;
