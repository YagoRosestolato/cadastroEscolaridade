import React from 'react';
import { TouchableOpacityButton, CadastroTitle  } from './style';

interface ICadastroData {
  codigo: string;
  escolaridade: string;
  onPress: () => void;
}
export function Cadastro({codigo, escolaridade, ...rest}: ICadastroData){
  return (
    <TouchableOpacityButton 
    {...rest}
    >
      <CadastroTitle>{codigo}</CadastroTitle>
      <CadastroTitle>{escolaridade}</CadastroTitle>
    </TouchableOpacityButton>
  )
};
