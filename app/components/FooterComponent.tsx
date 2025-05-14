import { StyleSheet, Text, View } from "react-native";

export default function FooterComponent() {
    return (
        <>
            <View style={styles.footer}>
                <Text style={styles.footerText1}>
                    © 2025
                </Text>
                <Text style={styles.footerText2}>
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
        paddingBottom: 25,
        backgroundColor: '#171717',
        flexDirection: 'row',
        gap: 8,
    },
    footerText1: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 4,
        textAlign: 'center'
    },
    footerText2: {
        fontSize: 14,
        color: '#ffc11e',
        marginBottom: 4,
        textAlign: 'center'
    },
})