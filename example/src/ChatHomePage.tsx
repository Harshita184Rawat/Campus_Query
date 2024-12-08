import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Optional: For the search icon

// Teacher Chat Type definition
interface Chat {
  id: string;
  teacherName: string;
  lastMessage: string;
  time: string;
  profilePicture: string;
}

const ChatsPage = ({ navigation }: any) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      teacherName: 'Mr. Smith',
      lastMessage: 'Let me check that for you.',
      time: '2:45 PM',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      teacherName: 'Ms. Johnson',
      lastMessage: 'Sure, I’ll help you with that.',
      time: '3:10 PM',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: '3',
      teacherName: 'Dr. Brown',
      lastMessage: 'Your assignment has been graded.',
      time: '4:05 PM',
      profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    // Add more chats here...
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each chat item
  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen', { teacherId: item.id })}
    >
      <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
      <View style={styles.chatContent}>
        <Text style={styles.teacherName}>{item.teacherName}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    width:'100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#25D366', // WhatsApp green color
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  chatList: {
    paddingBottom: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 10,
  },
});

export default ChatsPage;
