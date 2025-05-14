import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function HeaderComponent() {
    const { logout } = useAuth();
    return (
        <>
            <View style={styles.header}>
                <Link href={'/(app)/dashboard'} style={styles.returnButton}>
                    <Image
                        source={require('@/assets/images/left-arrow-white.png')}
                        style={styles.arrowIcon}
                        resizeMode="contain"
                    />
                </Link>
                <Link href={'/(app)/dashboard'} style={styles.returnButton}>
                    Voltar
                </Link>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        paddingTop: 40,
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: '#171717'
    },
    welcome: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    arrowIcon: {
        width: 50,
        height: 25
    },
    navbar: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    returnButton: {
        color: '#fff',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center'
    },
})