import React from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const InfoScreen = observer(() => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            styles.appContainer,
            {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }
        ]}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />
            <Text style={styles.title}>Here will be information about the App</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 50,
        fontStyle: 'italic',
        fontVariant: ['small-caps'],
    }
});

export default InfoScreen;
