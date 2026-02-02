import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaBriefcase, FaHome, FaSignOutAlt } from 'react-icons/fa';
import './index.css';

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="nav-header">
      <Link to="/" className="nav-logo">
        <FaBriefcase /> <span>JobBoard</span>
      </Link>
      <div className="nav-menu">
        <Link to="/" className="nav-link"><FaHome /> Home</Link>
        <Link to="/jobs" className="nav-link"><FaBriefcase /> Jobs</Link>
        <button className="logout-btn" onClick={onClickLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;