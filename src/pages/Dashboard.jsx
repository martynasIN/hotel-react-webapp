// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/home/dashboard.scss';
import { useLoading } from '../context/LoadingContext';
import { logout} from '../services/AuthServices';

function Dashboard() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
  
    useEffect(() => {
      document.title = 'Sveiki atvykę';
  
      if (!token) {
        navigate('/login');
      }
    }, [token, navigate]);
  
    const handleLogout = () => {
      setLoading(true);
      logout();
      navigate('/');
      setLoading(false);
    };
  


  return (
    <main className="content">
      <div className="dashboard-wrapper">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h4 className="text-white">Vartotojai</h4>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link text-white w-100 text-start"
              >
                <i className="bi bi-box-arrow-right me-2"></i> Atsijungti
              </button>
            </li>
          </ul>
        </nav>

        <div className="main-content">
          <div className="container-fluid p-4">
            <h1 className="dashboard-title">Jūsų Dashboard</h1>
            <p className="lead text-muted">Sveiki atvykę! Valdykite savo viešbučius efektyviai.</p>

            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                  <h5 className="card-title">Viešbučių sąrašas</h5>
                    <p className="card-text">Peržiūrėkite visus viešbučius.</p>
                    <Link to="/hotels" className="btn btn-primary">
                      Žiūrėti sąrašą
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Atsiliepimai</h5>
                    <p className="card-text">Stebėkit atsliepimus.</p>
                    <Link to="/reviews" className="btn btn-primary">
                      Eiti į atsiliepimus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;