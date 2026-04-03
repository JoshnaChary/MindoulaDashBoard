import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../core/theme/colors';

/**
 * MessageIcon — exact replica of the blue circle with white envelope + upward arrow design.
 * Built using only nested Views (no SVG or image dependency).
 */
const MessageIcon: React.FC<{ size?: number }> = ({ size = 56 }) => {
  const scale = size / 56;
  const s = (n: number) => n * scale;

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      {/* Inner subtle glow ring */}
      <View
        style={[
          styles.innerRing,
          {
            width: s(44),
            height: s(44),
            borderRadius: s(22),
          },
        ]}
      />

      {/* Envelope Body */}
      <View
        style={[
          styles.envelope,
          {
            width: s(26),
            height: s(18),
            borderRadius: s(2),
            top: s(24),
          },
        ]}
      >
        {/* Left diagonal fold */}
        <View
          style={[
            styles.foldLeft,
            {
              borderTopWidth: s(9),
              borderRightWidth: s(13),
            },
          ]}
        />
        {/* Right diagonal fold */}
        <View
          style={[
            styles.foldRight,
            {
              borderTopWidth: s(9),
              borderLeftWidth: s(13),
            },
          ]}
        />
      </View>

      {/* Upward Arrow shaft */}
      <View
        style={[
          styles.arrowShaft,
          {
            width: s(2.5),
            height: s(9),
            top: s(12),
          },
        ]}
      />

      {/* Upward Arrow head left */}
      <View
        style={[
          styles.arrowHeadLeft,
          {
            borderRightWidth: s(4),
            borderBottomWidth: s(5),
            top: s(9),
            left: s(24.5),
          },
        ]}
      />
      {/* Upward Arrow head right */}
      <View
        style={[
          styles.arrowHeadRight,
          {
            borderLeftWidth: s(4),
            borderBottomWidth: s(5),
            top: s(9),
            left: s(28.5),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  innerRing: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  envelope: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  foldLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopColor: Colors.white,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    width: 0,
    height: 0,
  },
  foldRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderTopColor: Colors.white,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
    width: 0,
    height: 0,
  },
  arrowShaft: {
    position: 'absolute',
    backgroundColor: Colors.white,
  },
  arrowHeadLeft: {
    position: 'absolute',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.white,
    borderStyle: 'solid',
    width: 0,
    height: 0,
  },
  arrowHeadRight: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: Colors.white,
    borderStyle: 'solid',
    width: 0,
    height: 0,
  },
});

export default MessageIcon;
