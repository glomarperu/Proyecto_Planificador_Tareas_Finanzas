import React from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigation'; 
import { ButtonComponent } from '../../components/ButtonComponent';
import { styles } from '../../theme/styles';


export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const logout = async () => {
    try {
      await auth().signOut();
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }, 500); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleTaskList = () => {
    console.log('Lista de tareas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <ButtonComponent onAction={logout} label="Cerrar Sesión" />
      <ButtonComponent
            label="Agregar Tarea"
            onAction={() => navigation.navigate('AddTask')}
          />
      <ButtonComponent onAction={handleTaskList} label="Lista de Tareas" />
    </View>
  );
};