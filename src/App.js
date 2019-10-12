import React, { useState, useEffect } from "react";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Axios from "axios";
import Spinner from "./components/Spinner";
import Cotizacion from "./components/Cotizacion";

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptoMoneda, guardarCriptoMoneda] = useState("");
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

      const resultado = await Axios.get(url);

      // Mostrar Spinner.
      guardarCargando(true);

      setTimeout(() => {
        // Guardar Spinner.
        guardarCargando(false);

        // Guardar Resultado.
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 2000);
    };

    cotizarCriptomoneda();
  }, [moneda, criptoMoneda]);

  // Mostrar spinner o resultado.
  const componente = cargando ? <Spinner /> : <Cotizacion resultado={resultado}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo" />
        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al Instante</h1>
          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptoMoneda={guardarCriptoMoneda}
          />

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
