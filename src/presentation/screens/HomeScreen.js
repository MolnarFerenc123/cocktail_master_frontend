import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';

export default function HomeScreen() {
  const categories = ['All', 'Gin', 'Vodka', 'Rum', 'Tequila', 'Non-alcoholic'];
  
  const cocktails = [
    {
      id: '1',
      name: 'Neon Mojito',
      category: 'Rum',
      description: 'Classic Cuban cooler with a twist.',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Blue Lagoon',
      category: 'Vodka',
      description: 'Sweet, blue and refreshing.',
      rating: 4.5,
    },
    {
      id: '3',
      name: 'Espresso Martini',
      category: 'Liqueur',
      description: 'Energy boost for the night.',
      rating: 4.9,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Evening, Master!</Text>
            <Text style={styles.title}>What are we mixing?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <Text style={styles.searchText}>Search cocktails...</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.categoryPill, index === 0 && styles.activePill]}
            >
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular Cocktails 🔥</Text>
        
        {cocktails.map((cocktail) => (
          <TouchableOpacity key={cocktail.id} style={styles.card}>
            <View style={styles.cardImagePlaceholder}>
              <Ionicons name="wine" size={32} color={theme.colors.primary} />
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{cocktail.name}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{cocktail.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{cocktail.description}</Text>
              <Text style={styles.cardCategory}>{cocktail.category}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.l,
  },
  scrollContent: {
    paddingBottom: 100 
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
  searchContainer: {
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderRadius: 16,
    marginBottom: theme.spacing.l,
  },
  searchText: {
    color: theme.colors.textSecondary,
    marginLeft: 10,
  },
  categoriesContainer: {
    marginBottom: theme.spacing.l,
    marginHorizontal: -theme.spacing.l, 
    paddingHorizontal: theme.spacing.l,
  },
  categoryPill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    borderRadius: 20,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 15,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  cardCategory: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  }
});