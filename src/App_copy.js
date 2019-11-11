import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function A(props) {
    return <p>HOla {props.nombre}</p>;
}

function B(props) {
    return <p>{props.nombre}: 10</p>;
}

/*const MiComponente = () => {
    return <p>HOla mundo</p>;
};*/

class MicomponenteDeClases extends Component {
    render() {
        return <p>Hola soy de la clase componente</p>;
    }
}

class App_copy extends Component {
    render() {
        let nombre = "Francesca";
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <A nombre={nombre}/>
                <B nombre={nombre}/>
            </div>
        );
    }
}

export default App_copy;
