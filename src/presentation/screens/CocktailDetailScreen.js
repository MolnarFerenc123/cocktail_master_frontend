import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';
import { CocktailDetailViewModel } from '../viewmodels/CocktailDetailViewModel';

export default function CocktailDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { cocktail, loading, error, loadCocktail } = CocktailDetailViewModel();

  useEffect(() => {
    loadCocktail(id);
  }, [id, loadCocktail]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !cocktail) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Nem sikerült betölteni a receptet."}</Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.backText}>Vissza</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* KÉP HEADER + VISSZA GOMB (Változatlan) */}
      <View style={styles.imageHeader}>
        {cocktail.imageUrl ? (
            <Image source={{ uri: cocktail.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : (
            <View style={styles.placeholderImage}>
                <Ionicons name="wine" size={80} color={theme.colors.primary} />
            </View>
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* TARTALOM */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{cocktail.name}</Text>
          {cocktail.isVirgin && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Virgin</Text>
            </View>
          )}
        </View>

        <Text style={styles.category}>{cocktail.categoryLabel}</Text>

        {/* Padding Bottom növelése, hogy a gomb ne takarja ki a lista végét */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          
          {/* ... Ingredients (Változatlan) ... */}
          {cocktail.ingredients.length > 0 && (
            <>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {cocktail.ingredients.map((ing, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.ingredientText}>{ing.formatted}</Text>
                    </View>
                ))}
                <View style={styles.divider} />
            </>
          )}

          {/* ... Steps (Változatlan) ... */}
          <Text style={styles.sectionTitle}>Instructions</Text>
          {cocktail.sortedSteps.length === 0 ? (
             <Text style={{ fontStyle: 'italic', color: '#888' }}>Nincs rögzített leírás.</Text>
          ) : (
             cocktail.sortedSteps.map((step) => (
                <View key={step.id} style={styles.stepRow}>
                    <View style={styles.stepNumberBadge}>
                        <Text style={styles.stepNumber}>{step.number}</Text>
                    </View>
                    <Text style={styles.stepText}>{step.fullDescription}</Text>
                </View>
             ))
          )}
        </ScrollView>

        {/* --- ÚJ PLAY GOMB (Csak ha van animáció) --- */}
        {cocktail.hasAnimation && (
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => console.log("Play Animation Pressed")} // Itt navigálsz majd az animációra
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={32} color="white" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}

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
    fontWeight: 'bold',
  },
  imageHeader: {
    height: 300,
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
    marginRight: 10,
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
  },
  playButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  }
});