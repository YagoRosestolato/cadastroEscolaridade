//import { statusBar } from 'expo-status-bar';
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState }from 'react';
import { useEffect } from 'react';
import { Button } from '../components/button';
import { Container, Title, Input, } from './styles';
import { Cadastro } from '../components/cadastro'
import { FlatList, Text  } from 'react-native';


interface ICadastroData {
  id: string;
  codigo: string;
  escolaridade: string;
}

export function Home() {
  const [codigo, setCodigo] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [ myCadastro, setMyCadastro ] = useState<ICadastroData[]>([]);

  function handleAddNewCadatro() {
    const data = {
      id: String(new Date().getTime()),
      codigo: codigo,
      escolaridade:escolaridade,
    }
    if (codigo ==='' || escolaridade === '') {
      alert('Favor preencher o campo vazio')
      return;
    }
    setMyCadastro([...myCadastro, data]);
    setCodigo('')
    setEscolaridade('')

  }

  function handleRemoveCadastro (id: string) {
    setMyCadastro(myCadastro => myCadastro.filter(data => data.id !== id))
  }

  useEffect(() => {
    async function loadData() {
      const storagedCadastro = await AsyncStorage.getItem('@myCadastro:cadastro')
      if (storagedCadastro) {
        setMyCadastro(JSON.parse(storagedCadastro))
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@myCadastro:cadastro', JSON.stringify(myCadastro))
    }
    saveData()
  }, [myCadastro])

  return (
    <Container>

      <StatusBar hidden />

      <Title>Cadastro de Escolaridade</Title>

      <Input
        placeholder="codigo" 
        value={codigo}
        onChangeText={value => setCodigo(value)} 
      />
      <Input
        placeholder="Escolaridade" 
        value={escolaridade}
        onChangeText={value => setEscolaridade(value)} 
      />

      <Button
        title="ADICIONAR"
        onPress={handleAddNewCadatro} 
       />
       
      <FlatList
          data={myCadastro}
          keyExtractor={item => item.id}
          renderItem={({item})=>(
            
          <Cadastro
            codigo={item.codigo}
            escolaridade={item.escolaridade}
            onPress={() => handleRemoveCadastro(item.id)}
            />
          )}  
        />  
    </Container>
    );
}

