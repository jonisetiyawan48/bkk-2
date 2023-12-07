import axios from 'axios'
import { API_URL, LOGGED_CONFIG } from '../../../utils/constants'

const LMS_URL = `${API_URL}/LMS/class`

export async function fetchCourses() {
  try{
    const classData = await axios.get(LMS_URL, LOGGED_CONFIG)
    const res = classData.data.data
    return Promise.resolve(res)
  } catch(error:any) {
    return Promise.resolve([])
  }
}

