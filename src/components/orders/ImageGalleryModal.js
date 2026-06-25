import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

import { COLORS } from '../../theme';

const { width, height } = Dimensions.get('window');
const APP_BAR_COLOR = '#383838ff'; 

export default function ImageGalleryModal({
  imageData,
  onClose,
  onRemove,
}) {
  const visible = !!imageData;
  const zoomRef = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(100);

  useEffect(() => {
    if (visible) {
      RNStatusBar.setBarStyle('light-content', true);
      if (Platform.OS === 'android') {
        RNStatusBar.setBackgroundColor(APP_BAR_COLOR, true);
        RNStatusBar.setTranslucent(true);
      }
    } else {
      RNStatusBar.setBarStyle('dark-content', true);
      if (Platform.OS === 'android') {
        RNStatusBar.setBackgroundColor('#FFFFFF', true);
      }
    }
  }, [visible]);

  const handleDownload = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão necessária');
        return;
      }

      const filename = uri.split('/').pop();
      const localUri = `${FileSystem.documentDirectory}${filename}`;

      await FileSystem.copyAsync({ from: uri, to: localUri });
      await MediaLibrary.saveToLibraryAsync(localUri);

      Alert.alert('Sucesso', 'Imagem salva.');
    } catch {
      Alert.alert('Erro ao baixar.');
    }
  };

  const handleClose = () => {
    zoomRef.current?.zoomTo(1);
    setCurrentZoom(100);
    onClose();
  };

  const handleZoomChange = (zoomableViewEventObject) => {
    const scalePercentage = Math.round(zoomableViewEventObject.zoomLevel * 100);
    setCurrentZoom(scalePercentage);
  };

  const ActionButton = ({ icon, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <FontAwesome6 name={icon} size={18} color={COLORS.white} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={APP_BAR_COLOR} translucent={true} />

        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.appbar}>
            <ActionButton icon="arrow-left" onPress={handleClose} />
            
            <View style={styles.centerContainer} pointerEvents="none">
              {currentZoom > 100 && (
                <View style={styles.zoomBadge}>
                  <FontAwesome6 name="magnifying-glass" size={12} color="#FFFFFF" style={styles.zoomIcon} />
                  <Text style={styles.zoomText}>{currentZoom}%</Text>
                </View>
              )}
            </View>

            <View style={{ flex: 1 }} />

            <ActionButton
              icon="download"
              onPress={() => handleDownload(imageData?.uri)}
            />
            <ActionButton
              icon="trash"
              onPress={() => {
                onRemove?.(imageData?.index);
                handleClose();
              }}
            />
          </View>
        </SafeAreaView>

        <View style={styles.zoomContainer}>
          {visible && (
            <ReactNativeZoomableView
              ref={zoomRef}
              maxZoom={3}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              onTransform={handleZoomChange}
              style={styles.zoomView}
            >
              <Image
                source={{ uri: imageData?.uri }}
                style={styles.image}
                resizeMode="contain"
              />
            </ReactNativeZoomableView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  safeArea: {
    backgroundColor: APP_BAR_COLOR,
    zIndex: 20, 
  },
  appbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: APP_BAR_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative', 
    ...Platform.select({
      web: { zIndex: 10 },
    }),
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  zoomIcon: {
    marginRight: 6, 
  },
  zoomText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  actionButton: {
    padding: 10,
  },
  zoomContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  zoomView: {
    padding: 0,
    backgroundColor: COLORS.black,
  },
  image: {
    width: width,
    height: height - 120, 
  },
});