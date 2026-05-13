import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home({navigation}){
    
const [nomeSalvo, setNomeSalvo] = useState(null)

const buscarPessoa = async () => {
  try{
    const value = await AsyncStorage.getItem('@pessoa');
    if(value != null) {
      const pessoa = JSON.parse(value)
      setNomeSalvo(pessoa)

    }
  }
  catch(e){
    console.log(e)
  }
}

useEffect(() =>{
    buscarPessoa();
}, [])
    return(
        <View>
            <Text>Ola seja bem vindo {nomeSalvo?.nome}</Text>
            <Button
                title='Ir para Detalhes'
                onPress={() => navigation.navigate("Detalhes")}
            />
        </View>
    )
}