import { Outlet, Link } from "react-router-dom";

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
    </>
  )
};

export default Layout;