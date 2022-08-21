import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookBookmark,
  faPlus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.css';
const homeIcon = require('../img/home_icon.PNG');
const addIcon = require('../img/add_icon.PNG');
const editIcon = require('../img/edit_icon2.PNG');

function Navbar() {
  return (
    <section className="navbar">
      <div className="home">
        <Link to="/">
          <img src={homeIcon} alt="home" />
        </Link>
      </div>
      <div className="menu">
        <span>
          <Link to="/add">
            <img src={addIcon} alt="add" />
          </Link>
        </span>
        <span>
          <Link to="/edit">
            <img src={editIcon} alt="edit" />
          </Link>
        </span>
      </div>
    </section>
  );
}

export default Navbar;
