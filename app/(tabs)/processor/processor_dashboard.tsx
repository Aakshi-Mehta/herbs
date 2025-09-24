import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ProcessorDashboard() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Processor ID: Ar123</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/processor/scan-batch")}
      >
        <Text style={styles.buttonText}>Scan Batch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/processor/upload-lab-test")}
      >
        <Text style={styles.buttonText}>Upload Lab Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/processor/update-batch-status")}
      >
        <Text style={styles.buttonText}>Update Batch Status</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/processor/smart-contract-validation")}
      >
        <Text style={styles.buttonText}>Smart Contract Validation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/processor/sync-blockchain")}
      >
        <Text style={styles.buttonText}>Sync to Blockchain</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/processor/history")}
      >
        <Text style={styles.buttonText}>View Previous Batches</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#15803d",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
