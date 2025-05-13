// app/(app)/dashboard/index.tsx  (Tela do Dashboard/Home com modal de reserva)
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api/axios';

interface Room {
  id: number;
  room_name: string;
  location_name: string;
  address: string;
  capacity: number;
  description: string;
  rating: number;
  image: string;
}

const BASE_IMAGE_URL = 'http://localhost:8000/storage/';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get<Room[]>('/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.log('Erro ao buscar salas', err));
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const openReservationModal = (room: Room) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  const handleReserve = async () => {
    try {
      await api.post('/reservations', {
        room_id: selectedRoom?.id,
        reservation_date: date,
        reservation_time: time,
      });
      alert('Reserva efetuada com sucesso!');
      setModalVisible(false);
      setDate('');
      setTime('');
    } catch (err) {
      console.log('Erro ao reservar:', err);
      alert('Falha ao reservar. Tente novamente.');
    }
  };

  const renderItem = ({ item }: { item: Room }) => {
    const imageUrl = item.image.startsWith('https')
      ? item.image
      : `${BASE_IMAGE_URL}${item.image}`;

    return (
      <TouchableOpacity onPress={() => openReservationModal(item)}>
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.room_name}</Text>
            <Text style={styles.subtitle}>{item.location_name}</Text>
            {renderStars(item.rating)}
            <Text style={styles.text}>Capacidade: {item.capacity}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {showInstructions && (
        <View style={styles.instructions}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowInstructions(false)}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.instructionTitle}>
            Bem-vindo! Aqui você pode reservar uma sala para seu compromisso.
          </Text>
          <Text style={styles.instructionStep}>
            Passo 1: Escolha uma sala da lista tocando no card.
          </Text>
        </View>
      )}
      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Modal de Reserva (Passo 2) */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedRoom?.room_name}</Text>
            <Text style={styles.modalInstruction}>
              Passo 2: Informe a data e o horário desejado
            </Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
              style={styles.input}
            />
            <TextInput
              placeholder="HH:MM"
              value={time}
              onChangeText={setTime}
              style={styles.input}
            />
            <View style={styles.modalButtonWrapper}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.reservationButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reservationButton} onPress={handleReserve}>
                <Text style={styles.reservationButtonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#2f3237' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  welcome: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  logout: { fontSize: 14, color: 'red' },
  instructions: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    position: 'relative'
  },
  closeButton: { position: 'absolute', top: 8, right: 8, zIndex: 1 },
  closeText: { fontSize: 18, fontWeight: 'bold' },
  instructionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  instructionStep: { fontSize: 14, marginBottom: 4 },
  list: { padding: 16,  },
  card: { marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 200 },
  content: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 4 },
  starsContainer: { flexDirection: 'row', marginBottom: 4 },
  star: { fontSize: 14, color: '#f1c40f', marginRight: 2 },
  text: { fontSize: 12, marginBottom: 2 },
  address: { fontSize: 12, color: '#888' },
  footer: { paddingVertical: 12, alignItems: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalInstruction: { fontSize: 14, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8
  },
  modalButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  reservationButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#18181b',
    borderRadius: 4,
    alignItems: 'center',
    width: '50%'
  },
  modalCancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#c74444',
    borderRadius: 4,
    alignItems: 'center',
    width: '50%'
  },
  reservationButtonText: {
    color: '#ffffff',
    fontSize: 16
  },
});