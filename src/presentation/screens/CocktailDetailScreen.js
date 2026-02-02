import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';

export default function CocktailDetailScreen({ route, navigation }) {
  const { cocktail } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <View style={styles.placeholderImage}>
          <Ionicons name="wine" size={80} color={theme.colors.primary} />
        </View>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{cocktail.name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{cocktail.rating}</Text>
          </View>
        </View>

        <Text style={styles.category}>{cocktail.category}</Text>
        <Text style={styles.description}>{cocktail.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientRow}>
          <View style={styles.bullet} />
          <Text style={styles.ingredientText}>Ingredient 1 (Placeholder)</Text>
        </View>
        <View style={styles.ingredientRow}>
          <View style={styles.bullet} />
          <Text style={styles.ingredientText}>Ingredient 2 (Placeholder)</Text>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Start Mixing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageHeader: {
    height: 300,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: -30,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: theme.spacing.l,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  category: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: theme.spacing.m,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.surface,
    marginVertical: theme.spacing.l,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.m,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  ingredientText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.xl,
    padding: theme.spacing.m,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
});