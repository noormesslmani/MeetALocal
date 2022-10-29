import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './Authstyles';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthButton from '../../components/AuthButton';
import Icon from 'react-native-vector-icons/Ionicons'

const Categories=({navigation})=> {

    return (
    <View style={styles.background} >
        <Text style={styles.selectCategory}>Select at least 1 category</Text> 
        <View style={styles.categoryContainer}>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/tourism.png')} style={styles.categoryIcon}/>
                    <Text>Tourism</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/languages.png')} style={styles.categoryIcon}/>
                    <Text>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/history.png')} style={styles.categoryIcon}/>
                    <Text>History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/house.png')} style={styles.categoryIcon}/>
                    <Text>Housing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/suitcase.png')} style={styles.categoryIcon}/>
                    <Text>Jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/education.png')} style={styles.categoryIcon}/>
                    <Text>Education</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/cultures.png')} style={styles.categoryIcon}/>
                    <Text>Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/guidance.png')} style={styles.categoryIcon}/>
                    <Text>Guidance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={require('../../assets/more.png')} style={styles.categoryIcon}/>
                    <Text>Other</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}
export default Categories