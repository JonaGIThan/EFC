import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute hook

const AdminScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const route = useRoute(); // Initialize route

  const [employeeInfo, setEmployeeInfo] = useState(null); // State to store employee information
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    if (route.params && route.params.id) {
      fetchEmployeeInfo(route.params.id); // Fetch employee info when component mounts or ID changes
    }
  }, [route.params]);

  // Function to fetch employee information by ID
  const fetchEmployeeInfo = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.103:3000/api/EFC_client/getEmployee/${id}`);
      const data = await response.json();
      if (response.ok) {
        setEmployeeInfo(data);
      } else {
        console.error('Error fetching employee:', data.message);
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  const goToScannerScreen = () => {
    navigation.navigate('ScannerQR');
  };

  const goToAccountClients = () => {
    navigation.navigate('AccountClients');
  };

  return (
    <View style={styles.container}>
      <Icon name="settings" size={100} color="#3B71F3" style={styles.icon} />
      <Text style={styles.title}>Employee Panel</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : employeeInfo ? (
        <View style={styles.employeeInfoContainer}>
            <Text style={styles.employeeName}>ID: {employeeInfo.id}</Text>
          <Text style={styles.employeeName}>Employee: {employeeInfo.first_name} {employeeInfo.last_name}</Text>
          {/* Add more employee info fields here */}
        </View>
      ) : (
        <Text>No employee found</Text>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton onPress={goToAccountClients} text="Student Account" type="PRIMARY" />
        <CustomButton onPress={goToScannerScreen} text="Scanner" type="PRIMARY" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  icon: {
    marginBottom: 50,
  },
  employeeInfoContainer: {
    position: 'absolute',
    top: 50, // Adjust the top position as needed
    left: 5,
    padding: 10,
  },
  employeeName: {
    fontWeight: 'bold',
    fontSize: 20, // Aumenta el tamaño del texto
    color: 'black', // Cambia el color del texto
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Agrega una sombra al texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default AdminScreen;
