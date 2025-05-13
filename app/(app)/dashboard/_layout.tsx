import { Slot, Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();
  return !user ? <Redirect href="/login" /> : <Slot />;
}