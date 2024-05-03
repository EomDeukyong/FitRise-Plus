import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert,Dimensions } from 'react-native';
import { StepIndicator,CustomBtn,MacroCalculator } from '../src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window'); // Get the screen width


// 표준체중 계산 함수
const calculateStandardWeight = (height, gender) => {
    const heightInMeters = height / 100;
    const factor = gender === 'female' ? 21 : 22;
    return heightInMeters * heightInMeters * factor;
};

// 칼로리 계산 함수
const calculateCalories = (height, gender, exerciseLevel) => {
    const standardWeight = calculateStandardWeight(height, gender);
    let calorieMultiplier;

    switch (exerciseLevel) {
        case 'beginner':
            calorieMultiplier = [25, 30];
            break;
        case 'middle':
            calorieMultiplier = [30, 35];
            break;
        case 'expert':
            calorieMultiplier = [35, 40];
            break;
        default:
            calorieMultiplier = [0, 0];
    }

    return {
        standardWeight: Math.round(standardWeight),
        minCalories: Math.round(standardWeight * calorieMultiplier[0]),
        maxCalories: Math.round(standardWeight * calorieMultiplier[1])
    };
};

//영양성분 계산 함수

// 칼로리 화면 컴포넌트
const CaloriesScreen = () => {
    const router = useRouter();
    //현재 단계
    const [currentStep, setCurrentStep] = useState(2);

    //expo-router로 받은 params
    const { gender, height, exerciseLevel,goal } = useLocalSearchParams();

    //계산된 칼로리 값
    const [calorieInfo, setCalorieInfo] = useState({
        minCalories: 0,
        maxCalories: 0,
    });

    // 사용자가 설정한 칼로리 값
    const [userCalories, setUserCalories] = useState('');

    useEffect(() => {
        const calcResults = calculateCalories(height, gender, exerciseLevel);
        setCalorieInfo(calcResults);
        setUserCalories(calcResults.minCalories.toString());
    }, [height, gender, exerciseLevel]);

    const handleCalorieChange = text => {
        setUserCalories(text.replace(/[^0-9]/g, ''));
    };

    //칼로리 수정 함수
    const handleSubmit = () => {
        const numCalories = parseInt(userCalories, 10);
        if (!userCalories || numCalories < (calorieInfo.minCalories - 500) || numCalories > calorieInfo.maxCalories) {
            Alert.alert('칼로리 설정 오류', ` ${calorieInfo.minCalories - 500} ~ ${calorieInfo.maxCalories} kcal 사이로 설정해주세요.`);
            return;
        }
        Alert.alert('목표 칼로리 설정 완료', `일일 목표 칼로리가 ${userCalories} kcal로 설정되었습니다.`);
    };

    //다음 단계
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    //다음 화면 이동 함수 
    const handleNextPress = () => {
        router.push({pathname:'/characterGAN'})
    };

    return (
        <View style={styles.container}>
            <StepIndicator steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} currentStep={currentStep - 1}/>
                {currentStep === 2 && (
                    <View>
                        <Text style={styles.title}>목표 칼로리를 계산해드렸어요 🔥</Text>
                        <Text style={styles.description}>
                            키, 몸무게, 활동량에 따른 일일 목표 칼로리는 {calorieInfo.minCalories} ~ {calorieInfo.maxCalories} kcal 예요.
                        </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            value={userCalories}
                            onChangeText={handleCalorieChange}
                            placeholder="Enter your calories"
                        />
                        <Button title="Save" onPress={handleSubmit} />
                        <CustomBtn 
                            onPress={handleNextStep}
                            title=" 다음 " 
                            buttonStyle={styles.finishBtn}
                        />
                    </View>
                )}
                {currentStep ===3 && (
                    <View>
                        <MacroCalculator totalCalories={userCalories} goal={goal} />
                        <CustomBtn 
                                onPress={handleNextPress}
                                title=" 다음 " 
                                buttonStyle={styles.finishBtn}
                        />
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex:1,
        backgroundColor:"white"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    finishBtn: {
        backgroundColor: '#99aff8',
        width: width * 0.7,

    }
});

export default CaloriesScreen;
