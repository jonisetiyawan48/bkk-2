import axios from 'axios';
import { API_URL, LOGGED_CONFIG } from '../../../../utils/constants';
import { unautorized } from '../../../../utils/helpers/isLogged';

const JOBS_URL = `${API_URL}/submission/job`;

export async function fetchJobs() {
  try {
    const jobsdata = await axios.get(JOBS_URL, LOGGED_CONFIG);

    return Promise.resolve({
      status: 'success',
      value: jobsdata.data.data,
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function requestLists(submissionId: string) {
  try {
    const jobsdata = await axios.get(JOBS_URL, LOGGED_CONFIG);

    return Promise.resolve({
      status: 'success',
      ...jobsdata.data.data?.filter((val: any) => val.submissionId == submissionId)[0],
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function detailJob(id: string | undefined) {
  try {
    const jobdata = await axios.get(`${API_URL}/submission/${id}`, LOGGED_CONFIG);

    return Promise.resolve({
      status: 'success',
      ...jobdata.data.data
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function postJobs(payload: any) {
  let form = new FormData();
  form.append('jobTitle', payload.jobTitle);
  form.append('date', payload.date);
  form.append('description', payload.description);
  form.append('condition', payload.condition);
  form.append('image', payload.image);
  
  try {
    await axios.post(JOBS_URL, form, LOGGED_CONFIG);

    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
export async function postRequestLists(submissionId: string, payload: any) {
  try {
    await axios.put(
      `${JOBS_URL}/${submissionId}`,
      {
        ...payload,
        updateType: 'add-student'
      }
      , LOGGED_CONFIG
    );

    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
export async function putRequestLists(submissionId: string, payload: any) {
  try {
    await axios.put(
      `${JOBS_URL}/${submissionId}`,
      {
        ...payload,
        updateType: 'edit-student'
      }
      , LOGGED_CONFIG
    );

    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function putJobs(param: string, payload: any) {
  try {
    await axios.put(`${JOBS_URL}/${param}`, payload, LOGGED_CONFIG);

    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message,
    });
  }
}

export async function deleteJobs(param: string) {
  try {
    await axios.delete(`${API_URL}/submission/${param}`, LOGGED_CONFIG);

    return Promise.resolve({
      status: 'success',
      message: 'Data telah dihapus',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
export async function deletetRequestList(payload: any) {
  try {
    await axios.put(
      `${JOBS_URL}/${payload.submissionId}`,
      {
        studentId: payload.studentId,
        updateType: 'remove-student'
      }
      , LOGGED_CONFIG
    );

    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function approveRequestList(payload: any, approve: boolean) {
  try {
    await axios.put(
      `${JOBS_URL}/${payload.submissionId}`,
      {
        studentId: payload.studentId,
        updateType: 'approve-decline-student',
        approve: approve
      }
      , LOGGED_CONFIG
    );
    return Promise.resolve({
      status: 'success',
      message: `${approve ? "Approval" : "Decline"} sukses`,
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
