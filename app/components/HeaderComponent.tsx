import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function HeaderComponent() {
    const { logout } = useAuth();
    return (
        <>
            <View style={styles.header}>
                <Link href={'/(app)/dashboard'} style={styles.navbarItem}>
                    <Image
                        source={require('@/assets/images/bbroom-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Link>
                <View style={styles.navbar}>
                    <Link href={'/(app)/dashboard'} style={styles.navbarItem}>Dashboard</Link>
                    <Link href={'/(app)/dashboard'} style={styles.navbarItem}>Reserva</Link>
                    <Text style={styles.logout} onPress={logout}>Sair</Text>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: '#171717'
    },
    welcome: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    logo: {
        width: 80,
        height: 40
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    navbarItem: {
        color: '#fff',
        fontSize: 14,
    },
    logout: {
        fontSize: 14,
        color: '#ff8383'
    },
})