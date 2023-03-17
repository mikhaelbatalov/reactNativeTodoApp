import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    ScrollView, StatusBar
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
    useAppStore,
    Task
} from '../stores/appStore';
import CustomTextInput from './CustomTextInput';
import CustomSlider from './CustomSlider';
import CardButtonsContainer from './CardButtonsContainer';

type TaskCardScreenProps = {
    navigation: any
}
const TaskCardScreen = observer(({navigation}: TaskCardScreenProps) => {
    const insets = useSafeAreaInsets();
    const store = useAppStore();

    useEffect(() => {
        if (store.isAnyTaskSelected) {
            store.setTask({...store.tasks.find(task => task.id === store.selectedId)} as Task);
            return;
        }

        store.setTask({
            id: uuidv4() as string,
            title: '',
            description: '',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        });
    }, [store.isAnyTaskSelected, store.tasks, store.selectedId]);
    useEffect(() => {
        const newSignificance : number = store.task.importance === 0 || store.task.urgency === 0 || store.task.complexity === 0
            ? 0
            : Math.floor(store.task.importance * store.task.urgency / store.task.complexity * 10) / 10;

        store.handleTaskChange<number>('significance', newSignificance);
    }, [store.task.importance, store.task.urgency, store.task.complexity]);
    useEffect(() => {
        navigation.setOptions({
            title: `Todo ${store.isAnyTaskSelected ? 'editing' : 'creating'}`
        });
    }, [navigation, store.isAnyTaskSelected]);

    function goBack() {
        navigation.goBack();
    }

    function onTitleChange(value: string) {
        store.handleTaskChange<string>('title', value);
    }

    function onDescriptionChange(value: string) {
        store.handleTaskChange<string>('description', value)
    }

    function onImportanceChange(value: number) {
        store.handleTaskChange<number>('importance', value);
    }

    function onUrgencyChange(value: number) {
        store.handleTaskChange<number>('urgency', value);
    }

    function onComplexityChange(value : number) {
        store.handleTaskChange<number>('complexity', value);
    }

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
            <ScrollView style={styles.scrollView}>
                <View style={styles.wrapper}>
                    <CustomTextInput
                        title='Name'
                        onChangeText={onTitleChange}
                        value={store.task.title}
                        placeholder='Todo Name'
                        maxLength={100}
                    />
                    <CustomTextInput
                        title='Description'
                        onChangeText={onDescriptionChange}
                        value={store.task.description}
                        placeholder='Todo Description'
                        maxLength={400}
                        multiline={true}
                        numberOfLines={5}
                    />
                    <CustomSlider
                        title='Importance'
                        value={store.task.importance}
                        onSlidingComplete={onImportanceChange}
                    />
                    <CustomSlider
                        title='Urgency'
                        value={store.task.urgency}
                        onSlidingComplete={onUrgencyChange}
                    />
                    <CustomSlider
                        title='Complexity'
                        value={store.task.complexity}
                        onSlidingComplete={onComplexityChange}
                    />
                </View>
            </ScrollView>
            <CardButtonsContainer goBack={goBack}/>
        </View>
    );
});

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    wrapper: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    }
});

export default TaskCardScreen;
