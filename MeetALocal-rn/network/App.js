import { address } from '../constants/address';
import response from './Response';
const baseURL= `${address}/api/v1.0.0/`

  export async function getLocals(params){
    const config = {
      method: "get",
      params,
      url:`${baseURL}users/locals`,
    }
    return response(config)
  }

  export async function getFavorites(){
    const config = {
      method: "get",
      url:`${baseURL}foreigners/favorites`,
    }
    return response(config)
  }

  export async function getAllEvents(params){
    const config = {
      method: "get",
      params,
      url:`${baseURL}users/events`,
    }
    return response(config)
  }

  export async function getSavedEvents(){
    const config = {
      method: "get",
      url:`${baseURL}foreigners/events/saved`,
    }
    return response(config)
  }

  export async function getBookedEvents(){
    const config = {
      method: "get",
      url:`${baseURL}foreigners/events/booked`,
    }
    return response(config)
  }

  export async function getOwnEvents(){
    const config = {
      method: "get",
      url:`${baseURL}locals/events`,
    }
    return response(config)
  }

  export async function getAllPosts(params){
    const config = {
      method: "get",
      params,
      url:`${baseURL}users/posts`,
    }
    return response(config)
  }

  export async function getOwnPosts(){
    const config = {
      method: "get",
      url:`${baseURL}users/own-posts`,
    }
    return response(config)
  }

  export async function getComments(id){
    const config = {
      method: "get",
      url:`${baseURL}users/comments/${id}`,
    }
    return response(config)
  }

  export async function addComment(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}users/comment`,
    }
    return response(config)
  }

  export async function toggleSaveEvent(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}foreigners/event/toggle-save`,
    }
    return response(config)
  }

  export async function isEventSaved(id){
    const config = {
      method: "get",
      url:`${baseURL}foreigners/event/is-saved/${id}`,
    }
    return response(config)
  }

  export async function createNewEvent(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}locals/event`,
    }
    return response(config)
  }

  export async function deleteEvents(data){
    const config = {
      method: "delete",
      data,
      url:`${baseURL}locals/event`,
    }
    return response(config)
  }

  export async function createNewPost(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}users/post`,
    }
    return response(config)
  }

  export async function toggleFavoriteLocals(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}foreigners/toggle-favorite`,
    }
    return response(config)
  }

  export async function CheckFavoriteLocals(id){
    const config = {
      method: "get",
      url:`${baseURL}foreigners/is-favorite/${id}`,
    }
    return response(config)
  }

  export async function getUserDetails(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}users/user`,
    }
    return response(config)
  }

  export async function getReviews(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}users/reviews`,
    }
    return response(config)
  }

  export async function checkReviewed(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}foreigners/is-reviewed`,
    }
    return response(config)
  }

  export async function addReview(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}foreigners/review`,
    }
    return response(config)
  }

  export async function searchLocals(name){
    const config = {
      method: "get",
      params:{name},
      url:`${baseURL}foreigners/search`,
    }
    return response(config)
  }

  export async function editProfile(data){
    const config = {
      method: "put",
      data,
      url:`${baseURL}users/edit-profile`,
    }
    return response(config)
  }

  export async function isEventBooked(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}foreigners/is-booked-event`,
    }
    return response(config)
  }

  export async function toggleBookedEvent(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}foreigners/toggle-event-booking`,
    }
    return response(config)
  }

  export async function getSchedule(data){
    const config = {
      method: "get",
      url:`${baseURL}locals/appointments`,
    }
    return response(config)
  }

  export async function isAppointmentBooked(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}locals/is-booked-appointment`,
    }
    return response(config)
  }

  export async function addSchedule(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}locals/appointment`,
    }
    return response(config)
  }

  export async function getAppointments(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}foreigners/appointments`,
    }
    return response(config)
  }

  export async function toggleBookAppointment(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}foreigners/toggle-appointment-booking`,
    }
    return response(config)
  }

  export async function getBookedAppointments(){
    const config = {
      method: "get",
      url:`${baseURL}foreigners/booked-appointments`,
    }
    return response(config)
  }

  export async function addHighlight(data){
    const config = {
      method: "post",
      data,
      url:`${baseURL}locals/highlights`,
    }
    return response(config)
  }

  export async function getLocalsEvents(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}users/locals-events`,
    }
    return response(config)
  }

  export async function deleteReview(data){
    const config = {
      method: "delete",
      data,
      url:`${baseURL}foreigners/review`,
    }
    return response(config)
  }

  export async function userProfile(id){
    const config = {
      method: "get",
      params:{id},
      url:`${baseURL}users/user-profile`,
    }
    return response(config)
  }

