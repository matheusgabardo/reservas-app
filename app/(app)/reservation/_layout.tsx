import { Slot, Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import ReservationHeaderComponent from '@/app/components/ReservationHeaderComponent';
import FooterComponent from '@/app/components/FooterComponent';

export default function DashboardLayout() {
  const { user } = useAuth();
  return !user ? <Redirect href="/login" /> : <>
      <ReservationHeaderComponent />
      <Slot />
      <FooterComponent />
    </>
}