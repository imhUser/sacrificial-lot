import ImhLogo from '../assets/logo/imh-logo.png'
import IvLogo from '../assets/logo/iv-logo.png'

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div>
          <a className="navbar-brand">
            <img
              src={ImhLogo}
              alt="Logo"
              className="d-inline-block align-text-top img-fluid"
            />
          </a>
          <a className="navbar-brand">
            <img
              src={IvLogo}
              alt="Logo"
              className="d-inline-block align-text-top img-fluid"
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
