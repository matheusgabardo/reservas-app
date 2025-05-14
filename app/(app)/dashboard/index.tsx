import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api/axios';
import { router, useRouter } from 'expo-router';


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
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

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

  const openReservationModal = async (room: Room) => {
    setSelectedRoom(room);
    try {
      await api.get('/reservations/active');
      setErrorMessage('');
      setSuccessMessage('');
      setModalVisible(true);
    } catch (err: any) {
      if (err.response?.status === 422 && err.response.data.message) {
        setErrorMessage(err.response.data.message);
        setSuccessMessage('');
        setModalVisible(true);
      } else {
        setErrorMessage('Erro ao verificar reserva ativa.');
        setSuccessMessage('');
        setModalVisible(true);
      }
    }
  };
  

  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
  
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
  
    return formatted;
  };
  
  const formatTime = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
  
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    }
  
    return formatted;
  };
  
  const handleReserve = async () => {
    if (!/^\d{2}\/\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      alert('Por favor, preencha a data e hora corretamente.');
      return;
    }
  
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const [day, month] = date.split('/');
      const currentYear = new Date().getFullYear();
      const formattedDate = `${currentYear}-${month}-${day}`;
  
      const response = await api.post('/reservations', {
        room_id: selectedRoom?.id,
        reservation_date: formattedDate,
        reservation_time: time,
      });
  
      setSuccessMessage(response.data.message);
      setDate('');
      setTime('');
    } catch (err: any) {
      if (err.response?.status === 422) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Erro inesperado ao tentar reservar.');
      }
    } finally {
      setIsLoading(false);
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
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : successMessage ? (
          <>
            <View style={styles.successModalContent}>
              <View style={styles.successIconWrapper}>
                <Image
                    source={require('@/assets/images/sucess-gif.gif')}
                    style={styles.successIcon}
                    resizeMode="contain"
                />
              </View>
              <Text style={styles.successText}>{successMessage}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  router.push('/reservation');
                }}
              >
                <Text style={styles.buttonText}>Ver minha reserva</Text>
              </TouchableOpacity>
            </View>
          </>
        ): errorMessage === 'Você já possui uma reserva ativa no sistema.' ? (
          <>
            <View style={styles.modalContent}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  router.push('/reservation');
                }}
              >
                <Text style={styles.buttonText}>Ver minha reserva</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : errorMessage ? (
          <>
            <View style={styles.modalContent}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setErrorMessage('');
                }}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedRoom?.room_name}</Text>
              <Text style={styles.modalInstruction}>
                Passo 2: Selecione o dia e o horário
              </Text>
                <TextInput
                  value={date}
                  onChangeText={(text) => setDate(formatDate(text))}
                  placeholder="Ex: 12/05"
                  keyboardType="numeric"
                  placeholderTextColor="#000"
                  style={styles.input}
                />
              <TextInput
                value={time}
                onChangeText={(text) => setTime(formatTime(text))}
                placeholder="Ex: 14:30"
                keyboardType="numeric"
                placeholderTextColor="#000"
                style={styles.input}
              />
              <TouchableOpacity onPress={handleReserve} style={styles.button}>
                <Text style={styles.buttonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#2f3237' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  welcome: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  logout: { fontSize: 14, color: 'red' },
  instructions: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  closeButton: { position: 'absolute', top: 8, right: 8, zIndex: 1 },
  closeText: { fontSize: 18, fontWeight: 'bold' },
  instructionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  instructionStep: { fontSize: 14, marginBottom: 4 },
  list: { padding: 16 },
  card: { marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 200 },
  content: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 4 },
  starsContainer: { flexDirection: 'row', marginBottom: 4 },
  star: { fontSize: 14, color: '#f1c40f', marginRight: 2 },
  text: { fontSize: 12, marginBottom: 2 },
  address: { fontSize: 12, color: '#888' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 8, padding: 16 },
  successModalContent: { width: '80%', backgroundColor: '#f7f7f7', borderRadius: 8, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalInstruction: { fontSize: 14, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 8 },
  modalButtonWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  modalCancelButton: { flex: 1, marginRight: 8, paddingVertical: 8, backgroundColor: '#c74444', borderRadius: 4, alignItems: 'center' },
  reservationButton: { flex: 1, marginLeft: 8, paddingVertical: 8, backgroundColor: '#18181b', borderRadius: 4, alignItems: 'center' },
  button: { marginLeft: 8, paddingVertical: 8, backgroundColor: '#18181b', borderRadius: 4, alignItems: 'center' },
  reservationButtonText: { color: '#ffffff', fontSize: 16 },
  buttonText: { color: '#ffffff', fontSize: 16 },
  successText: {
    fontSize: 18,
    color: '#30b153',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  successIcon: {
    width: 150,
    height: 150,
  },
  successIconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
  
});