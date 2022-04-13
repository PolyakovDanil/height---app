import { TextInput, StyleSheet } from 'react-native';

const Input = ({ handleChange, name, placeholder, value }) => {
  return(
    <TextInput style={styles.input} onChangeText={(val) => handleChange(val, name)} placeholder={placeholder} value={value}/>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#f5f5f5',
    borderStyle: "solid",
    borderBottomWidth: 3,
    fontSize: 18,
    paddingBottom: 20,
    width: '100%',
    color: '#1a1a1a',
  }
})

export default Input;