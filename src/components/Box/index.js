import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import logo from '../../assets/webmotors-logo.png';

import './styles.css';

export default function Box () {

    const [newCar, setNewCar] = useState(true);
    const [usedCar, setUsedCar] = useState(true);

    const [makes, setMakes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [models, setModels] = useState([]);
    const [versions, setVersions] = useState([]);

    const [makeID, setMakeID] = useState();
    const [makeName, setMakeName] = useState('');

    const [modelID, setModelID] = useState();
    const [modelName, setModelName] = useState('');

    const [vehicleID, setVehicleID] = useState();

    const [versionName, setVersionName] = useState('');

    const [year, setYear] = useState();
    const [years, setYears] = useState([
        2000,
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
    ]);

    const [price, setPrice] = useState(0);
    const [prices, setPrices] = useState([
        19999,
        39999,
        59999,
        79999,
        99999
    ]);

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

    async function getModels (makeID) {
        if (makeID !== 0) {
            try {
                const response = await api.get(`Model?MakeID=${makeID}`);

                // console.log(response.data);

                setModels(response.data);

                console.log(models);

            } catch (error) {
                alert('Erro ao extrair os dados');
            }
        }
    };

    async function getVersions (modelID) {
        if (modelID !== 0) {
            try {
                const response = await api.get(`Version?ModelID=${modelID}`);

                // console.log(response.data);

                setVersions(response.data);

                console.log(versions);
            } catch (error) {
                alert('Erro ao extrair os dados');
            }
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

    async function getPrice (price) {
        setPrice(price);
    }

    window.onload = () => {
        getMakes();
        getVehicles();
        setYear(0);
        setPrice(0);
        setMakeName('Todas');
        setModelName('Todos');
        setVersionName('todos');
    }

    useEffect(() => {
        console.log('Marca ' + makeName);
        console.log('Modelo ' + modelName);
    }, [makeName, modelName])

    return (
        <>
            <div className="container-box" >
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <form className="mobile">
                    <div className="input-row one-hundred">
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

                    <div className="input-row">
                        <span>Onde:</span>
                        <input
                            type="text"
                            value="São Paulo - SP"
                        />
                    </div>

                    <div className="input-row">
                        <span>Raio:</span>
                        <select>
                            <option value="" selected disabled>Km</option>
                            <option value="">100Km</option>
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Marca:</span>
                        <select onChange={
                            e => {
                                setMakeID(e.target.value)
                                getModels(e.target.value)
                                setModelName('Todos')
                                setMakeName(e.target.options[e.target.selectedIndex].text)
                            }
                        }>
                            <option value={0} selected>Todas</option>
                            {makes.map(make => (
                                <option key={make.ID}
                                    value={make.ID}
                                >
                                    {make.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Modelo:</span>
                        <select onChange={
                            e => {
                                setModelID(e.target.value)
                                getVersions(e.target.value)
                                setModelName(e.target.options[e.target.selectedIndex].text)
                            }
                        }>
                            <option value={0} selected>Todos</option>
                            {models.map(model => (
                                <option key={model.ID}
                                    value={model.ID}
                                >
                                    {model.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Versão:</span>
                        <select onChange={
                            e => {
                                setVersionName(e.target.value)
                            }
                        }>
                            <option value="todos" selected>Todas</option>
                            {versions.map(version => (
                                <option key={version.ID}
                                    value={version.Name}
                                >
                                    {version.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Ano Desejado:</span>
                        <select onChange={
                            e => {
                                setYear(e.target.value)
                                // getYear(e.target.value)
                            }
                        }>
                            <option value={0} selected>Todos</option>
                            {years.map(year => (
                                <option value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Faixa de Preço:</span>
                        <select onChange={
                            e => {
                                setPrice(e.target.value)
                                getPrice(e.target.value)
                            }}>
                            <option value={0} selected>Todos</option>
                            {prices.map(price => (
                                <option key={price}
                                    value={price}
                                >
                                    Até R$ {price}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>

                <form className="desktop">
                    <div className="input-row one-hundred">
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

                    <div className="input-row">
                        <span>Onde:</span>
                        <input
                            type="text"
                            value="São Paulo - SP"
                        />

                        <span>Raio:</span>
                        <select>
                            <option value="" selected disabled>Km</option>
                            <option value="">100Km</option>
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Marca:</span>
                        <select onChange={
                            e => {
                                setMakeID(e.target.value)
                                getModels(e.target.value)
                                setModelName('Todos')
                                setMakeName(e.target.options[e.target.selectedIndex].text)
                            }
                        }>
                            <option value={0} selected>Todas</option>
                            {makes.map(make => (
                                <option key={make.ID}
                                    value={make.ID}
                                >
                                    {make.Name}
                                </option>
                            ))}
                        </select>

                        <span>Modelo:</span>
                        <select onChange={
                            e => {
                                setModelID(e.target.value)
                                getVersions(e.target.value)
                                setModelName(e.target.options[e.target.selectedIndex].text)
                            }
                        }>
                            <option value={0} selected>Todos</option>
                            {models.map(model => (
                                <option key={model.ID}
                                    value={model.ID}
                                >
                                    {model.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Versão:</span>
                        <select onChange={
                            e => {
                                setVersionName(e.target.value)
                            }
                        }>
                            <option value="todos" selected>Todas</option>
                            {versions.map(version => (
                                <option key={version.ID}
                                    value={version.Name}
                                >
                                    {version.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-row">
                        <span>Ano Desejado:</span>
                        <select onChange={
                            e => {
                                setYear(e.target.value)
                                // getYear(e.target.value)
                            }
                        }>
                            <option value={0} selected>Todos</option>
                            {years.map(year => (
                                <option value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        <span>Faixa de Preço:</span>
                        <select onChange={
                            e => {
                                setPrice(e.target.value)
                                getPrice(e.target.value)
                            }}>
                            <option value={0} selected>Todos</option>
                            {prices.map(price => (
                                <option key={price}
                                    value={price}
                                >
                                    Até R$ {price}
                                </option>
                            ))}
                        </select>
                    </div>

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
                        (makeName === 'Todas' ? vehicle.Make !== 'Todas' : vehicle.Make === makeName)
                        &&
                        (modelName === 'Todos' ? vehicle.Model !== 'Todos' : vehicle.Model === modelName)
                        &&
                        (parseInt(year) === 0 ? vehicle.YearModel !== 0 : vehicle.YearModel === parseInt(year))
                        &&
                        (parseInt(price) === 0 ? vehicle.Price !== 0 : vehicle.Price <= price)
                        &&
                        (versionName === 'todos' ? vehicle.Version !== 'todos' : vehicle.Version === versionName)
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