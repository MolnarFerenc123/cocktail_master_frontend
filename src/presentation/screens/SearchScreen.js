import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import { useSearchViewModel } from "../viewmodels/SearchViewModel";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - theme.spacing.m * 2 - 20) / 3;

const FILTERS = ["All", "Alcoholic", "Virgin"];

const formatDataIntoRows = (data, numColumns) => {
  const rows = [];
  for (let i = 0; i < data.length; i += numColumns) {
    rows.push(data.slice(i, i + numColumns));
  }
  return rows;
};

export default function SearchScreen() {
  const navigation = useNavigation();
  const {
    searchText,
    setSearchText,
    activeFilter,
    setActiveFilter,
    selectedIngredients,
    addIngredient,
    removeIngredient,
    ingredientSearchText,
    setIngredientSearchText,
    suggestedIngredients,
    results,
    loading,
  } = useSearchViewModel();

  const renderCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.gridCard}
      onPress={() => navigation.navigate("CocktailDetail", { id: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
        {item.isVirgin && (
          <View style={styles.virginBadge}>
            <Text style={styles.virginText}>VIRGIN</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRow = ({ item }) => (
    <View style={styles.rowWrapper}>
      {item.map((cocktail) => renderCard(cocktail))}
      {Array.from({ length: 3 - item.length }).map((_, idx) => (
        <View key={`empty-${idx}`} style={{ width: CARD_WIDTH }} />
      ))}
    </View>
  );

  const headerComponent = (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Mix & Match</Text>
        
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by cocktail name..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterSection}>
        <View style={styles.typeFilters}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.pill, activeFilter === f && styles.activePill]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.pillText, activeFilter === f && styles.activePillText]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subTitle}>My Ingredients:</Text>
        <View style={{ paddingHorizontal: theme.spacing.m, marginBottom: 15, zIndex: 10 }}>
          <View style={styles.ingredientInputBox}>
            <Ionicons name="add-circle-outline" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Type to add ingredients (e.g. Vodka)..."
              placeholderTextColor={theme.colors.textSecondary}
              value={ingredientSearchText}
              onChangeText={setIngredientSearchText}
              autoCorrect={false}
            />
          </View>

          {suggestedIngredients.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestedIngredients.map((ing) => (
                <TouchableOpacity 
                  key={ing.id || ing.ingredient_id} 
                  style={styles.suggestionItem}
                  onPress={() => addIngredient(ing)}
                >
                  <Text style={styles.suggestionText}>{ing.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.selectedChipsContainer}>
            {selectedIngredients.map((ing) => (
              <View key={ing.id || ing.ingredient_id} style={styles.selectedChip}>
                <Text style={styles.selectedChipText}>{ing.name}</Text>
                <TouchableOpacity onPress={() => removeIngredient(ing.id || ing.ingredient_id)}>
                  <Ionicons name="close" size={16} color="white" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {loading && results.length === 0 ? (
        <View style={styles.loadingContainer}>
          {headerComponent}
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 50 }} />
        </View>
      ) : results.length === 0 ? (
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={headerComponent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No cocktails found. Try different ingredients or search terms!</Text>
          }
        />
      ) : (
        <FlatList
          data={formatDataIntoRows(results, 3)}
          keyExtractor={(item, index) => `row-${index}`}
          renderItem={renderRow}
          ListHeaderComponent={headerComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  loadingContainer: { flex: 1 },
  header: { paddingHorizontal: theme.spacing.m, marginTop: theme.spacing.m },
  title: { fontSize: 36, fontWeight: "bold", color: theme.colors.text, marginBottom: 15 },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: theme.colors.surface, borderRadius: 12, paddingHorizontal: 15, height: 50 },
  ingredientInputBox: { flexDirection: "row", alignItems: "center", backgroundColor: theme.colors.surface, borderRadius: 12, paddingHorizontal: 15, height: 45, borderWidth: 1, borderColor: '#3f3f46' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: theme.colors.text, fontSize: 16 },
  filterSection: { paddingVertical: 15, zIndex: 10 },
  typeFilters: { flexDirection: "row", paddingHorizontal: theme.spacing.m, marginBottom: 20 },
  pill: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.surface, marginRight: 10 },
  activePill: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  pillText: { color: theme.colors.textSecondary, fontWeight: "600" },
  activePillText: { color: "white" },
  subTitle: { color: theme.colors.text, fontSize: 16, fontWeight: "bold", paddingHorizontal: theme.spacing.m, marginBottom: 10 },
  
  suggestionsContainer: { backgroundColor: theme.colors.surface, borderRadius: 8, marginTop: 5, paddingVertical: 5, elevation: 5, zIndex: 20 },
  suggestionItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  suggestionText: { color: theme.colors.text, fontSize: 16 },
  
  selectedChipsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 15, gap: 8 },
  selectedChip: { flexDirection: "row", alignItems: "center", backgroundColor: theme.colors.primary, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  selectedChipText: { color: "white", fontSize: 14, fontWeight: "600" },

  listContent: { paddingBottom: 100 },
  rowWrapper: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: theme.spacing.m, marginBottom: 10 },
  gridCard: { width: CARD_WIDTH, backgroundColor: theme.colors.surface, borderRadius: 12, overflow: "hidden", alignItems: "center", paddingBottom: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardImage: { width: "100%", height: CARD_WIDTH, backgroundColor: "#eee" },
  cardContent: { padding: 8, alignItems: "flex-start", width: "100%" },
  cardTitle: { color: theme.colors.text, fontSize: 14, fontWeight: "bold", textAlign: "left", marginBottom: 2 },
  virginBadge: { backgroundColor: "#dcfce7", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: "flex-start", marginTop: 0 },
  virginText: { color: "#166534", fontSize: 9, fontWeight: "800" },
  emptyText: { color: theme.colors.textSecondary, textAlign: "center", marginTop: 50, fontSize: 16 },
});