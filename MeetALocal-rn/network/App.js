import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseURL= "http://192.168.1.7:8000/api/v1.0.0/"

export async function getLocals(country, category){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/locals/${country}/${category}`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }

  export async function getFavorites(){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/favorites`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }
  export async function getAllEvents(country, category){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/events/${country}/${category}`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }

  export async function getSavedEvents(){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/events/saved`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }
  export async function getOwnEvents(){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}locals/events`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }
  export async function getAllPosts(country, category){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/posts/${country}/${category}`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }
  export async function getOwnPosts(){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/posts`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }

  export async function getComments(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/comments/${id}`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }
  export async function addComment(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/comment`,
    }
    try{
      const res = await axios(config)
      return {success:true, data: res.data}
    }
    catch (error) {
      console.warn(error)
      return {'success': false, error}
    }
  }