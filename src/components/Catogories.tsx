import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Category } from '../@types/types';
import CacheImage from '../helpers/CacheImage';



const Catogories = ({ activeCategory, setActiveCategory, categories }: { activeCategory: string, setActiveCategory: any, categories: Category[] }) => {

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} exiting={FadeOutDown} >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='space-x-4' >
        {
          categories?.map((cat) => {
            let isActive = activeCategory == cat.strCategory.toLocaleLowerCase()
            let activeClass = isActive ? 'bg-amber-400' : 'bg-black/10'
            return <TouchableOpacity onPress={() => setActiveCategory(cat.strCategory.toLocaleLowerCase())} className='flex items-center space-y-1' key={cat.idCategory} >
              <View className={` ${activeClass} shadow-lg rounded-full p-1.5`}>
                {/* <Image
                  source={{ uri: cat.strCategoryThumb }} className='rounded-full shadow-lg' style={{ width: hp(6), height: hp(6) }}
                /> */}
                <CacheImage
                  uri={cat.strCategoryThumb} className='rounded-full shadow-lg' style={{ width: hp(6), height: hp(6) }}
                />
              </View>
              <Text style={{ fontSize: hp(1.5) }} className='text-neutral-600'>{cat.strCategory}</Text>
            </TouchableOpacity>
          })
        }
      </ScrollView>
    </Animated.View>
  )
}

export default Catogories