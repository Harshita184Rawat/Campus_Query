import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './HomeScreen';  // Import the HomeScreen component
import LoginScreen from './Login_teacher';
import LoginScreen2 from './Login_Student';
import PostQueryScreen from './Student_Query';
import TeacherResponsePage from './Teacher_response';
import RegistrationStudent from './Student_signUp';
import RegistrationScreen from './Teacher_register';
import TimeTable from './Teacher_TimeTable';
import MainScreen from './mainpage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatsPage from './ChatHomePage';
import ChatScreen from './ChatScreen';
import IndividualTeacherProfile from './IndividualTeacherProfile';
import ForgotPassword from './ForgetPassword';
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
//     <View style={styles.container}>
//       <TeacherResponsePage /> {/* Render the HomeScreen component */}
//     </View>

<>

   <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Loginteacher" component={LoginScreen} />
               <Stack.Screen name="Loginstudent" component={LoginScreen2} />
                 <Stack.Screen name="Registerstudent" component={RegistrationStudent} />
                 <Stack.Screen name="Registerteacher" component={RegistrationScreen} />
                 <Stack.Screen name="Timetable" component={TimeTable} />
                 <Stack.Screen name="Mainpage" component={MainScreen} />
                  <Stack.Screen name="studentquery" component={PostQueryScreen} />
                  <Stack.Screen name="teacherresponse" component={TeacherResponsePage} />
                  <Stack.Screen name="ChatHome" component={ChatsPage} />
                 <Stack.Screen name="ChatScreen" component={ChatScreen} />
                  <Stack.Screen name="forgetpassword" component={ForgotPassword} />

            </Stack.Navigator>


      </NavigationContainer>








</>

    );


};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
