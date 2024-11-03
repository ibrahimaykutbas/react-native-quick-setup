module.exports = `
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'

import Heart from '../assets/svg/heart-fill.svg'

const CustomButton = ({ title, onPress, loading, icon }) => {
  const [iconColor, setIconColor] = useState('black')

  const handlePress = () => {
    setIconColor(iconColor === 'black' ? 'red' : 'black')
    onPress && onPress()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handlePress}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : icon ? (
          <Heart fill={iconColor} width={24} height={24} /> 
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    width: 120,
    height: 40,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 45
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

`;
