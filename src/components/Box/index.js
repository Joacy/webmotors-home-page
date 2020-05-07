import React, { Component } from 'react';

import api from '../../services/api';

import logo from '../../assets/webmotors-logo.png';

import './styles.css';

export default class Box extends Component {
    state = {
        newCar: false,
        usedCar: false,
        makes: [],
        vehicles: [],
        models: [],
        versions: [],
        makeID: 1,
        vehicleID: 1,
        modelID: 1,
        versionID: 1,
        year: 1,
        price: 1,
        page: 1,
    }

    componentDidMount () {
        this.getMakes();
        this.getVehicles();
    }

    async getMakes () {
        try {
            const response = await api.get('Make');

            console.log(response.data);

            this.setState({ makes: response.data });

        } catch (error) {
            alert('Erro ao extrair os dados');
        }

        this.setState({
            models: [...this.state.models, this.state.makes.map(make => (
                this.getModels(make.ID)
            ))]
        });
    };

    async getModels (makeID) {
        try {
            const response = await api.get(`Model?MakeID=${makeID}`);

            console.log(response.data);

            this.setState({
                models: [...this.state.models, ...response.data]
            });

            // console.log(this.state.models);
        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };

    async getVersions (modelID = 1) {
        try {
            const response = await api.get(`Version?ModelID=${modelID}`);

            console.log(response.data);

            this.setState({ versions: response.data });
        } catch (error) {
            alert('Erro ao extrair os dados');
        }
    };

    async getVehicles () {
        for (let index = 1; index <= 3; index++) {

            this.setState({ page: index });

            try {
                const response = await api.get(`Vehicles?Page=${this.state.page}`);

                console.log(response.data);

                this.setState({ vehicles: [...this.state.vehicles, ...response.data] });
            } catch (error) {
                alert('Erro ao extrair os dados');
            }
        }
    };

    render () {
        const {
            newCar,
            usedCar,
            makes,
            vehicles,
            models,
            versions,
            makeID,
            vehicleID,
            modelID,
            versionID,
            year,
            price,
            page
        } = this.state;

        async function handleGalery (e) {
            e.preventDefault();

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
            console.log(page);
        };

        return (
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
                            onChange={e => this.setState({ newCar: e.target.checked })}
                            id="newCar"
                        />
                        <label for="newCar" data-state={newCar}><span></span>Novos</label>

                        <input
                            type="checkbox"
                            name="usedCar"
                            value={usedCar}
                            onChange={e => this.setState({ usedCar: e.target.checked })}
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
                                    onChange={e => this.setState({ makeID: e.target.value })}
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
                                    onChange={e => this.setState({ modelID: e.target.value })}
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
                                onChange={e => this.setState({ year: e.target.value })}
                            >
                                {year}
                            </option>
                        </select>

                    Faixa de Preço:
                    <select>
                            <option value="" selected>Todos</option>
                            <option
                                value={price}
                                onChange={e => this.setState({ price: e.target.value })}
                            >
                                {price}
                            </option>
                        </select>

                    Versão:
                    <select>
                            <option value="" selected>Todas</option>
                            <option
                                value={versionID}
                                onChange={e => this.setState({ version: e.target.value })}
                            >
                                {versionID}
                            </option>
                        </select>
                    </div>

                    <button type="submit">Ver ofertas</button>
                </form>
            </div>
        );
    };
}