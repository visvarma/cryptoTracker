// Write your JS code here
// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {
    cryptoList: [],
    loading: true,
  }

  componentDidMount() {
    this.getCryptoList()
  }

  getCryptoList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const formattedData = data.map(eachdata => ({
      currencyLogo: eachdata.currency_logo,
      currencyName: eachdata.currency_name,
      euroValue: eachdata.euro_value,
      id: eachdata.id,
      usdValue: eachdata.usd_value,
    }))

    this.setState({cryptoList: formattedData, loading: false})
  }

  // eslint-disable-next-line react/require-render-return
  render() {
    const {cryptoList, loading} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="cypto-img"
        />

        {loading ? (
          <div testid="loader">
            <Loader type="Rings" color="#ffffff" height={160} width={160} />
          </div>
        ) : (
          <div className="crypto-table">
            <div className="list-header">
              <p className="list-coin-type-heading">Coin Type</p>
              <div className="usd-and-euro-values-container">
                <p className="list-coin-value-heading">USD</p>
                <p className="list-coin-value-heading">EURO</p>
              </div>
            </div>
            <ul className="crypto-list">
              {cryptoList.map(eachCryptocurrency => (
                <CryptocurrencyItem
                  key={eachCryptocurrency.id}
                  cryptocurrencyDetails={eachCryptocurrency}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
