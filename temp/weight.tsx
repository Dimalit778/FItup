// interface WeightEntry {
//   id: string;
//   user_id: string;
//   weight: number;
//   date: string;
// }

// export default function WeightScreen() {
//   const { t } = useTranslation();
//   const { user } = useAuthStore();
//   const [weight, setWeight] = useState("");
//   const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   const screenWidth = Dimensions.get("window").width;

//   useEffect(() => {
//     if (user) {
//       loadWeightEntries();
//     }
//   }, [user]);

//   // const loadWeightEntries = async () => {
//   //   if (!user) return;

//   //   try {
//   //     const { data, error } = await supabase
//   //       .from("weight_entries")
//   //       .select("*")
//   //       .eq("user_id", user.id)
//   //       .order("date", { ascending: false });

//   //     if (error) throw error;

//   //     setWeightEntries(data || []);
//   //   } catch (error) {
//   //     console.error("Error loading weight entries:", error);
//   //     Alert.alert(t("common.error"), t("weight.loadError"));
//   //   } finally {
//   //     setInitialLoading(false);
//   //   }
//   // };

//   const addWeightEntry = async () => {
//     if (!user) return;
//     if (!weight || isNaN(parseFloat(weight))) {
//       Alert.alert(t("common.error"), t("weight.invalidWeight"));
//       return;
//     }

//     setLoading(true);
//     try {
//       const newEntry = {
//         user_id: user.id,
//         weight: parseFloat(weight),
//         date: new Date().toISOString(),
//       };

//       const { error } = await supabase.from("weight_entries").insert([newEntry]);

//       if (error) throw error;

//       setWeight("");
//       await loadWeightEntries();
//       Alert.alert("Success", t("weight.success"));
//     } catch (error) {
//       console.error("Error adding weight entry:", error);
//       Alert.alert(t("common.error"), t("weight.error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getChartData = () => {
//     if (weightEntries.length === 0) {
//       return {
//         labels: ["No Data"],
//         datasets: [{ data: [0] }],
//       };
//     }

//     const sortedEntries = [...weightEntries].slice(0, 7).reverse();
//     const labels = sortedEntries.map((entry) =>
//       new Date(entry.date).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       })
//     );
//     const data = sortedEntries.map((entry) => entry.weight);

//     return {
//       labels,
//       datasets: [{ data }],
//     };
//   };

//   if (initialLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3B82F6" />
//           <Text style={styles.loadingText}>{t("common.loading")}</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <Text style={styles.title}>{t("weight.title")}</Text>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>{t("weight.addWeight")}</Text>

//           <View style={styles.inputRow}>
//             <TextInput
//               style={styles.input}
//               value={weight}
//               onChangeText={setWeight}
//               placeholder={t("weight.enterWeight")}
//               keyboardType="numeric"
//             />
//             <TouchableOpacity
//               style={[styles.addButton, loading && styles.disabledButton]}
//               onPress={addWeightEntry}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#FFFFFF\" size="small" />
//               ) : (
//                 <Plus color="#FFFFFF\" size={20} />
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {weightEntries.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>{t("weight.progress")}</Text>
//             <View style={styles.chartContainer}>
//               <LineChart
//                 data={getChartData()}
//                 width={screenWidth - 80}
//                 height={220}
//                 chartConfig={{
//                   backgroundColor: "#FFFFFF",
//                   backgroundGradientFrom: "#FFFFFF",
//                   backgroundGradientTo: "#FFFFFF",
//                   decimalPlaces: 1,
//                   color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
//                   style: {
//                     borderRadius: 16,
//                   },
//                   propsForDots: {
//                     r: "6",
//                     strokeWidth: "2",
//                     stroke: "#3B82F6",
//                   },
//                 }}
//                 bezier
//                 style={styles.chart}
//               />
//             </View>
//           </View>
//         )}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>{t("weight.currentWeight")}</Text>
//           {weightEntries.length > 0 ? (
//             <View style={styles.currentWeightCard}>
//               <Text style={styles.currentWeightValue}>{weightEntries[0].weight} kg</Text>
//               <Text style={styles.currentWeightDate}>
//                 {new Date(weightEntries[0].date).toLocaleDateString()}
//               </Text>
//             </View>
//           ) : (
//             <Text style={styles.noDataText}>{t("weight.noData")}</Text>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   scrollView: {
//     flex: 1,
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#6B7280",
//     fontFamily: "Inter-Medium",
//   },
//   title: {
//     fontSize: 28,
//     fontFamily: "Inter-Bold",
//     color: "#111827",
//     marginBottom: 24,
//   },
//   section: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: "Inter-SemiBold",
//     color: "#374151",
//     marginBottom: 16,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     fontFamily: "Inter-Regular",
//     color: "#111827",
//   },
//   addButton: {
//     backgroundColor: "#3B82F6",
//     borderRadius: 8,
//     padding: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     width: 48,
//     height: 48,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   chartContainer: {
//     alignItems: "center",
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   currentWeightCard: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#EFF6FF",
//     borderRadius: 8,
//   },
//   currentWeightValue: {
//     fontSize: 36,
//     fontFamily: "Inter-Bold",
//     color: "#3B82F6",
//   },
//   currentWeightDate: {
//     fontSize: 14,
//     fontFamily: "Inter-Medium",
//     color: "#6B7280",
//     marginTop: 4,
//   },
//   noDataText: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "#6B7280",
//     fontFamily: "Inter-Medium",
//     padding: 20,
//   },
// });
