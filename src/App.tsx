import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    StatusBar
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore, Task as TaskType} from './stores/appStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonsContainer from './components/ButtonsContainer';
import Task from './components/Task';
import TaskModal from './components/TaskModal'
import {StatusBarStyle} from 'react-native';
import {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

type RenderTaskProps = {
    item: TaskType,
    index: number
};

type TStatusBarStyleData ={
    statusBarStyle : StatusBarStyle,
    backgroundColor: ColorValue
}

const STYLES = ['default', 'dark-content', 'light-content'] as StatusBarStyle[];

const App = observer(() => {
    const store = useAppStore();
    const [statusBarStyleData, setStatusBarStyle] = useState<TStatusBarStyleData>({
        backgroundColor: "#000000",
        statusBarStyle: STYLES[0],
    });

    const renderTask = ({item, index}: RenderTaskProps) => {
        return (
            <Task
                index={index}
                task={item}
            />
        );
    };
    const getKeyExtractor = (item: TaskType) : string => item.id || '';

    return (
        <SafeAreaView style={styles.appContainer}>
            <StatusBar
                animated={true}
                backgroundColor={statusBarStyleData?.backgroundColor}
                barStyle={statusBarStyleData?.statusBarStyle}
            />
            <Text style={styles.appTitle}>Todos For Today</Text>
            <FlatList
                style={styles.flatList}
                data={store.filteredTasks}
                renderItem={renderTask}
                keyExtractor={getKeyExtractor}
            />
            <ButtonsContainer/>
            <TaskModal/>
        </SafeAreaView>
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
    },
    appTitle: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40,
        fontStyle: 'italic',
        fontVariant: ['small-caps'],
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    button: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonIcon: {
        margin: 20
    }
});

export default App;
