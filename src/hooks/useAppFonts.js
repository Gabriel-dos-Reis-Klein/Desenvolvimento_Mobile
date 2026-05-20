import { useFonts } from 'expo-font';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,

} from '@expo-google-fonts/poppins';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,

} from '@expo-google-fonts/roboto';


export function useAppFonts() {

  return useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,

    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
}