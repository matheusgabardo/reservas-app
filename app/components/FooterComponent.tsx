import { StyleSheet, Text, View } from "react-native";

export default function FooterComponent() {
    return (
        <>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    © 2025
                </Text>
                <Text style={styles.footerText}>
                    Programação para dispositivos móveis.
                </Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#171717'
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        textAlign: 'center'
    },
})