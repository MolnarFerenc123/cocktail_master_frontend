import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../core/theme";
import { HomeViewModel } from "../viewmodels/HomeViewModel";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - theme.spacing.m * 2 - 20) / 3;

const CATEGORIES = [
  "All",
  "Virgin",
  "Alcoholic",
  "Vodka",
  "Rum",
  "Gin",
  "Tequila",
  "Whiskey",
];

const formatDataIntoRows = (data, numColumns) => {
  const rows = [];
  for (let i = 0; i < data.length; i += numColumns) {
    rows.push(data.slice(i, i + numColumns));
  }
  return rows;
};

const HomeHeader = ({ activeFilter, setActiveFilter }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.appName}>Cocktail Master</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                activeFilter === cat && styles.activePill,
              ]}
              onPress={() => setActiveFilter(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeFilter === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();

  const { cocktails, externalCocktails, loading, activeFilter, setActiveFilter, reload } = HomeViewModel();

  const renderCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.gridCard}
      onPress={() => navigation.navigate("CocktailDetail", { id: item.id })}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>

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

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeaderContainer}>
      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const sections = [
    { title: "Cocktail Menu", data: formatDataIntoRows(cocktails, 3) },
  ];

  if (externalCocktails.length > 0) {
    sections.push({
      title: "TheCocktailDB",
      data: formatDataIntoRows(externalCocktails, 3),
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `row-${index}`}
        renderItem={renderRow}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <HomeHeader
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onRefresh={reload}
        refreshing={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.m,
    marginBottom: 10,
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: CARD_WIDTH,
    backgroundColor: "#eee",
  },
  cardContent: {
    padding: 8,
    alignItems: "flex-start",
    width: "100%",
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 2,
  },
  virginBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 0,
  },
  virginText: {
    color: "#166534",
    fontSize: 9,
    fontWeight: "800",
  },
  header: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  appName: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: "bold",
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterScrollContent: {
    paddingHorizontal: theme.spacing.m,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    marginRight: 10,
  },
  activePill: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "white",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.m,
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.2,
  },
  sectionTitle: {
    marginHorizontal: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
});