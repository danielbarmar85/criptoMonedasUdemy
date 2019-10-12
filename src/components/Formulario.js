import React, { useState, useEffect } from "react";
import Axios from "axios";
import CriptoMoneda from "./CriptoMoneda";
import Error from "./Error";

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {
  const [criptomonedas, guardarCriptomonedas] = useState([]);
  const [monedaCotizar, guardarMonedaCotizar] = useState("");
  const [criptoCotizar, guardarCriptoCotizar] = useState("");
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD";

      const resultado = await Axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  // Validar que lleve los dos campos seleccionados.
  const cotizarMoneda = e => {
    e.preventDefault();

    // Validar que los dos campos esten rellenos.
    if (monedaCotizar === "" || criptoCotizar === "") {
      guardarError(true);
      return;
    }

    // Pasar los datos al componente principal.
    guardarError(false);

    guardarMoneda(monedaCotizar);
    guardarCriptoMoneda(criptoCotizar);
  };

  // Mostrar el error en caso de que exista.
  const componenteError = error ? (
    <Error message="Ambos campos son obligatorios" />
  ) : null;

  return (
    <form onSubmit={cotizarMoneda}>
      {componenteError}
      <div className="row">
        <label>Elige tu Moneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarMonedaCotizar(e.target.value)}
        >
          <option value="">-- Elige tu moneda--</option>
          <option value="USD">Dolar</option>
          <option value="MXN">Peso</option>
          <option value="GBP">Libras</option>
          <option value="EUR">Euro</option>
        </select>
      </div>

      <div className="row">
        <label>Elige tu Criptomoneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarCriptoCotizar(e.target.value)}
        >
          <option value="">-- Elige tu criptoMoneda--</option>
          {criptomonedas.map(criptomoneda => (
            <CriptoMoneda
              key={criptomoneda.CoinInfo.Id}
              criptomoneda={criptomoneda}
            />
          ))}
        </select>
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Calcular"
      />
    </form>
  );
};

//

export default Formulario;
