import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation()
  const router = useRoute()

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    const timeout1 = setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(5));
    }, 100);

    const timeout2 = setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + hp(2));
    }, 300);

    const timeout3 = setTimeout(() => {
      navigation.navigate('Home' as never); // Use replace to prevent going back
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [ring1padding, ring2padding, navigation]);
  return (
    <View className='flex-1 justify-center space-y-10 items-center bg-amber-500'>
      <StatusBar style='light' />

      {/* logo with rings */}
      <Animated.View className='bg-white/20 rounded-full' style={{ padding: ring1padding }} >
        <Animated.View className='bg-white/20 rounded-full' style={{ padding: ring2padding }} >
          <Image source={require('../../assets/food.webp')} style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View>

      {/* title */}
      <View className='flex items-center space-y-2'>
        <Text style={{ fontSize: hp(7) }} className='text-white  tracking-widest font-bold'>Trecipe</Text>
        <Text style={{ fontSize: hp(2) }} className='text-white  tracking-widest font-bold'>Food Recipes</Text>
      </View>

    </View>


  )
}

export default WelcomeScreen