import { useRouter } from 'expo-router'; 
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import api from '@/lib/api/axios';

interface ActiveReservation {
  id: number;
  reservation_date: string;
  reservation_time: string;
  room_id: number;
  status: string;
}

export default function ReservationScreen() {
  const router = useRouter();
  const [reservation, setReservation] = useState<ActiveReservation | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    api.get('/reservations/active')
      .then(res => {
        if (res.status === 200) {
          setError('Nenhuma reserva ativa encontrada.');
        }
      })
      .catch(err => {
        if (err.response?.status === 422) {
          setReservation(err.response.data.reservation);
        } else {
          setError('Erro ao verificar reserva.');
        }
      });
  }, []);

  const formatDate = (iso: string) => {
    const [year, month, day] = iso.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      {reservation ? (
        <View style={styles.cardWrapper}>
          <Text style={styles.title}>Minha reserva ativa</Text>
          <View style={styles.card}>
            <Text style={styles.field}><Text style={styles.label}>ID:</Text> {reservation.id}</Text>
            <Text style={styles.field}><Text style={styles.label}>Data da reserva:</Text> {formatDate(reservation.reservation_date)}</Text>
            <Text style={styles.field}><Text style={styles.label}>Horário reservado:</Text> {reservation.reservation_time}</Text>
            <Text style={styles.field}><Text style={styles.label}>Status:</Text> {reservation.status}</Text>
            <Text style={styles.field}><Text style={styles.label}>Capacidade:</Text> {/* aqui puxa sala se quiser */}10 pessoas</Text>
            <Image
                source={require('@/assets/images/qr-code.png')}
                style={styles.qrCodeImage}
                resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={async () => {
                await api.post('/reservations/cancel', { id: reservation.id });
                alert('Reserva cancelada.');
                router.replace('/');
              }}
            >
              <Text style={styles.cancelText}>Cancelar reserva</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, padding: 16, backgroundColor: '#2f3237' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16,},
  label: { fontWeight: 'bold' },
  title: { fontSize: 22, marginBottom: 16,marginTop: 22, color: '#fff', fontWeight: 'bold', textAlign: 'center'},
  field: { fontSize: 14, marginBottom: 8 },
  cancelButton: {
    marginTop: 16,
    backgroundColor: '#c74444',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  cancelText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: '#fff', textAlign: 'center', marginTop: 50 },
  cardWrapper: { padding: 16},
  qrCodeImage: {
    width: '100%',
    height: 250
  }
});
