import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../core/theme';
import { Action12Animation } from '../animations/actions/Action12Animation';
import { Action11Animation } from '../animations/actions/Action11Animation';
import { Action13Animation } from '../animations/actions/Action13Animation';
import { Action14Animation } from '../animations/actions/Action14Animation';
import { Action16Animation } from '../animations/actions/Action16Animation';
import { Action17Animation } from '../animations/actions/Action17Animation';

export default function AnimationScreen({ route, navigation }) {
  const { cocktail } = route.params;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const steps = cocktail.steps || [];
  const currentStep = steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevStep = () => {
    if (isFinished) {
      setIsFinished(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const renderCurrentAnimation = () => {
    if (isFinished) {
      return (
        <View style={styles.centerContent}>
          <Ionicons name="checkmark-circle" size={100} color={theme.colors.primary} />
          <Text style={styles.finishText}>Cocktail is Done</Text>
          <TouchableOpacity style={styles.restartButton} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Back to recipe</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!currentStep) return <ActivityIndicator />;
    console.log

    switch (currentStep.actionId) {
      case 11:
        return (
          <Action11Animation 
            key={currentStepIndex} 
            glassType={currentStep.details?.ingredient || "Glass"} 
          />
        );
      case 12:
        return (
          <Action12Animation 
            key={currentStepIndex} 
            ingredient={currentStep.details?.ingredient || "lime"} 
          />
        );
      case 13:
        return (
          <Action13Animation
            key={currentStepIndex}
            ingredient={currentStep.details?.ingredient || "salt"}
          />
        );
      case 14:
        return <Action14Animation key={currentStepIndex} />;
      case 16:
        return (
          <Action16Animation 
            key={currentStepIndex} 
            ingredient={currentStep.details?.ingredient}
            amount={currentStep.details?.amount}
            unit={currentStep.details?.unit}
          />
        );
      case 17:
        return (
            <Action17Animation 
                key={currentStepIndex}
                amount={currentStep.details?.amount}
            />
        );
      default:
        return (
          <PlaceholderAnimation step={currentStep} />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.navigationRow}>
          <TouchableOpacity 
            onPress={handlePrevStep} 
            style={[styles.navButton, currentStepIndex === 0 && !isFinished && styles.disabledButton]}
            disabled={currentStepIndex === 0 && !isFinished}
          >
            <Ionicons name="chevron-back" size={40} color={theme.colors.primary} />
          </TouchableOpacity>

          <View style={styles.stepIndicatorContainer}>
            {!isFinished ? (
              <>
                <Text style={styles.stepTitle}>Step {currentStepIndex + 1}</Text>
                <Text style={styles.stepSubTitle}>/ {steps.length}</Text>
              </>
            ) : (
              <Text style={styles.stepTitle}>DONE</Text>
            )}
          </View>

          <TouchableOpacity 
            onPress={handleNextStep} 
            style={[styles.navButton, isFinished && styles.disabledButton]}
            disabled={isFinished}
          >
            <Ionicons name="chevron-forward" size={40} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {!isFinished && currentStep && (
        <View style={styles.descriptionBlock}>
          <Text style={styles.description}>{currentStep.fullDescription}</Text>
        </View>
      )}

      <View style={styles.stage}>
        {renderCurrentAnimation()}
      </View>
    </SafeAreaView>
  );
}

const PlaceholderAnimation = ({ step }) => {
  return (
    <View style={styles.centerContent}>
      <Text style={styles.placeholderTitle}>Action ID: {step.actionId}</Text>
      <Text style={styles.placeholderDesc}>Animation is under development</Text>
      <Ionicons name="construct-outline" size={50} color="#666" style={{marginTop: 20}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background,
    paddingTop: 20 
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 5,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: theme.colors.surface,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.2,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  stepSubTitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  descriptionBlock: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  description: { 
    fontSize: 18, 
    textAlign: 'center', 
    color: theme.colors.text,
    lineHeight: 26,
    fontWeight: '500',
  },
  stage: { 
    flex: 1, 
    justifyContent: 'center',
  },
  centerContent: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  finishText: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: theme.colors.text, 
    marginTop: 20 
  },
  restartButton: { 
    marginTop: 30, 
    backgroundColor: theme.colors.primary, 
    paddingHorizontal: 30,
    paddingVertical: 15, 
    borderRadius: 10 
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16
  },
  placeholderTitle: { fontSize: 24, fontWeight: 'bold', color: '#888' },
  placeholderDesc: { fontSize: 14, color: '#aaa', marginTop: 5 }
});