import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Optional: For a send icon

// Message Type definition
interface Message {
  id: string;
  text: string;
  sender: 'teacher' | 'student';
}

const ChatScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you?', sender: 'teacher' },
    { id: '2', text: 'I need help with my assignment.', sender: 'student' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: (messages.length + 1).toString(),
        text: newMessage,
        sender: 'student', // Or dynamically based on the logged-in user
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with Teacher</Text>
      </View>

      {/* Message list */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === 'teacher' ? styles.teacherMessage : styles.studentMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted // This makes the latest message appear at the bottom
      />

      {/* Input field and send button */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingTop: 50,
    backgroundColor: '#25D366', // WhatsApp green color
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  message: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 15,
    maxWidth: '75%', // Makes sure message width is reasonable and looks balanced
  },
  teacherMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-start',
    marginRight: 'auto', // Left-aligned for teacher
  },
  studentMessage: {
    backgroundColor: '#25D366',
    alignSelf: 'flex-end',
    marginLeft: 'auto', // Right-aligned for student
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
  },
  sendButton: {
    backgroundColor: '#25D366',
    borderRadius: 50,
    padding: 12,
    marginLeft: 5,
  },
});

export default ChatScreen;
