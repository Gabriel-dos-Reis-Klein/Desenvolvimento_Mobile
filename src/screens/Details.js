import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";



export default function Details(){

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([])

    const getMovies = async () => {
    try{
        const response = await fetch("https://reactnative.dev/movies.json");
        const json = await response.json();
        setData(json.movies);
    } catch(error){
        console.error(error);
    } finally{
        setLoading(false);
    }
    };

    useEffect(() => {
        getMovies();
    }, [])

    return(
        <View>
            <Text>Estamos na tela detalhes</Text>
            {isLoading ?  (
                <ActivityIndicator/>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Text>{item.title} - {item.releaseYear}</Text>
                    )}
                    
                />
            )
            }
        </View>
    )
}