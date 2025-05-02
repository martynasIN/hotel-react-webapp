const HotelDetails = ({ hotel, onEdit, onDelete }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{hotel.name || 'Be pavadinimo'}</h5>
                    <p className="card-text">
                        <strong>Aprašymas:</strong> {hotel.description || 'Nėra aprašymo'}<br />
                        <strong>Adresas:</strong> {hotel.address || 'Nėra adreso'}<br />
                        <strong>Reitingas:</strong> {hotel.ranking || 'Nėra reitingo'}<br />
                    </p>
                    <div className="card-actions">
                        <button onClick={() => onTasks(tasks)} className="btn btn-sm btn-primary">Peržiūrėti</button>
                        <button onClick={() => onEdit(contest)} className="btn btn-sm btn-warning">Redaguoti</button>
                        <button onClick={() => onDelete(contest)} className="btn btn-sm btn-danger">Ištrinti</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;