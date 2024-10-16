import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon, ClockIcon, FireIcon, } from 'react-native-heroicons/outline'
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid'

import axios from 'axios'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { IError, MealData } from '../@types/types'
import ErrorMessage from '../components/ErrorMessage'
import CacheImage from '../helpers/CacheImage'

const RecipeDetailsScreen = (props: any) => {
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [mealData, setMealData] = React.useState<MealData | null>(null)
  const [error, setError] = React.useState<IError | null>(null);

  const item = props.route.params
  const mealId = props.route.params.idMeal

  const ingredientsIndexes = (mealData: any) => {
    if (!mealData) return []
    let ingredients = []
    for (let i = 1; i <= 20; i++) {
      if (mealData[`strIngredient${i}`]) {
        ingredients.push(i)
      }
    }
    return ingredients
  }
  // const getVideoId = (strYoutube: any) => {
  //   const regex = /[?&]v=([^&]+)/
  //   const matches = strYoutube.match(regex)
  //   console.log("🚀 ~ getVideoId ~ matches:", matches)
  //   if (matches && matches[1]) {
  //     return matches[1]
  //   }
  //   return ''
  // }
  // useEffect(() => {
  //   getVideoId(mealData?.strYoutube)
  // }, [])

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        setMealData(response.data.meals[0]);
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          setError({ message: err.message });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [])
  if (error) return <ErrorMessage message={error.message} />
  return (
    <ScrollView className='flex-1 bg-white' showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
      <StatusBar style='light' />
      <View className='flex-row mt-1 justify-center'>
        <CacheImage
          uri={item.strMealThumb}
          style={{ width: wp(98), height: hp(50), borderRadius: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
        />
      </View>

      <Animated.View entering={FadeIn.delay(200).duration(100)} className='w-full absolute flex-row justify-between pt-14 items-center'>
        <TouchableOpacity className='p-2 rounded-full ml-5 bg-white' onPress={() => props.navigation.goBack()}>
          <ChevronLeftIcon strokeWidth={4.5} size={hp(3.5)} color='#fbbf24' style={{ marginRight: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className='p-2 rounded-full mr-5 bg-white'>
          <HeartIcon strokeWidth={4.5} size={hp(3.5)} color={isFavorite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {
        loading
          ?
          <View className='mt-10'>
            <ActivityIndicator size={'large'} />
          </View> :
          <View className='px-4 space-y-4 pt-8'>
            {/* // name and area */}
            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-between space-y-4'>
              <Text style={{ fontSize: hp(3) }} className='font-bold flex-1  text-neutral-700'>{mealData?.strMeal}</Text>
              <Text style={{ fontSize: hp(2) }} className='font-medium flex-1  text-neutral-500'>{mealData?.strArea}</Text>
              {/* misc */}
              <View className='flex-row w-full justify-around'>
                <View className='flex rounded-full bg-amber-300 p-2'>
                  <View
                    className='bg-white rounded-full flex items-center justify-center '
                    style={{
                      width: hp(6.5),
                      height: hp(6.5),
                    }}
                  >
                    <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                  </View>
                  <View className='flex items-center space-y-1 py-2'>
                    <Text style={{ fontSize: hp(2) }} className='text-neutral-700 font-bold '>35</Text>
                    <Text style={{ fontSize: hp(1.3) }} className='text-neutral-700 font-bold '>Mins</Text>
                  </View>

                </View>
                <View className='flex rounded-full bg-amber-300 p-2'>
                  <View
                    className='bg-white rounded-full flex items-center justify-center '
                    style={{
                      width: hp(6.5),
                      height: hp(6.5),
                    }}
                  >
                    <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                  </View>
                  <View className='flex items-center space-y-1 py-2'>
                    <Text style={{ fontSize: hp(2) }} className='text-neutral-700 font-bold '>03</Text>
                    <Text style={{ fontSize: hp(1.3) }} className='text-neutral-700 font-bold '>Servings</Text>
                  </View>

                </View>
                <View className='flex rounded-full bg-amber-300 p-2'>
                  <View
                    className='bg-white rounded-full flex items-center justify-center '
                    style={{
                      width: hp(6.5),
                      height: hp(6.5),
                    }}
                  >
                    <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                  </View>
                  <View className='flex items-center space-y-1 py-2'>
                    <Text style={{ fontSize: hp(2) }} className='text-neutral-700 font-bold '>103</Text>
                    <Text style={{ fontSize: hp(1.3) }} className='text-neutral-700 font-bold '>Cals</Text>
                  </View>

                </View>
                <View className='flex rounded-full bg-amber-300 p-2'>
                  <View
                    className='bg-white rounded-full flex items-center justify-center '
                    style={{
                      width: hp(6.5),
                      height: hp(6.5),
                    }}
                  >
                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                  </View>
                  <View className='flex items-center space-y-1 py-2'>
                    <Text style={{ fontSize: hp(2) }} className='text-neutral-700 font-bold '>1/3</Text>
                    <Text style={{ fontSize: hp(1.3) }} className='text-neutral-700 font-bold '>Easy</Text>
                  </View>

                </View>


              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4'>
              <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700' >Ingredients</Text>
              <View className='space-y-2 ml-3'>
                {
                  ingredientsIndexes(mealData).map((index) => {
                    return (
                      <View
                        key={index}
                        className='flex-row space-x-4 '>
                        <View style={{
                          height: hp(1.5),
                          width: hp(1.5),
                        }}
                          className='bg-amber-300 rounded-full'
                        />
                        <View className='flex-row space-x-2'>
                          {/* @ts-ignore */}
                          <Text style={{ fontSize: hp(1.7) }} className='font-extrabold text-neutral-700'>{mealData['strMeasure' + index]}</Text>
                          {/* @ts-ignore */}
                          <Text style={{ fontSize: hp(1.7) }} className='font-medium text-neutral-600'>{mealData['strIngredient' + index]}</Text>
                        </View>
                      </View>)
                  })
                }
              </View>
            </Animated.View>

            {/* instructions */}
            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-4'>
              <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700' >Instructions</Text>
              <Text style={{ fontSize: hp(1.6) }} className='text-neutral-700'>{mealData?.strInstructions}</Text>
            </Animated.View>

            {/* {
              mealData?.strYoutube &&
              <View className='space-y-4'>
                <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700' >Recipe Video</Text>
              </View>
            } */}

          </View>

      }



    </ScrollView>
  )
}

export default RecipeDetailsScreen