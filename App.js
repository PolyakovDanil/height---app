
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Input from './Input';
const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.0.51:5000';
export default function App() {
  const [formState, setFormState] = useState({ w1: '', d1: '', w2: '', d2: '' });
  const [heightResult, setHeightResult] = useState(0);
  const onChange = (val, name) => {
    setFormState(prev => ({...prev, [name]: val}));
  }
  const onSubmit = () => {
    fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
       body: JSON.stringify({
        "w1": formState.w1,
        "d1": formState.d1,
        "w2": formState.w2,
        "d2": formState.d2
       })
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(res.message);
    })
    .then(data => {
      
      const [h1, h2] = data.heightsArray;
      console.log(h1, h2)
      setHeightResult(Math.abs(h1-h2));
    })
    .catch( error => console.error(error))
  }
  return (
    <View style={styles.container}>
      <View style={styles.formWrap} >
        <Text style={styles.title}>Высота</Text>
        <Input handleChange={onChange} name={'w1'} placeholder='Широта первой точки' value={formState.w1}/>
        <Input handleChange={onChange} name={'d1'} placeholder='Долгота первой точки' value={formState.d1}/>
        <Input handleChange={onChange} name={'w2'} placeholder='Широта второй точки' value={formState.w2}/>
        <Input handleChange={onChange} name={'d2'} placeholder='Долгота второй точки' value={formState.d2}/>
        <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Найти высоту</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultText}>Разность высот {heightResult} м</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 150,
    alignItems: 'center',
  },
  formWrap : {
    width: '80%',
    flex: 2
  },
  title: {
    fontSize: 32,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 20
  }, 
  submitButtonText: {
    color: 'white'
  },
   resultText: {
     fontSize: 24,
     flex: 1
   }
});
