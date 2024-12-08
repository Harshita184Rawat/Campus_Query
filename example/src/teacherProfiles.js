// This array will hold all teacher profiles
const teacherProfiles = [];

// Function to save a teacher profile
export const saveTeacherProfile = (teacherName, selectedSlots) => {
  // Create a profile object
  const profile = {
    teacherName,
    selectedSlots,
  };

  // Add the profile to the array
  teacherProfiles.push(profile);

  // For now, log the profiles (you can later persist this data in a database or local storage)
  console.log("Teacher Profiles:", teacherProfiles);
};

// Function to get all teacher profiles
export const getTeacherProfiles = () => {
  return teacherProfiles;
};
