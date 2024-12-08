import React,{useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,

} from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

import { NavigationContainer } from '@react-navigation/native';


type SqueryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'studentquery'>;
type TresponseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'teacherresponse'>;
type Props = {
  navigation: DetailsScreenNavigationProp;
};

const MainScreen:React.FC<Props> = ({ navigation }) => {
  // Dummy data
  const [isTeacher, setIsTeacher] = useState(false);
  const teacherProfiles = [
    { id: '1', name: 'Prof. Alice Smith', department: 'Mathematics', avatar: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Prof. Bob Johnson', department: 'Science', avatar: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Prof. Clara Lee', department: 'English', avatar: 'https://via.placeholder.com/100' },
     { id: '1', name: 'Prof. Alice Smith', department: 'Mathematics', avatar: 'https://via.placeholder.com/100' },
        { id: '2', name: 'Prof. Bob Johnson', department: 'Science', avatar: 'https://via.placeholder.com/100' },
        { id: '3', name: 'Prof. Clara Lee', department: 'English', avatar: 'https://via.placeholder.com/100' },
  ];

  const departments = [
    { id: '1', name: 'Computer Science', students: 120 },
    { id: '2', name: 'Electrical and Electronics Engineering', students: 95 },
    { id: '3', name: 'Electronics and Communications Engineering', students: 110 },
    { id: '4', name: 'Information Technology', students: 80 },
    { id: '5', name: 'Artificial Intelligence and Machine Learning', students: 60 },
     { id: '5', name: 'Mechanical Engineering', students: 60 },
  ];
  const handleNavigation = () => {
    if (isTeacher) {
      navigation.navigate('teacherresponse'); // Route must match exactly
    } else {
      navigation.navigate('studentquery'); // Route must match exactly
    }
  };

  const renderTeacherProfile = ({ item }) => (
    <View style={styles.teacherCard}>
      <Image source={{ uri: item.avatar }} style={styles.teacherAvatar} />
      <Text style={styles.teacherName}>{item.name}</Text>
      <Text style={styles.teacherDepartment}>{item.department}</Text>
    </View>
  );

  const renderDepartment = ({ item }) => (
    <View style={styles.departmentCard}>
      <Text style={styles.departmentName}>{item.name}</Text>
      <Text style={styles.departmentStudents}>
        Students: {item.students}
      </Text>
    </View>
  );

  return (

    <View style={styles.container}>
      {/* App Bar */}



      <View style={styles.appBar}>

        <TouchableOpacity>
          <View style={styles.profileSection}>
            <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.profilePic} />
            <Text style={styles.profileName}>John Doe</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ChatHome')}>
             <Image
                 source={{ uri: 'https://via.placeholder.com/25/chat-icon' }} // Replace with the actual chat icon URL
                 style={styles.icon}
               />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/25/chat-icon' }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body Section */}
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Teacher Profiles */}
        <View style={styles.profileForm}>
          <FlatList
            horizontal
            data={teacherProfiles}
            renderItem={renderTeacherProfile}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.teacherList}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Departments */}
        <FlatList
          data={departments}
          renderItem={renderDepartment}
          keyExtractor={(item) => item.id}
          numColumns={2} // Two cards per row
          contentContainerStyle={styles.departmentList}
        />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Saved Chats</Text>
        </TouchableOpacity>

        {/* Circular Post Query Button with Plus Icon */}
        <TouchableOpacity
          style={styles.circularButton}
          onPress = {handleNavigation}
        >
          <MaterialCommunityIcons name="plus" size={30} color="#6200EE" />
      </TouchableOpacity>
      </View>
    </View>
  );
};
const handleNavigation = (isTeacher) => {
  if (isTeacher) {
    navigation.navigate("Teacherresponse"); // Replace with your actual teacher page route
  } else {
    navigation.navigate("Studentquery"); // Replace with your actual student page route
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',

  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#ffffff',
    color:'#000000',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 20,
  },
  profileForm: {
    marginBottom: 20,
  },
  teacherList: {
    marginBottom: 20,
  },
  teacherCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  teacherAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  teacherDepartment: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  departmentList: {
    justifyContent: 'space-between',
  },
  departmentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
  },
  departmentStudents: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 15,
  },
  bottomButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#BB86FC',
    borderRadius: 8,
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circularButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    Color:'#6200EE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default MainScreen;

