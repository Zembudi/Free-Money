// ---------- REGISTER ----------
if (document.getElementById('regForm')) {
  document.getElementById('regForm').addEventListener('submit', e => {
    e.preventDefault()
    const u = document.getElementById('regUsername').value.trim()
    const eMail = document.getElementById('regEmail').value.trim()
    const p = document.getElementById('regPassword').value

    if (!u || !eMail || !p) {
      alert('Harap isi semua kolom')
      return
    }

    let users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[u]) {
      alert('Username sudah dipakai')
      return
    }

    users[u] = { email: eMail, password: p }
    localStorage.setItem('users', JSON.stringify(users))
    alert('Pendaftaran berhasil! Silakan login.')
    location.href = 'login.html'
  })
}

// ---------- LOGIN ----------
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault()
    const u = document.getElementById('loginUsername').value.trim()
    const p = document.getElementById('loginPassword').value

    let users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[u] && users[u].password === p) {
      localStorage.setItem('loggedIn', u)
      location.href = 'index.html'
    } else {
      alert('Username atau password salah')
    }
  })
}

// ---------- CEK LOGIN & LOAD DATA ----------
if (location.pathname.endsWith('index.html')) {
  const logged = localStorage.getItem('loggedIn')
  if (!logged) {
    location.href = 'login.html'
  } else {
    document.getElementById('userName').textContent = logged

    // contoh penyimpanan pengaturan sederhana
    const dark = document.getElementById('darkTheme')
    const notif = document.getElementById('notifications')

    // muat nilai tersimpan
    dark.checked = localStorage.getItem('darkTheme') === 'true'
    notif.checked = localStorage.getItem('notifications') === 'true'

    // simpan tiap perubahan
    dark.addEventListener('change', () => {
      localStorage.setItem('darkTheme', dark.checked)
      document.body.style.background = dark.checked ? '#333' : '#fff'
    })
    notif.addEventListener('change', () => {
      localStorage.setItem('notifications', notif.checked)
    })
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem('loggedIn')
  location.href = 'login.html'
}
// script.js (bagian paling atas)
function toggleLogout() {
  const logoutLink = document.querySelector('.logout')
  if (logoutLink) {
    logoutLink.style.display = localStorage.getItem('loggedIn') ? 'inline' : 'none'
  }
}

// Panggil saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', toggleLogout)

// Fungsi logout yang sudah ada
function logout() {
  localStorage.removeItem('loggedIn')
  location.href = 'login.html'
}