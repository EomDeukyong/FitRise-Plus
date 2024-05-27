import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from '../src/store';
import { Provider } from 'react-redux';

const Layout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            // Hide the header for all other routes.
            headerShown: true,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screens/login" options={{ title: '로그인' }} />
          {/* <Stack.Screen name="screens/mainScreen" options={{ title: '홈 화면' }} /> */}
          {/* <Stack.Screen name="screens/analysisScreen" options={{ title: 'Analysis Screen' }} /> */}
          {/* <Stack.Screen name="screens/calendarScreen" options={{ title: 'Calendar Screen' }} /> */}
          <Stack.Screen name="screens/caloriesScreen" options={{ title: 'Calories Screen' }} />
          <Stack.Screen name="screens/characterGAN" options={{ title: 'Character GAN' }} />
          <Stack.Screen name="screens/chatScreen" options={{ title: 'Chat Screen' }} />
          <Stack.Screen name="screens/dietInput" options={{ title: 'Diet Input' }} />
          {/* <Stack.Screen name="screens/dietScreen" options={{ title: 'Diet Screen' }} /> */}
          <Stack.Screen name="screens/foodSearchScreen" options={{ title: 'Food Search Screen' }} />
          <Stack.Screen name="screens/InfoInput" options={{ title: 'Info Input' }} />
          <Stack.Screen name="screens/postureCorrection" options={{ title: 'Posture Correction' }} />
          {/* <Stack.Screen name="screens/stressScreen" options={{ title: 'Stress Screen' }} /> */}
        </Stack>
      </SafeAreaProvider>
    </Provider>
  )
}

export default Layout