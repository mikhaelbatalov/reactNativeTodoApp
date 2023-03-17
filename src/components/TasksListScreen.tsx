import React from 'react';
import {
    StyleSheet,
    FlatList,
    StatusBar,
    View
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppStore, Task as TaskType} from '../stores/appStore';
import ButtonsContainer from './ButtonsContainer';
import Task from './Task';

type TasksListScreenProps = {
    navigation: any
};

type RenderTaskProps = {
    item: TaskType,
    index: number
};

const TasksListScreen = observer(({navigation}: TasksListScreenProps) => {
    const insets = useSafeAreaInsets();
    const store = useAppStore();

    function goToTaskCard() {
        navigation.navigate('Task Card')
    }

    const renderTask = ({item, index}: RenderTaskProps) => {
        return (
            <Task
                index={index}
                task={item}
                goToTaskCard={goToTaskCard}
            />
        );
    };
    const getKeyExtractor = (item: TaskType): string => item.id || '';

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
                backgroundColor="#000"
                barStyle="light-content"
            />
            <FlatList
                style={styles.flatList}
                data={store.filteredTasks}
                renderItem={renderTask}
                keyExtractor={getKeyExtractor}
            />
            <ButtonsContainer goToTaskCard={goToTaskCard}/>
        </View>
    );
});

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        alignSelf: 'stretch'
    }
});

export default TasksListScreen;
