import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookBookmark,
  faPlus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <section className="navbar">
      <div className="home">
        <Link to="/">
          <span>
            <FontAwesomeIcon icon={faBookBookmark} />
          </span>
        </Link>
      </div>
      <div className="menu">
        <Link to="/add">
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </Link>
        <Link to="/edit">
          <span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
