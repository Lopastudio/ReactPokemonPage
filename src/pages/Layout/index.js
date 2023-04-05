import { Outlet, Link } from "react-router-dom";
import "./footer.css";

const Layout = () => {
  return (
    <>
      <nav>
      <h1 style={{ textAlign: 'center' }}>Pokemon Database</h1>
      
        <ul style={{ textAlign: 'center' }}>
            <Link to="/">Home</Link>
        </ul>
        
      </nav>
      <Outlet />
      <footer>
          <div>
          <span class="footer">Made with ❤️ by <a href="https://lopastudio.sk">Patrik (Lopastudio)</a></span> 
          </div>
        </footer>
    </>
  )
};

export default Layout;