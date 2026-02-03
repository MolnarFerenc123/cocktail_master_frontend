import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';
import { CocktailApi } from '../../data/api';

export default function CocktailDetailScreen({ route, navigation }) {
  const { id } = route.params; 
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    setLoading(true);
    const data = await CocktailApi.getCocktailDetails(id);
    setDetails(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load recipe.</Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          <Text style={styles.title}>{details.name}</Text>
          {details.isVirgin && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Virgin</Text>
            </View>
          )}
        </View>

        <Text style={styles.category}>
          {details.isVirgin ? 'Non-Alcoholic Beverage' : 'Alcoholic Cocktail'}
        </Text>

        <ScrollView>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {details.ingredients.map((ing, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.bullet} />
              <Text style={styles.ingredientText}>
                {ing.amount ? `${ing.amount} ` : ''}
                {ing.unit ? `${ing.unit} ` : ''}
                {ing.name}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Instructions</Text>
          {details.instructions.map((step) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepNumberBadge}>
                <Text style={styles.stepNumber}>{step.number}</Text>
              </View>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}

          <View style={{height: 40}} /> 
        </ScrollView>
      </View>
    </View>
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
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.text,
    marginBottom: 20,
  },
  backText: {
    color: theme.colors.primary,
  },
  imageHeader: {
    height: 250,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  tag: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  category: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: theme.spacing.m,
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
  stepRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  }
});