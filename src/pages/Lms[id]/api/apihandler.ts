import axios from "axios";
import { API_URL, LOGGED_CONFIG } from "../../../utils/constants";

const LMS_URL = `${API_URL}/LMS/class`
const ASSIGNMENT_URL = `${API_URL}/LMS/assignment`


export async function fetchCoursesId(params:string) {
  try{
    const currentClass = await axios.get(`${LMS_URL}/${params}`,LOGGED_CONFIG)
    const res = currentClass.data.data
    return Promise.resolve(res)
  } catch(error:any) {
    return Promise.resolve({})
  }
}

export async function fetchAssignment(params:string) {
  try {
    const Assignments = await axios.get(`${ASSIGNMENT_URL}?classId=${params}`, LOGGED_CONFIG)
    const res = Assignments.data.data
    return Promise.resolve(res)
  }catch(error:any) {
    return Promise.resolve([])
  }
}