import React, { useState } from 'react';

import api from '../../services/api';

import logo from '../../assets/webmotors-logo.png';

import './styles.css';

export default function Box () {

    const [newCar, setNewCar] = useState(false);
    const [usedCar, setUsedCar] = useState(false);

    const [makes, setMakes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [models, setModels] = useState([]);
    const [versions, setVersions] = useState([]);

    const [makeID, setMakeID] = useState(1);
    const [modelID, setModelID] = useState(1);
    const [vehicleID, setVehicleID] = useState(1);
    const [versionID, setVersionID] = useState(1);

    const [year, setYear] = useState(1);

    const [price, setPrice] = useState([1, 1]);

    let page;

    let vehiclesArray;

    async function getMakes () {
        try {
            const response = await api.get('Make');

            // console.log(response.data);

            setMakes(response.data);

        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };


    async function getModels (makeID = 1) {
        try {
            const response = await api.get(`Model?MakeID=${makeID}`);

            // console.log(response.data);

            setModels([...models, ...response.data]);

            // console.log(models);
        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };

    async function getVersions (modelID) {
        try {
            const response = await api.get(`Version?ModelID=${modelID}`);

            console.log(response.data);

            setVersions([...versions, ...response.data]);

            // console.log(versions);
        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };

    async function getVehicles () {
        vehiclesArray = [];

        for (let index = 1; index <= 3; index++) {

            page = index;

            console.log(page + ' ' + index);
            try {
                const response = await api.get(`Vehicles?Page=${page}`);

                // console.log(response.data);

                // setVehicles([...vehicles, ...response.data]);
                vehiclesArray = [...vehiclesArray, ...response.data];
                console.log(vehicles);
                console.log(vehiclesArray);
            } catch (error) {
                alert('Erro ao extrair os dados');
            }
        }

        setVehicles(vehiclesArray);
    };

    window.onload = () => {
        getMakes();
        getVehicles();
    }

    async function handleGalery (e) {
        e.preventDefault();

        if (newCar && !usedCar) {
            setVehicles(vehicles.filter(vehicle => {
                return vehicle.KM === 0
            }));
        }
        else if (!newCar && usedCar) {
            setVehicles(vehicles.filter(vehicle => {
                return vehicle.KM !== 0
            }));
        }

        console.log(newCar);
        console.log(usedCar);
        console.log(makes);
        console.log(vehicles);
        console.log(models);
        console.log(versions);
        console.log(makeID);
        console.log(vehicleID);
        console.log(modelID);
        console.log(versionID);
        console.log(year);
        console.log(price);
    };

    return (
        <>
            <div className="container-box" >
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <form onSubmit={handleGalery}>
                    <div className="flex-row">
                        <input
                            type="checkbox"
                            name="newCar"
                            value={newCar}
                            onChange={e => setNewCar(e.target.checked)}
                            id="newCar"
                        />
                        <label for="newCar" data-state={newCar}><span></span>Novos</label>

                        <input
                            type="checkbox"
                            name="usedCar"
                            value={usedCar}
                            onChange={e => setUsedCar(e.target.checked)}
                            id="usedCar"
                        />
                        <label for="usedCar" data-state={usedCar}><span></span> Usados</label>
                    </div>

                    <div className="flex-row">
                        Onde:
                    <input
                            type="text"
                            value="São Paulo - SP"
                        />

                    Raio:
                    <select>
                            <option value="" selected disabled>Km</option>
                            <option value="">100Km</option>
                        </select>

                    Marca:
                    <select>
                            <option value="" selected>Todas</option>
                            {makes.map(make => (
                                <option key={make.ID}
                                    value={make.ID}
                                    onChange={e => setMakeID(e.target.value)}
                                >
                                    {make.Name}
                                </option>
                            ))}
                        </select>

                    Modelo:
                    <select>
                            <option value="" selected>Todos</option>
                            {models.map((model, index) => (index !== 0) && (
                                <option key={model.ID}
                                    value={modelID}
                                    onChange={e => setModelID(e.target.value)}
                                >
                                    {model.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-row">
                        Ano Desejado:
                    <select>
                            <option value="" selected>Todas</option>
                            <option
                                value={year}
                                onChange={e => setYear(e.target.value)}
                            >
                                {year}
                            </option>
                        </select>

                    Faixa de Preço:
                    <select>
                            <option value="" selected>Todos</option>
                            <option
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            >
                                R${price[0]} - R${price[1]}
                            </option>
                        </select>

                    Versão:
                    <select>
                            <option value="" selected>Todas</option>
                            <option
                                value={versionID}
                                onChange={e => setVersionID(e.target.value)}
                            >
                                {versionID}
                            </option>
                        </select>
                    </div>

                    <button type="submit">Ver ofertas</button>
                </form>
            </div>

            <div className="container-galery">
                <div className="cars-galery">
                    {vehicles.map(vehicle =>
                        (newCar && usedCar ? vehicle.KM !== null : (
                            (newCar && !usedCar ? vehicle.KM === 0 : vehicle.KM !== 0)
                            &&
                            (!newCar && usedCar ? vehicle.KM !== 0 : vehicle.KM === 0)
                        ))
                        &&
                        (
                            <div className="item" key={vehicle.ID}>
                                <img src={vehicle.Image} alt="" />
                                <ul>
                                    <li>{vehicle.Make} {vehicle.Model} {vehicle.Version} {vehicle.Color}</li>
                                    <li>{vehicle.KM} Km rodados</li>
                                    <li>Modelo {vehicle.YearModel}</li>
                                    <li>Fabricado em {vehicle.YearFab}</li>
                                </ul>
                                <h2>R$ {vehicle.Price}</h2>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}