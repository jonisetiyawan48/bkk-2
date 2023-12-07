import { Route, Routes } from 'react-router-dom';
import Beranda from '../../pages/Beranda/Beranda';
import Blog from '../../pages/Blog/Blog';
import AllUsers from '../../pages/DaftarUser/AllUsers';
import Guru from '../../pages/DaftarUser/Guru';
import Kemendikbud from '../../pages/DaftarUser/Kemendikbud';
import Kepsek from '../../pages/DaftarUser/Kepsek';
import Siswa from '../../pages/DaftarUser/Siswa';
import Vokasi from '../../pages/DaftarUser/Vokasi';
import Forum from '../../pages/Forum/Forum';
import ForumDetail from '../../pages/Forum/ForumDetail';
import Lms from '../../pages/Lms/Lms';
import LmsID from '../../pages/Lms[id]/LmsID';
import Marketplace from '../../pages/Marketplace/Marketplace';
import NotFound from '../../pages/NotFound/NotFound';
import BursaRequestList from '../../pages/Pengajuan/BursaKerja/BursaRequestList';
import BursaKerja from '../../pages/Pengajuan/BursaKerja/BursaKerja';
import DetailBursa from '../../pages/Pengajuan/BursaKerja/DetailBursa';
import Kunjungan from '../../pages/Pengajuan/Kunjungan/Kunjungan';
import Curriculum from '../../pages/Pengajuan/Curriculum/Curriculum';
import Magang from '../../pages/Pengajuan/Magang/Magang';
import Penguji from '../../pages/Pengajuan/Penguji/Penguji';
import Sertifikasi from '../../pages/Pengajuan/Sertifikasi/Sertifikasi';
import TamuGuru from '../../pages/Pengajuan/TamuGuru/TamuGuru';
import UserProfile from '../../pages/UserProfile/UserProfile';
import { checkRole } from '../../utils/helpers/checkRole';
import Sidebar from '../Sidebar/Sidebar';
import ProtectedRoute from './ProtectedRoute';

export default function MainRoute() {
  return (
    <ProtectedRoute>
      <Sidebar>
        <Routes>

          {/* Static Routes */}

          <Route path="beranda" element={<Beranda />} />
          <Route path="katalog" element={<Marketplace />} />
          <Route path="blog" element={<Blog />} />
          <Route path="lms" element={<Lms />} />
          <Route path="forum" element={<Forum />} />
          <Route path="user-profile" element={<UserProfile />} />

          <Route path="pengajuan/tamuguru" element={<TamuGuru />} />
          <Route path="pengajuan/penguji" element={<Penguji />} />
          <Route path="pengajuan/sertifikasi" element={<Sertifikasi />} />
          <Route path="pengajuan/magang" element={<Magang />} />
          <Route path="pengajuan/kunjungan" element={<Kunjungan />} />  
          <Route path="pengajuan/bursakerja" element={<BursaKerja />} />
          <Route path="pengajuan/bursakerja/:id" element={<DetailBursa />} />
          <Route path="pengajuan/bursakerja/:id/request-list" element={<BursaRequestList />} />
          <Route path="pengajuan/curriculum" element={<Curriculum />} />

          <Route path="daftar-user/guru" element={<Guru />} />
          <Route path="daftar-user/siswa" element={<Siswa />} />
          <Route path="daftar-user/vokasi" element={<Vokasi />} />
          <Route path="daftar-user/kepsek" element={<Kepsek />} />
          <Route path="daftar-user/kemendikbud" element={<Kemendikbud />} />

          {/* Dynamic Routes */}

          <Route path="lms/:id" element={<LmsID />} />
          <Route path="forum/:forumId" element={<ForumDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Sidebar>
    </ProtectedRoute>
  );
}
