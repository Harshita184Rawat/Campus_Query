import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform, TextInput, Button } from "react-native";
import { saveTeacherProfile, getTeacherProfiles } from "./teacherProfiles"; // Import the function to save and get profiles

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "2:00-3:00", "3:00-4:00"];

const TimeTable = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [teacherName, setTeacherName] = useState("");
  const [profiles, setProfiles] = useState(getTeacherProfiles()); // Load the teacher profiles initially

  const toggleSlot = (day, time) => {
    setSelectedSlots((prev) => {
      const key = `${day}-${time}`;
      const updated = { ...prev };
      if (updated[key]) {
        delete updated[key];
      } else {
        updated[key] = true;
      }
      return updated;
    });
  };

  const handleSaveProfile = () => {
    if (teacherName.trim() !== "") {
      saveTeacherProfile(teacherName, selectedSlots);
      alert(`Profile for ${teacherName} saved successfully!`);
      setTeacherName(""); // Clear the teacher name after saving
      setSelectedSlots({}); // Clear the selected slots after saving
      setProfiles(getTeacherProfiles()); // Refresh the list of profiles
    } else {
      alert("Please enter a valid teacher name.");
    }
  };

  const renderRow = ({ item: day }) => (
    <View style={styles.row}>
      <Text style={styles.dayText}>{day}</Text>
      {timeSlots.map((time) => (
        <TouchableOpacity
          key={`${day}-${time}`}
          style={[
            styles.slot,
            selectedSlots[`${day}-${time}`] ? styles.selectedSlot : styles.unselectedSlot,
          ]}
          onPress={() => toggleSlot(day, time)}
        >
          <Text style={styles.slotText}>{time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Free Time Slots</Text>

      <FlatList
        data={days}
        keyExtractor={(item) => item}
        renderItem={renderRow}
        contentContainerStyle={styles.list}
      />
      <View style={styles.selectionSummary}>
        <Text style={styles.summaryText}>Selected Slots:</Text>
        {Object.keys(selectedSlots).map((key) => (
          <Text key={key} style={styles.summarySlotText}>
            {key}
          </Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter Teacher Name:</Text>
        <TextInput
          style={styles.input}
          value={teacherName}
          onChangeText={(text) => setTeacherName(text)}
          placeholder="Enter teacher's name"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>

      {/* Display teacher profiles */}
      <View style={styles.profilesContainer}>
        <Text style={styles.profilesTitle}>Saved Teacher Profiles:</Text>
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <View key={index} style={styles.profile}>
              <Text style={styles.profileText}>
                {profile.teacherName}: {Object.keys(profile.selectedSlots).join(", ")}
              </Text>
            </View>
          ))
        ) : (
          <Text>No profiles saved yet.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  dayText: {
    width: 80,
    fontWeight: "bold",
    fontSize: Platform.OS === "web" ? 16 : 14,
  },
  slot: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
    minWidth: 120,
    height: 45,
  },
  unselectedSlot: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
  },
  selectedSlot: {
    backgroundColor: "#4caf50",
    borderColor: "#388e3c",
  },
  slotText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  selectionSummary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
    width: "100%",
  },
  summaryText: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  summarySlotText: {
    fontSize: 14,
    marginVertical: 2,
  },
  inputContainer: {
    marginTop: 20,
    width: "100%",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  profilesContainer: {
    marginTop: 30,
    width: "100%",
  },
  profilesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profile: {
    marginBottom: 10,
  },
  profileText: {
    fontSize: 14,
  },
});

export default TimeTable;
