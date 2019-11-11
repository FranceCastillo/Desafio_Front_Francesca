import React, {Component} from "react";
import CanvasJSReact from "./assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Formulario extends Component {
    constructor (props){
        super(props);
        this.state = {
            f_inicio: "",
            f_final: "",
            promedio: "",
            min_value: "",
            max_value: "",
            options_chart: {}
        }
    }

    componentDidMount() {
        let options = {
            theme: "dark1",
            animationEnabled: true,
            exportEnabled: true,
            title:{
                text: "Variaciones del precio del Dolar"
            },
            axisY: {
                title: "Price (in USD)",
                includeZero: false,
                suffix: "$"
            },
            axisX: {
                title: "Week of Year",
                valueFormatString: "D MMM",
                interval: 2
            },
            data: [{
                type: "line",
                toolTipContent: "Day {x}: {y}$",
                dataPoints: []
            }
            ]
        }
        this.setF_Changes(options, 'options_chart')
    }

    setF_Changes(value, property) {
        let state = {};
        state[property]= value;
        this.setState(state);
    }

    calculos(json){
        let suma = 0,
            min = 0,
            max = 0,
            promedio,
            jsonCount = json.length;
        json.forEach((data => {
            let valor = parseFloat(data.Valor.replace(',','.'));
            this.setChartOptions(data.Fecha, data.Valor);
            suma += valor;
            min = min === 0 ? valor :
                (min < valor ? valor : min);
            max = max === 0 ? valor :
                (max > valor ? valor : max);
        }));
        promedio = suma / jsonCount;
        this.setF_Changes(promedio.toFixed(2), 'promedio');
        this.setF_Changes(min.toFixed(2), 'min_value');
        this.setF_Changes(max.toFixed(2), 'max_value');
    }

    setChartOptions(fecha, valor){
        //    { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
        let value = parseFloat(valor.replace(',','.'));
        // let dataPoints = { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] };
        let dataPoints = {x: new Date(fecha), y: value};
        let optionsChart = this.state.options_chart;
        optionsChart.data[0].dataPoints.push(dataPoints);
        this.setF_Changes(optionsChart, 'options_chart');
    }

    consultar = (event) => {
        event.preventDefault();
        let f_inicio = this.state.f_inicio.toString().replace('-', '/').replace('-', '/dias_i/');
        let f_final = this.state.f_final.toString().replace('-', '/').replace('-', '/dias_f/');
        let url = "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/" + f_inicio + "/" + f_final + "?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";
        let promise = fetch(url);
        promise.then((response) => {
            response.json().then((data) => {
                // console.log(data);
                this.setState({dolar_data: data.Dolares});
                // console.log(data.Dolares);
                this.calculos(data.Dolares);
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    };
    render() {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="">
                            Fecha Inicio:
                            <input type="date" value={this.state.f_inicio} placeholder="Fecha Inicio" onChange={
                                (ev) => {this.setF_Changes(ev.target.value, 'f_inicio')}
                            }/>
                        </label>
                    </div>
                    <div>

                        <label htmlFor="">
                            Fecha Final:
                            <input type="date" value={this.state.f_final} placeholder="Fecha Final" onChange={
                                (ev) => {this.setF_Changes(ev.target.value, 'f_final')}
                            }/>
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Consultar" onClick={ this.consultar } />
                    </div>
                    <div style={ {alignContent: 'center'} }>
                        <p>Promedio de los datos: { this.state.promedio }</p>
                        <p>Valor maximo encontrado: { this.state.max_value }</p>
                        <p>Valor minimo encontrado: { this.state.min_value }</p>
                    </div>
                </form>
                <div>
                    <h1>React Candlestick Chart</h1>
                    <CanvasJSChart options = {this.state.options_chart} onRef={ref => this.chart = ref}/>
                </div>
            </div>
        );
    }
}

export default Formulario