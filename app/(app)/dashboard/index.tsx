import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet
} from 'react-native';
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

export default function HomeScreen() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const BASE_IMAGE_URL = 'http://localhost:8000/storage/';

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

  const renderItem = ({ item }: { item: Room }) => {
    const imageUrl = `${BASE_IMAGE_URL}${item.image}`;
    return (
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
    );
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#2f3237'
  },
  container: {
    backgroundColor: '#2f3237'
  },
  list: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: '100%',
    height: 200
  },
  content: {
    padding: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4
  },
  star: {
    fontSize: 14,
    color: '#f1c40f',
    marginRight: 2
  },
  text: {
    fontSize: 12,
    marginBottom: 2
  },
  address: {
    fontSize: 12,
    color: '#888'
  }
});
