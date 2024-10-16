import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const ErrorMessage = ({ message }: { message: string }) => {
  const navigation = useNavigation()
  return (
    <View className='flex-1 justify-center items-center px-3 bg-white'>
      <Text className='text-red-500 text-3xl text-center'>{message} 🤒</Text>
      <Pressable className='mt-5' onPress={() => navigation.goBack()}>
        <Text className=' text-xl' >
          Go Back
        </Text>
      </Pressable>
    </View>
  )
}

export default ErrorMessage