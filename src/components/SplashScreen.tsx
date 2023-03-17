import React from 'react';
import {
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = observer(() => {
    return (
        <SafeAreaView style={styles.appContainer}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle="light-content"
            />
            <Text style={styles.appTitle}>Todos For Today</Text>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40,
        fontStyle: 'italic',
        fontVariant: ['small-caps'],
    }
});

export default SplashScreen;
