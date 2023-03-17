import React from 'react';
import {
    StyleSheet,
    Pressable
} from 'react-native';
import {observer} from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconProps} from 'react-native-vector-icons/Icon';

type CustomButtonProps = {
    iconName: IconProps['name'],
    isInvertedColor?: boolean,
    isBigSize?: boolean,
    isElevated?: boolean,
    onPress: () => void
};

const CustomButton = observer(({
                          iconName,
                          isInvertedColor = false,
                          isBigSize = false,
                          isElevated = false,
                          onPress
                      }: CustomButtonProps) => {
    return (
        <Pressable
            style={[
                styles.button,
                isBigSize && styles.bigSizedButton,
                isInvertedColor && styles.invertedColor,
                isElevated && styles.elevation
            ]}
            onPress={onPress}>
                <Icon
                    name={iconName}
                    size={isBigSize ? 50 : 30}
                    color={isInvertedColor ? 'white' : 'black'}
                />
        </Pressable>
    );
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 25,
        width: 50,
        height: 50
    },
    bigSizedButton: {
        borderRadius: 35,
        width: 70,
        height: 70
    },
    invertedColor: {
        backgroundColor: 'transparent'
    },
    elevation: {
        elevation: 2
    }
});

export default CustomButton;
