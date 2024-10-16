import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'

/**
 * Asynchronous component for caching and displaying images.
 * Retrieves images from AsyncStorage if available; otherwise, fetches from the provided URI, converts to base64, and stores in AsyncStorage for future use.
 * @param {any} props - The properties passed to the CacheImage component.
 * @returns {JSX.Element} A React element representing the cached image.
 */
/**
 * Custom hook to cache and display images efficiently.
 * Retrieves images from cache if available, otherwise fetches and caches them.
 * @param props - The properties for the CacheImage component.
 * @returns A React component that displays the cached image.
 */

const CacheImage = (props: any) => {
  const [cacheSource, setCacheSource] = useState({})
  const { uri } = props
  useEffect(() => {
    const getCacheImage = async () => {
      try {
        const cacheImageData = await AsyncStorage.getItem(uri)
        if (cacheImageData) {
          setCacheSource({ uri: cacheImageData })
        } else {
          const res = await fetch(uri)
          const imageBlob = await res.blob()
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(imageBlob)
            reader.onloadend = () => resolve(reader.result)
          })
          await AsyncStorage.setItem(uri, base64Data as string)
          setCacheSource({ uri: base64Data })
        }
      } catch (error) {
        setCacheSource({ uri })
      }
    }
    getCacheImage()
  }, [])

  return (
    <Animated.Image source={cacheSource} {...props} />
  )
}

export default CacheImage