import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

type RootStackParamList = {
  RoleSelect: undefined;
  Farmer: undefined;
  Processor: undefined;
  Manufacturer: undefined;
  Consumer: undefined;
  Admin: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// A reusable screen wrapper for roles
const ScreenWrapper = ({ title, steps }: { title: string; steps: string[] }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {steps.map((s, i) => (
      <Text key={i} style={styles.step}>• {s}</Text>
    ))}
  </ScrollView>
);

// Role-specific screens
function FarmerScreen() {
  return (
    <ScreenWrapper
      title="Collector / Farmer"
      steps={[
        "Harvest herb",
        "Capture GPS + photo",
        "Generate Batch QR",
        "Record on Blockchain"
      ]}
    />
  );
}

function ProcessorScreen() {
  return (
    <ScreenWrapper
      title="Processor / Middleman"
      steps={[
        "Scan Batch QR & update processing",
        "Upload Lab Tests",
        "Smart Contract Validates",
        "Batch Updated on Blockchain"
      ]}
    />
  );
}

function ManufacturerScreen() {
  return (
    <ScreenWrapper
      title="Manufacturer"
      steps={[
        "Scan Herb Batches",
        "Link Batches",
        "Generate Final Product QR",
        "Record on Blockchain"
      ]}
    />
  );
}

function ConsumerScreen() {
  return (
    <ScreenWrapper
      title="Consumer"
      steps={[
        "Scan Final Product QR",
        "View Journey: Origin, Lab Results",
        "View Authenticity Badge"
      ]}
    />
  );
}

function AdminScreen() {
  return (
    <ScreenWrapper
      title="Regulator / Admin"
      steps={[
        "Login to Dashboard",
        "Monitor Batches",
        "View Flagged Compliance",
        "Track flagged batches"
      ]}
    />
  );
}

// Role selection screen
function RoleSelectScreen({ navigation }: any) {
  const roles = [
    { name: "Farmer", screen: "Farmer" },
    { name: "Processor", screen: "Processor" },
    { name: "Manufacturer", screen: "Manufacturer" },
    { name: "Consumer", screen: "Consumer" },
    { name: "Admin", screen: "Admin" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as</Text>
      {roles.map((role, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => navigation.navigate(role.screen)}
        >
          <Text style={styles.buttonText}>{role.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Export navigator only, remove NavigationContainer for expo-router
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="RoleSelect">
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} options={{ title: "Choose Role" }} />
      <Stack.Screen name="Farmer" component={FarmerScreen} />
      <Stack.Screen name="Processor" component={ProcessorScreen} />
      <Stack.Screen name="Manufacturer" component={ManufacturerScreen} />
      <Stack.Screen name="Consumer" component={ConsumerScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  step: {
    fontSize: 18,
    marginBottom: 10,
  },
});
