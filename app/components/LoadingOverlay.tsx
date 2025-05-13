import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Modal } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={'#EEAB42'} />
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width,
    height,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },
});