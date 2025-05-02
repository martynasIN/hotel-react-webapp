import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHotels } from '../context/HotelContext';
import { useLoading } from '../context/LoadingContext';
import HotelDetails from '../components/HotelDetails';

function Hotels() {
    const { token, logout } = useAuth();
    const { getHotels } = useHotels();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        document.title = 'Hotel IS - Viešbučių sąrašas';
        if (!token) navigate('/login');
        else fetchHotels();
    }, [token, navigate]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setModal({ type: null, data: null });
                setSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Gauti viešbučių sąrašą
    const fetchHotels = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getHotels();
            setHotels(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(`Klaida: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };



    // Atsijungimas
    const handleLogout = () => {
        setLoading(true);
        logout();
        navigate('/');
        setLoading(false);
    };

    if (error) return <p>{error}</p>;
   console.log(hotels)
    return (
        <main className="content">
            <div className="dashboard-wrapper">
                <nav className="sidebar">
                    <div className="sidebar-header">
                        <h4 className="text-white">Viešbučių sąrašas</h4>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-white">Grįžti į Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hotels" className="nav-link text-white">Viešbučių sąrašas</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link text-white w-100 text-start">Atsijungti</button>
                        </li>
                    </ul>
                </nav>

                <div className="main-content">
                    <div className="container-fluid p-5">
                        <h1 className="title">Viešbučių sąrašas</h1>
                        {/* Viešbučių kortelės */}
                        {hotels.length > 0 ? (
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {hotels.map((hotel) => (
                                    <HotelDetails
                                        key={hotel.id}
                                        hotel={hotel}
                                        onEdit={(data) => openModal('update', data)}
                                        onDelete={(data) => openModal('delete', data)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Nėra viešbučių.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Hotels;