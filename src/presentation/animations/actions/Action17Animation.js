import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { BostonShaker } from '../assets/tools/BostonShaker';

export const Action17Animation = ({ amount = 5 }) => {
  // Két külön érték: egy a dőlésszögnek, egy a rázás pozíciójának
  const tiltAnim = useRef(new Animated.Value(0)).current; // 0 -> 1 (0fok -> 30fok)
  const shakeAnim = useRef(new Animated.Value(0)).current; // -1 -> 1 (tengely menti mozgás)

  useEffect(() => {
    const shakeTimeSeconds = (amount && amount > 0 ? amount : 5);
    // Egy rázás ciklus ideje (oda-vissza) ms-ben. 
    // Kb 150-200ms egy "csapás", így elég intenzív.
    const oneShakeDuration = 160; 
    const iterations = Math.ceil((shakeTimeSeconds * 1000) / oneShakeDuration);

    const animationSequence = Animated.loop(
        Animated.sequence([
            // 1. Fázis: Felkészülés - Megdöntés (0 -> 30 fok)
            Animated.timing(tiltAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.quad)
            }),

            // 2. Fázis: Rázás (loop a megadott ideig)
            Animated.loop(
                Animated.sequence([
                    // Előre (Felfelé a tengelyen)
                    Animated.timing(shakeAnim, {
                        toValue: 1,
                        duration: oneShakeDuration / 2,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.sin) // Szinuszos = folyékony mozgás
                    }),
                    // Hátra (Lefelé a tengelyen)
                    Animated.timing(shakeAnim, {
                        toValue: -1,
                        duration: oneShakeDuration / 2,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.sin)
                    })
                ]),
                { iterations: iterations }
            ),

            // 3. Fázis: Visszaállás középre (rázás megállítása)
            Animated.parallel([
                Animated.timing(shakeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
                Animated.timing(tiltAnim, { toValue: 0, duration: 500, useNativeDriver: true })
            ]),

            // 4. Fázis: Szünet az ismétlés előtt
            Animated.delay(1500)
        ])
    );

    animationSequence.start();

    return () => animationSequence.stop();
  }, [amount]);

  // --- Interpolációk ---

  // Forgatás: 0-kor áll, 1-nél 30 fokban dől
  const rotate = tiltAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '30deg']
  });

  // Rázás amplitúdója (milyen messze menjen a shaker)
  const shakeRange = 40; 
  
  // 30 fokos szög vektorai:
  // Ha 30 fokkal jobbra dől, a mozgásnak is ezen a vonalon kell történnie.
  // X komponens: sin(30) = 0.5
  // Y komponens: -cos(30) = -0.866 (felfelé negatív az Y)
  
  const translateX = shakeAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: [-shakeRange * 0.5, shakeRange * 0.5] 
  });

  const translateY = shakeAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: [shakeRange * 0.866, -shakeRange * 0.866] 
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[
          styles.shakerAssembly,
          {
              transform: [
                  { translateX },
                  { translateY },
                  { rotate }
              ]
          }
      ]}>
        {/* Felső rész (Boston üveg/fém része fejjel lefelé) */}
        <View style={styles.topShakerWrapper}>
             <BostonShaker size={250} />
        </View>

        {/* Alsó rész (Nagyobb fém rész) */}
        <View style={styles.bottomShakerWrapper}>
            <BostonShaker size={300} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  shakerAssembly: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 50, 
  },
  bottomShakerWrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2, 
  },
  topShakerWrapper: {
    position: 'absolute',
    bottom: 180, // Illesztés
    left: 40,    // Mivel a shaker grafikája kicsit aszimmetrikus lehet, itt igazítjuk
    zIndex: 1,
    transform: [
        { rotate: '195deg' } // Fejjel lefelé + a két elem illesztési szöge
    ]
  }
});