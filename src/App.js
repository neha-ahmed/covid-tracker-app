import React from 'react';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import {fetchData} from './api';
import styles from './App.module.css'
import coronaimg from './images/corona.png';

class App extends React.Component{
  state = {
    data: {},   //empty data object
    country: '',
  }

  async componentDidMount(){
      const fetchedData = await fetchData();
      this.setState({ data: fetchedData })
  }

  handleCountryChange =  async(country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country })
  }

  render() {
    const { data,country }= this.state;   //destructured at the top code makes clean code in the return block

  return (
    <div className={styles.container}> 
      <img src={coronaimg} className={styles.coronaImg} alt="covid19"/>
      <Cards data ={data}/>
      <CountryPicker handleCountryChange={this.handleCountryChange}/>
      <Chart data ={data} country={country}/>
      
     
    </div>
  );
}
}
export default App;
