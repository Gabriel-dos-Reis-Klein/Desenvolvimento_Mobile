import { useState } from 'react';
import { ScrollView, View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import UploadButton from './UploadButton';
import ImageGalleryModal from './ImageGalleryModal'; 
import { COLORS, RADIUS, SPACING } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - (SPACING.xl * 2) - SPACING.md) / 2;

function AttachmentCard({ uri, onRemove, onZoom }) {
  return (
    <Pressable style={styles.imageCard} onPress={onZoom}>
      <Image source={{ uri }} style={styles.imagePreview} />
      <Pressable style={styles.removeBadge} onPress={onRemove}>
        <Text style={styles.removeBadgeText}>✕</Text>
      </Pressable>
    </Pressable>
  );
}

function EmptyState() {
  return (
    <Text style={styles.emptyText}>Nenhum anexo adicionado a este item.</Text>
  );
}

export default function ItemAttachmentsTab({ imagens, onPickImage, onRemoveImage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const hasImages = imagens.length > 0;

  return (
    <View style={styles.safeContainer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentAnexos}
        showsVerticalScrollIndicator={false}
      >
        <UploadButton onPress={onPickImage} />

        {hasImages ? (
          <View style={styles.gridContainer}>
            {imagens.map((uri, idx) => (
              <AttachmentCard 
                key={uri + idx} 
                uri={uri} 
                onRemove={() => onRemoveImage(idx)} 
                onZoom={() => setSelectedImage({ uri, index: idx })}
              />
            ))}
          </View>
        ) : (
          <EmptyState />
        )}
      </ScrollView>

      <ImageGalleryModal 
        imageData={selectedImage}
        onClose={() => setSelectedImage(null)}
        onRemove={onRemoveImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  scroll: { flex: 1 },
  contentAnexos: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    gap: SPACING.xl,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  imageCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surface,
    position: 'relative',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.textSecondary || '#6C757D', 
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    zIndex: 10,
  },
  removeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6C757D',
    fontSize: 14,
    marginTop: SPACING.xl,
  },
});