import React, { useState, useEffect } from 'react';

import './styles.css';

export default function Galery () {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(localStorage.getItem('vehicles'));
    }, []);

    return (
        <div className="container-galery">
            <div className="cars-galery">
                {vehicles.map(vehicle => (
                    <div className="item" key={vehicle.ID}>
                        <p>Marca: {vehicle.Make}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}