import { Modal, View } from 'react-native';
import { Button, TextInput, SegmentedButtons } from 'react-native-paper';

export default function FilterModal({
  visible,
  onClose,
  search,
  setSearch,
  sort,
  setSort,
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        
        <TextInput
          label="Pesquisar cliente"
          value={search}
          onChangeText={setSearch}
        />

        <SegmentedButtons
          value={sort}
          onValueChange={setSort}
          buttons={[
            { value: 'RECENT', label: 'Recentes' },
            { value: 'NAME', label: 'Nome' },
          ]}
        />

        <Button mode="contained" onPress={onClose}>
          Aplicar
        </Button>
      </View>
    </Modal>
  );
}