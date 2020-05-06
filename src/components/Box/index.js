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

    const [make, setMake] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [model, setModel] = useState('');
    const [version, setVersion] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');

    async function getMakes () {
        try {
            const response = await api.get('Make');

            console.log(response.data);

            setMakes(response.data);
        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };

    async function getVehicles (page = 1) {
        try {
            const response = await api.get(`Vehicles/${page}`);

            console.log(response.data);

            setVehicles(response.data);
        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };

    async function handleGalery (e) {
        e.preventDefault();
    };

    return (
        <div className="container-box">
            <div className="logo">
                <img src={logo} alt="" />
            </div>

            <form onSubmit={handleGalery}>
                <div className="flex-row">
                    <input
                        type="checkbox"
                        name="newCar"
                        value={newCar}
                        onChange={e => setNewCar(e.target.value)}
                    />
                    <label>Novos</label>

                    <input
                        type="checkbox"
                        name="usedCar"
                        value={usedCar}
                        onChange={e => setUsedCar(e.target.value)}
                    />
                    <label>Usados</label>
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
                        <option
                            value={make}
                            onChange={e => setMake(e.target.value)}
                        >
                            {make}
                        </option>
                    </select>

                    Modelo:
                    <select>
                        <option value="" selected>Todos</option>
                        <option
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        >
                            {model}
                        </option>
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
                            {price}
                        </option>
                    </select>

                    Versão:
                    <select>
                        <option value="" selected>Todas</option>
                        <option
                            value={version}
                            onChange={e => setVersion(e.target.value)}
                        >
                            {version}
                        </option>
                    </select>
                </div>
            </form>
        </div>
    );
}