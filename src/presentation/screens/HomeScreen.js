import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../core/theme';
import { CocktailApi } from '../../data/api';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVirgin, setFilterVirgin] = useState(false);

  useEffect(() => {
    loadCocktails();
  }, []);

  const loadCocktails = async () => {
    setLoading(true);
    const data = await CocktailApi.getAllCocktails();
    setCocktails(data);
    setLoading(false);
  };

  const displayedCocktails = filterVirgin 
    ? cocktails.filter(c => c.isVirgin) 
    : cocktails;

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Evening!</Text>
          <Text style={styles.title}>Let's mix something.</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={loadCocktails}>
          <Ionicons name="reload" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
         <TouchableOpacity 
           style={[styles.categoryPill, !filterVirgin && styles.activePill]}
           onPress={() => setFilterVirgin(false)}
         >
           <Text style={[styles.categoryText, !filterVirgin && styles.activeCategoryText]}>All</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
           style={[styles.categoryPill, filterVirgin && styles.activePill]}
           onPress={() => setFilterVirgin(true)}
         >
           <Text style={[styles.categoryText, filterVirgin && styles.activeCategoryText]}>Virgin (0%)</Text>
         </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Cocktail Menu</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CocktailDetail', { id: item.id, name: item.name })}
    >
      <View style={styles.cardImagePlaceholder}>
        <Ionicons name={item.isVirgin ? "cafe" : "wine"} size={24} color={theme.colors.primary} />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {item.isVirgin && (
            <View style={styles.virginBadge}>
              <Text style={styles.virginText}>VIRGIN</Text>
            </View>
          )}
        </View>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
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
        ListHeaderComponent={renderHeader}
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
    paddingHorizontal: theme.spacing.m,
    paddingBottom: 100, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  greeting: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    borderRadius: 12,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
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
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing.m,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(244, 63, 94, 0.1)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  virginBadge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  virginText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});