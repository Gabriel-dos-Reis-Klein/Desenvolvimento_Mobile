import {Image} from 'react-native'

export default function Icon (){
  const confeccao = () => (
  <Image 
    source={require('../assets/tipo_confeccao.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const modificacao = () => (
  <Image 
    source={require('../assets/tipo_modificacao.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const reparo = () => (
  <Image 
    source={require('../assets/tipo_reparo.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const pesquisa = () => (
  <Image 
    source={require('../assets/pesquisa.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const ordem = () => (
  <Image 
    source={require('../assets/ordem.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const filtragem = () => (
  <Image 
    source={require('../assets/filtragem.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const configuracao = () => (
  <Image 
    source={require('../assets/configuracao.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const ClockHistory = () => (
  <Image 
    source={require('../assets/ClockHistory.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
const ArrowUpLeft = () => (
  <Image 
    source={require('../assets/ArrowUpLeft.png')} 
    style={{ width: 24, height: 24 }} 
  />
);
}