import {View, Text, TextInput, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import { API_KEY } from './Consts';

export default function CurrencyConverter() {
    const [currencyCodes, setCurrencyCodes] = useState([]);
    const [rates, setRates] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState();
    const [index, setIndex] = useState();
    const [amountOfMoney, setAmountOfMoney] = useState();
    const [result, setResult] = useState();
    let total;

    const myHeaders = new Headers();
    myHeaders.append("apikey", API_KEY);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

    useEffect (() => {
        getCurrencies();
    }, []);

    const getCurrencies = () => {
        fetch("https://api.apilayer.com/exchangerates_data/latest?base=EUR", requestOptions)
        .then(response => response.json())
        .then(data => {
            setCurrencyCodes(Object.keys(data.rates))
            setRates(Object.values(data.rates))
        })
        .catch(err => console.error(err))
    }

    const convertMoney = () => {
        total = parseFloat(amountOfMoney) * parseFloat(rates[index]);
        setResult(`${amountOfMoney} ${selectedCurrency} is ${total.toFixed(2)} euros`)
    }


    return(
        <View>
            <View>
                <Text>{result}</Text>
                <TextInput
                    style={{width:250, borderColor: 'gray', borderWidth: 1}}
                    keyboardType='numeric'
                    value={amountOfMoney}
                    onChangeText={money => setAmountOfMoney(money)}
                    />
                <Button
                    title="Convert"
                    onPress={convertMoney}/>
            </View>
            <View>
            <Picker
                style={{width: 200, borderColor: 'black', borderWidth: 1}}
                selectedValue={selectedCurrency}
                onValueChange={(itemValue, itemIndex) => {
                setSelectedCurrency(itemValue)
                setIndex(itemIndex)}}>
                    {currencyCodes.map((currency, index) =>
                <Picker.Item key={index} label={currency} value={currency} />)}
            </Picker>
            </View>
        </View>
    )
}

//add clearing to input field
//add loading icon to fetch
//hide api key
//improve styling