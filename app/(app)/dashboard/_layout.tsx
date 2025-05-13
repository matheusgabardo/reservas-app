import { Slot, Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import HeaderComponent from '@/app/components/HeaderComponent';
import FooterComponent from '@/app/components/FooterComponent';

export default function DashboardLayout() {
  const { user } = useAuth();
  return !user ? <Redirect href="/login" /> : <>
      <HeaderComponent />
      <Slot />
      <FooterComponent />
    </>
}