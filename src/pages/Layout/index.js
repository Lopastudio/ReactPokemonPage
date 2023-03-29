import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
      <h1 style={{ textAlign: 'center' }}>Pokemon List Website</h1>
      
        <ul style={{ textAlign: 'center' }}>
            <Link to="/">Home</Link>
        </ul>
        
      </nav>
      
      <Outlet />
    </>
  )
};

export default Layout;