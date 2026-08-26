import './CopyrightTitle.css';

function CopyrightTitle({ isVisible = true, dark = false }) {
  if (!isVisible) return null;

  return (
    <footer className={`copyright-footer ${dark ? 'copyright-footer--dark' : 'copyright-footer--light'}`}>
      <p className="copyright-text">© 2026 Rayan Roshan. All rights reserved.</p>
    </footer>
  );
}

export default CopyrightTitle;