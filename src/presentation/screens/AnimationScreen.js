import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";

import {
  mixLiquidColors,
  ingredientColors,
  lightenHexColor,
} from "../utils/colorUtils";

import { Action11Animation } from "../animations/actions/Action11Animation";
import { Action12Animation } from "../animations/actions/Action12Animation";
import { Action13Animation } from "../animations/actions/Action13Animation";
import { Action14Animation } from "../animations/actions/Action14Animation";
import { Action15Animation } from "../animations/actions/Action15Animation";
import { Action16Animation } from "../animations/actions/Action16Animation";
import { Action17Animation } from "../animations/actions/Action17Animation";
import { Action18Animation } from "../animations/actions/Action18Animation";
import { Action19Animation } from "../animations/actions/Action19Animation";
import { Action20Animation } from "../animations/actions/Action20Animation";
import { Action24Animation } from "../animations/actions/Action24Animation";
import { Action25Animation } from "../animations/actions/Action25Animation";
import { Action27Animation } from "../animations/actions/Action27Animation";
import { Action28Animation } from "../animations/actions/Action28Animation";

export default function AnimationScreen({ route, navigation }) {
  const { cocktail } = route.params;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [glassState, setGlassState] = useState({
    glassType: null,
    hasIce: false,
    hasRim: false,
    rimColor: "white",
    fillLevel: 0,
    previousFillLevel: 0,
    liquidColor: "transparent",
    previousLiquidColor: "transparent",
    addedLiquids: [],
    fruitsInside: [],
    muddledFruit: null,
    garnishOnRim: null,
  });

  const steps = cocktail.steps || [];
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (!steps || steps.length === 0) return;

    let tempState = {
      glassType: null,
      hasIce: false,
      hasRim: false,
      rimColor: "white",
      fillLevel: 0,
      previousFillLevel: 0,
      liquidColor: "transparent",
      previousLiquidColor: "transparent",
      addedLiquids: [],
      fruitsInside: [],
      muddledFruit: null,
      garnishOnRim: null,
    };

    for (let i = 0; i <= currentStepIndex; i++) {
      const step = steps[i];
      if (!step) continue;

      tempState.previousLiquidColor = tempState.liquidColor;
      tempState.previousFillLevel = tempState.fillLevel;

      switch (step.actionId) {
        case 11:
          tempState.glassType = step.details?.ingredient || "RegularGlass";
          break;
        case 13:
          tempState.hasRim = true;
          tempState.rimColor =
            step.details?.ingredient === "lime" ? "#84cc16" : "white";
          break;
        case 15:
          tempState.hasIce = true;
          break;
        case 16:
          if (step.details?.ingredient) {
            tempState.addedLiquids.push(step.details.ingredient);
            tempState.liquidColor = mixLiquidColors(tempState.addedLiquids);
          }
          break;
        case 18:
          tempState.fillLevel = 140;
          break;
        case 19:
          tempState.garnishOnRim = step.details?.ingredient || "lime";
          break;
        case 20:
          tempState.fillLevel = 180;
          tempState.liquidColor = lightenHexColor(tempState.liquidColor, 0.6);
          break;
        case 24:
          tempState.muddledFruit = step.details?.ingredient || "orange";
          break;
        case 27:
          if (step.details?.ingredient) {
            tempState.addedLiquids.push(step.details.ingredient);
            tempState.liquidColor = mixLiquidColors(tempState.addedLiquids);
            tempState.fillLevel = Math.min(180, tempState.previousFillLevel + 40);
          }
          break;
      }
    }
    setGlassState(tempState);
  }, [currentStepIndex, steps]);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevStep = () => {
    if (isFinished) {
      setIsFinished(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const renderCurrentAnimation = () => {
    if (isFinished) {
      return (
        <View style={styles.centerContent}>
          <Ionicons
            name="checkmark-circle"
            size={100}
            color={theme.colors.primary}
          />
          <Text style={styles.finishText}>Cocktail is Done</Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}>Back to recipe</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!currentStep) return <ActivityIndicator />;

    switch (currentStep.actionId) {
      case 11:
        return (
          <Action11Animation
            key={currentStepIndex}
            glassType={glassState.glassType}
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
      case 15:
        return (
          <Action15Animation
            key={currentStepIndex}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            muddledFruit={glassState.muddledFruit}
          />
        );
      case 16: {
        const ingredientName = currentStep.details?.ingredient?.toLowerCase();
        const pourColor =
          ingredientColors[ingredientName] || "rgba(255, 255, 255, 0.6)";
        return (
          <Action16Animation
            key={currentStepIndex}
            ingredient={currentStep.details?.ingredient}
            amount={currentStep.details?.amount}
            unit={currentStep.details?.unit}
            pourColor={pourColor}
          />
        );
      }
      case 17:
        return (
          <Action17Animation
            key={currentStepIndex}
            amount={currentStep.details?.amount}
          />
        );
      case 18:
        return (
          <Action18Animation
            key={currentStepIndex}
            liquidColor={glassState.liquidColor}
            initialFillLevel={glassState.previousFillLevel}
            fillLevel={glassState.fillLevel}
            hasIce={glassState.hasIce}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            muddledFruit={glassState.muddledFruit}
          />
        );
      case 19:
        return (
          <Action19Animation
            key={currentStepIndex}
            liquidColor={glassState.liquidColor}
            fillLevel={glassState.fillLevel}
            hasIce={glassState.hasIce}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            garnishVariant={glassState.garnishOnRim || "lime"}
            muddledFruit={glassState.muddledFruit}
          />
        );
      case 20:
        return (
          <Action20Animation
            key={currentStepIndex}
            liquidColor={glassState.previousLiquidColor}
            initialFillLevel={glassState.previousFillLevel}
            fillLevel={glassState.fillLevel}
            hasIce={glassState.hasIce}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            muddledFruit={glassState.muddledFruit}
          />
        );
      case 24:
        return (
          <Action24Animation
            key={currentStepIndex}
            ingredient={currentStep.details?.ingredient || "orange"}
          />
        );
      case 25:
        return (
          <Action25Animation
            key={currentStepIndex}
            liquidColor={glassState.liquidColor}
            fillLevel={glassState.fillLevel}
            hasIce={glassState.hasIce}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            muddledFruit={glassState.muddledFruit}
          />
        );
      case 27: {
        const ingredientName = currentStep.details?.ingredient?.toLowerCase();
        const pourColor =
          ingredientColors[ingredientName] || "rgba(255, 255, 255, 0.6)";
        return (
          <Action27Animation
            key={currentStepIndex}
            ingredient={currentStep.details?.ingredient}
            amount={currentStep.details?.amount}
            unit={currentStep.details?.unit}
            pourColor={pourColor}
            initialLiquidColor={glassState.previousLiquidColor}
            finalLiquidColor={glassState.liquidColor}
            initialFillLevel={glassState.previousFillLevel}
            finalFillLevel={glassState.fillLevel}
            hasIce={glassState.hasIce}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            muddledFruit={glassState.muddledFruit}
          />
        );
      }
      case 28:
        return (
          <Action28Animation
            key={currentStepIndex}
            amount={currentStep.details?.amount}
            liquidColor={glassState.liquidColor}
            fillLevel={glassState.fillLevel}
            hasIce={glassState.hasIce}
            hasRim={glassState.hasRim}
            rimColor={glassState.rimColor}
            muddledFruit={glassState.muddledFruit}
          />
        );
      default:
        return <PlaceholderAnimation step={currentStep} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={28} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.navigationRow}>
          <TouchableOpacity
            onPress={handlePrevStep}
            style={[
              styles.navButton,
              currentStepIndex === 0 && !isFinished && styles.disabledButton,
            ]}
            disabled={currentStepIndex === 0 && !isFinished}
          >
            <Ionicons
              name="chevron-back"
              size={40}
              color={theme.colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.stepIndicatorContainer}>
            {!isFinished ? (
              <>
                <Text style={styles.stepTitle}>
                  Step {currentStepIndex + 1}
                </Text>
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
            <Ionicons
              name="chevron-forward"
              size={40}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {!isFinished && currentStep && (
        <View style={styles.descriptionBlock}>
          <Text style={styles.description}>{currentStep.fullDescription}</Text>
        </View>
      )}

      <View style={styles.stage}>{renderCurrentAnimation()}</View>
    </SafeAreaView>
  );
}

const PlaceholderAnimation = ({ step }) => {
  return (
    <View style={styles.centerContent}>
      <Text style={styles.placeholderTitle}>Action ID: {step.actionId}</Text>
      <Text style={styles.placeholderDesc}>Animation is under development</Text>
      <Ionicons
        name="construct-outline"
        size={50}
        color="#666"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 5,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    alignItems: "center",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  stepSubTitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  descriptionBlock: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: theme.colors.text,
    lineHeight: 26,
    fontWeight: "500",
  },
  stage: {
    flex: 1,
    justifyContent: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  finishText: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: 20,
  },
  restartButton: {
    marginTop: 30,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  placeholderTitle: { fontSize: 24, fontWeight: "bold", color: "#888" },
  placeholderDesc: { fontSize: 14, color: "#aaa", marginTop: 5 },
});