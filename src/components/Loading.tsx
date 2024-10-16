import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <ActivityIndicator size={'large'} />
    </View>
  )
}

export default Loading