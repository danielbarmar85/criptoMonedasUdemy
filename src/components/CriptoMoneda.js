import React from 'react'

const CriptoMoneda = ({criptomoneda}) => {
    const {FullName, Name} = criptomoneda.CoinInfo;
    return (
        <option value={Name}>{FullName}</option>
    )
}

export default CriptoMoneda
