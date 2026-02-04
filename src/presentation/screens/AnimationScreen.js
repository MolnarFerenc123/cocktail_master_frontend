import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';
import { Action11Animation } from '../animations/actions/Action11Animation';

export default function AnimationScreen({ route, navigation }) {
  // Megkapjuk a teljes koktél entitást
  const { cocktail } = route.params;

  // KERESÉS: Megnézzük, van-e a lépések között Action 11 (Pohár választás)
  // és kivesszük belőle a pohár nevét a 'details.ingredient' mezőből.
  const glassStep = cocktail.steps.find(s => s.actionId === 11 || s.id === 12); // A te JSON-odban stepId: 12 volt a glass
  
  // Ha nincs megadva, default 'highball'-t használunk tesztnek
  const glassType = glassStep?.details?.ingredient || 'highball';

  return (
    <View style={styles.container}>
      
      {/* HEADER: Bezárás gomb */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={30} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* A "SZÍNPAD": Itt jelenik meg az animáció */}
      <View style={styles.stage}>
        <Text style={styles.debugText}>Glass Type: {glassType}</Text>
        
        {/* A komponens amit csináltunk: */}
        <Action11Animation glassType={glassType} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  stage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  debugText: {
    position: 'absolute',
    top: 20,
    color: '#888',
    fontSize: 12,
  }
});