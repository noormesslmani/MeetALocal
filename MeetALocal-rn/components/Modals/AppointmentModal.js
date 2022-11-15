import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import { address } from '../../constants/address';
import { UserContext } from '../../App'
import { colors } from '../../constants/colors';
import { Button} from 'react-native-paper';
import AppointmentButton from '../Buttons/AppointmentButton';
import AppointmentsModalStyles from '../ComponentsStyles/AppointmentModalStyles';
const AppointmentsModal=({navigation, setModalVisible, modalVisible})=> {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={AppointmentsModalStyles.centeredView}>
        <View style={AppointmentsModalStyles.modalView}>
            <Text style={AppointmentsModalStyles.title}>Pick a time</Text>
            <ScrollView  showsVerticalScrollIndicator={false} >
            <AppointmentButton/>
            <AppointmentButton/>
            <AppointmentButton/>
            <AppointmentButton/>
            </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
export default AppointmentsModal