import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { address } from '../constants/address';
const baseURL= `${address}/api/v1.0.0/`

export async function getLocals(country, category, offset){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/locals/${country}/${category}/${offset}`,
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
      url:`${baseURL}foreigners/events/saved`,
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
  export async function getAllPosts(country, category, offset){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/posts/${country}/${category}/${offset}`,
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
      return {success: false, error}
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

  export async function toggleSaveEvent(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/event/toggle-save`,
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

  export async function isEventSaved(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/event/is-saved/${id}`,
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
  export async function createNewEvent(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}locals/event`,
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
  export async function deleteEvents(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "delete",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}locals/event`,
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
  export async function createNewPost(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/post`,
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
  export async function toggleFavoriteLocals(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/toggle-favorite`,
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
  export async function CheckFavoriteLocals(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/is-favorite/${id}`,
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
  export async function getUserDetails(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/user/${id}`,
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
  export async function getReviews(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      params:{id},
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/reviews`,
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
  export async function checkReviewed(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      params:{id},
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/is-reviewed`,
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

  export async function addReview(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/review`,
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

  export async function searchLocals(name){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      params:{name},
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/search`,
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
  export async function editProfile(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "put",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}users/edit-profile`,
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
  export async function isEventBooked(id){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      params:{id},
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/is-booked-event`,
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
  export async function toggleBookedEvent(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "post",
      data,
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}foreigners/toggle-event-booking`,
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
  export async function getSchedule(data){
    const token = await AsyncStorage.getItem('@token')
    const config = {
      method: "get",
      headers: { Authorization: `Bearer ${token}`},
      url:`${baseURL}locals/appointments`,
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

