import axios from 'axios';
import {
  API_URL
} from '../../../utils/constants';

const NEWS_URL = `${API_URL}/utility/landing-page`;

const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3VwZXJhZG1pbiIsImVtYWlsIjoic3VwZXJhZG1pbjFAbXlraWRpLmlkIiwiZXhwaXJlc0luIjo4NjQwMDAsInVzZXJJZCI6IjZkNjIwZjIwLWYxMzktNDA1MC1hNzU3LTMzOTNmZWM5ZGZhZCIsInJvbGVzIjoiNyIsImtleSI6InN1cGVyYWRtaW4iLCJpYXQiOjE2NTczNzcxNzAsImV4cCI6MTY1NzQ2MzU3MCwiYXVkIjoiOTdiMzMxOTMtNDNmZi00ZTU4LTkxMjQtYjNhOWI5ZjcyYzM0IiwiaXNzIjoidGVsa29tIn0.jO0J34KBezbT-2H9SefWQ0eYKLoJAdodDSmTGPqw6Ed6I6QRJa3R8-rX6l92y_dYJXNNAmFYz9_dp-53XtkRwcf-CkZIx8I0uKE03MvRWs5rbA5nzGZZZmtVSbBU3ma_oRB_2U2-IGyWAHTTA3aHtnx6cZzsagHnVJbkkuRQ-6Dg-oP7UFQylfD01b0deTGhinmA8_3X0HOB3AC_drUOIZzpmsZ2QlQWE_1vO6UPcI2jJZLDxY9nr0oSDDss6a53A_3MSKt2wAnK9fVdrkQzeGLpyN8wlXSqVdVMcZq7-hPHQca-fBxV2yztiZ728-BnDOffRYUpj7e6mXkAqOjDNxaDc7rWRJvofpddqS_nzaNDQ4yUcbfTq6-ZjxQ0maXzRaxMHJuBc1MGna_TyckAdMX5M3cRj5wLW7LmIdG41r9y4H97i78MbMwsYC7SyVsWB4UUWi0Qs_11ZNeUvJWlZrE40al1F6QFDTR8dGAqpLHSsrrV3rUvrkJ-bX6VRf-j0oh9cTXGq0rYZ4F8lP8swl2VHKdGBMz2e32ksMC5Hf-bGTPC3_sfiW3R7_mauC-_RPXlz_bQH16ApcEGtYjuCLj-tXiotOVypASG4XflneIh47Ifw4k08E9iINXbfoDsffaYUJX-mgE3_UH_UtoZPr7TuS0R-w-b0_BF84LecFY"

const LOGGED_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
  },
};

export async function fetchNews() {
  try {
    const newslist = await axios.get(
      NEWS_URL, LOGGED_CONFIG
    );
    const res = newslist.data.data;
    return Promise.resolve(res?.news);
  } catch (error: any) {
    return Promise.resolve([]);
  }
}