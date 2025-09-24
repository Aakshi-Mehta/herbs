import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Icons
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CollectorDashboard() {
  const router = useRouter();

  // Dashboard options
  const options = [
    { title: "Capture Herb Data", icon: "leaf", iconType: "FontAwesome5", route: "/collector/capture-herb" },
    { title: "Upload Herb Photos", icon: "camera", iconType: "Entypo", route: "/collector/upload-photos" },
    { title: "Generate Batch & QR", icon: "qr-code", iconType: "MaterialIcons", route: "/collector/generate-batch" },
    { title: "Offline Sync to Blockchain", icon: "sync", iconType: "MaterialIcons", route: "/collector/sync-blockchain" },
    { title: "Sustainability Zone Map", icon: "map", iconType: "Entypo", route: "/collector/sustainability-map" },
  ];

  // Function to render icons dynamically
  const renderIcon = (icon: string, type: string) => {
    switch (type) {
      case "MaterialIcons":
        return <MaterialIcons name={icon as any} size={40} color="#15803d" />;
      case "Entypo":
        return <Entypo name={icon as any} size={40} color="#15803d" />;
      case "FontAwesome5":
        return <FontAwesome5 name={icon as any} size={40} color="#15803d" />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Collector Dashboard</Text>
      <View style={styles.grid}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(option.route)}
          >
            {renderIcon(option.icon, option.iconType)}
            <Text style={styles.cardText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0fdf4",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#15803d",
    marginBottom: 30,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
});
