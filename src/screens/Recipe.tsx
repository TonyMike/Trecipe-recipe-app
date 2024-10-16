import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Category, Meal } from '../@types/types';
import CacheImage from '../helpers/CacheImage';


const RecipeCard = ({ recipe, index }: { recipe: any, index: number }) => {
  const recipeName = recipe.strMeal.length > 20 ? recipe.strMeal.slice(0, 20) + '...' : recipe.strMeal
  let isEven = index % 2
  const navigation = useNavigation()
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}
      exiting={FadeOutDown.delay(index * 100).duration(100)}>
      <Pressable
        //@ts-ignore
        onPress={() => navigation.navigate('RecipeDetails', { ...recipe })}
        style={{ width: '100%', paddingLeft: isEven ? 8 : 0, paddingRight: isEven ? 0 : 8 }}
        className='flex justify-center mb-4 gap-3 space-y-1'>
        <CacheImage
          uri={recipe.strMealThumb} className='rounded-[35px] bg-black/5  '
          style={{ width: '100%', height: index % 3 === 0 ? hp(20) : hp(35) }}
        />
        <Text
          className='text-neutral-600 font-semibold ml-2'
          style={{ fontSize: hp(1.5) }}>
          {recipeName}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

const Recipe = ({ categories, selectedRecipe }: { categories: Category[], selectedRecipe: any }) => {

  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='font-semibold  '>Recipes</Text>
      <View>

        {
          categories.length <= 0 || selectedRecipe.length <= 0 ? <ActivityIndicator /> :
            <MasonryList
              data={selectedRecipe}
              keyExtractor={(item: Meal) => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, i }) => <RecipeCard recipe={item} index={i} />}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({ first: ITEM_CNT })}
              onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITE M_CNT)}
            />}
      </View>
    </View>
  )
}

export default Recipe