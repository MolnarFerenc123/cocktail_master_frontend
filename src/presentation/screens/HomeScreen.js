import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../core/theme';
import { CocktailApi } from '../../data/api';

const { width } = Dimensions.get('window');
// Kiszámoljuk a kártya szélességét: (Képernyő - margók) / 3
const CARD_WIDTH = (width - (theme.spacing.m * 2) - 20) / 3;

const CATEGORIES = [
  'All', 'Virgin', 'Alcoholic', 'Vodka', 'Rum', 'Gin', 'Tequila', 'Whiskey'
];

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
              style={[styles.categoryPill, activeFilter === cat && styles.activePill]}
              onPress={() => setActiveFilter(cat)}
            >
              <Text style={[styles.categoryText, activeFilter === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <Text style={styles.sectionTitle}>Cocktail Menu</Text>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All'); 

  useEffect(() => {
    loadCocktails();
  }, []);

  const loadCocktails = async () => {
    setLoading(true);
    const data = await CocktailApi.getAllCocktails();
    setCocktails(data);
    setLoading(false);
  };

  const displayedCocktails = cocktails.filter(c => {
    switch (activeFilter) {
      case 'All': return true;
      case 'Virgin': return c.isVirgin;
      case 'Alcoholic': return !c.isVirgin;
      case 'Vodka':
      case 'Rum':
      case 'Gin':
      case 'Tequila':
      case 'Whiskey':
        return true; 
      default: return true; 
    }
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gridCard}
      onPress={() => navigation.navigate('CocktailDetail', { id: item.id, name: item.name })}
    >
      {/* 1. KÉP */}
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.cardImage} 
        resizeMode="cover"
      />
      
      <View style={styles.cardContent}>
        {/* 2. NÉV */}
        <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
        
        {/* 3. VIRGIN FELIRAT (Közvetlen alatta) */}
        {item.isVirgin && (
          <View style={styles.virginBadge}>
            <Text style={styles.virginText}>VIRGIN</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={displayedCocktails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        
        numColumns={3} 
        key={3} 
        columnWrapperStyle={styles.columnWrapper} 
        
        ListHeaderComponent={
          <HomeHeader 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 100,
  },
  columnWrapper: {
    paddingHorizontal: theme.spacing.m,
    justifyContent: 'flex-start',
    gap: 10, 
    marginBottom: 10,
  },
  
  // --- KÁRTYA STÍLUSOK ---
  gridCard: {
    width: CARD_WIDTH, 
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // Eltávolítottam a fix magasságot, hogy a tartalomhoz igazodjon
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH, 
    backgroundColor: '#eee',
  },
  cardContent: {
    padding: 8,
    alignItems: 'flex-start', // Balra igazít mindent
    width: '100%',
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 2, // Csak 2 pixel hely a név és a Virgin között (nagyon szoros)
    // height: 40,  <-- EZT KIVETTEM, HOGY NE LEGYEN LYUK
  },
  virginBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start', // Balra tapad
    marginTop: 0, // Biztos ami biztos
  },
  virginText: {
    color: '#166534',
    fontSize: 9,
    fontWeight: '800',
  },

  // --- HEADER STÍLUSOK (VÁLTOZATLAN) ---
  header: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  appName: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 20,
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
    fontWeight: '600',
  },
  activeCategoryText: {
    color: 'white',
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
});