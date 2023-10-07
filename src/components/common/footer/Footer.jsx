import { Link } from "react-router-dom";
import { FaYoutube, FaTwitter } from "react-icons/fa6";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <h1>Jiyul</h1>
      <p>2023 KimJiyul &copy; All Rights Reserved.</p>

      <ul>
        <li>
          <Link to="/">
            <FaYoutube size={20} />
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaTwitter size={20} />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
