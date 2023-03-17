import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskCardScreen from './components/TaskCardScreen';
import SplashScreen from './components/SplashScreen';
import TasksListScreen from './components/TasksListScreen';
import InfoScreen from './components/InfoScreen';
import CustomButton from './components/CustomButton';

const App = observer(() => {
    const {Navigator, Group, Screen} = createNativeStackNavigator();

    const [isLoading, setIsLoading] = useState(true);

    function HeaderButton({navigation}: any) {
        return (
            <CustomButton
                iconName='information-outline'
                isInvertedColor={true}
                onPress={() =>
                    navigation.navigate('Info')}
            />
        );
    }

    async function showWelcomeScreen() {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(`Delayed for ${ms / 1000} second.`), ms));
        try {
            await delay(2000);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        showWelcomeScreen();
    }, []);

    if (isLoading) {
        return <SplashScreen/>;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Navigator
                    initialRouteName="Tasks List"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 30,
                        },
                    }}>
                    <Group>
                        <Screen
                            name="Tasks List"
                            component={TasksListScreen}
                            options={({navigation}) => ({
                                title: 'Todos For Today',
                                headerStyle: {
                                    backgroundColor: '#000',
                                },
                                headerTintColor: '#fff',
                                headerRight: () => (
                                    <HeaderButton navigation={navigation}/>
                                )
                            })}
                        />
                        <Screen
                            name="Info"
                            component={InfoScreen}
                        />
                    </Group>
                    <Group screenOptions={{presentation: 'modal'}}>
                        <Screen
                            name="Task Card"
                            component={TaskCardScreen}
                        />
                    </Group>
                </Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
});

export default App;
