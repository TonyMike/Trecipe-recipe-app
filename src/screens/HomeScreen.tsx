import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Catogories from '../components/Catogories';
import useGetCategories from '../hooks/useGetCategories';
import Recipe from './Recipe';

const HomeScreen = () => {
  const [activeCategory, SetActiveCategory] = useState('beef')
  const { categories, loading, error, selectedRecipe } = useGetCategories(activeCategory)
  if (loading) {
    return <ActivityIndicator />
  }
  if (error?.message) {
    return (
      <View>
        <Text style={{ fontSize: hp(3) }} className='text-red-600'>{error.message}</Text>
      </View>)
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        className='space-y-6 pt-14'
      >
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          <Image source={require('../../assets/avatar.webp')} style={{ width: hp(5), height: hp(5) }} className='rounded-full' />
          <BellIcon size={hp(4)} color='gray' />
        </View>

        {/* greetings */}
        <View className='mx-4 space-y-2 mb-2 '>
          <Text style={{ fontSize: hp(1.7) }} className='text-neutral-600'>Hello, Tony</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className='text-neutral-600 font-semibold'>Make your own food</Text>
            <Text style={{ fontSize: hp(3.8) }} className='text-neutral-600 font-semibold'>Stay at <Text className='text-amber-400'>Home</Text> </Text>
          </View>
        </View>

        {/* search bar */}
        <View className='flex-row mx-4 bg-black/5 p-1.5 items-center rounded-full'>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className='flex-1 px-3  tracking-wider pl-3 mb-1'
          />
          <View className='bg-white rounded-full p-3'>
            <MagnifyingGlassIcon size={hp(2.5)} color='gray' strokeWidth={3} />
          </View>
        </View>

        {/* categories */}
        <View className=' mx-4 mb-4'>
          <Text className="text-2xl font-bold mb-4">Trending Category</Text>
          {categories.length > 0 && <Catogories categories={categories} activeCategory={activeCategory.toLocaleLowerCase()} setActiveCategory={SetActiveCategory} />}
        </View>

        {/* recipe */}
        <View>
          <Recipe selectedRecipe={selectedRecipe} categories={categories} />
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen