export type QuizOption = {
  label: "A" | "B" | "C" | "D" | "E" | "F";
  text: string;
  score: number; // 0-10, granular biar distribusi akhir lebih halus
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

// Bobot per opsi dibuat granular (0-10) alih-alih linear 0-5,
// supaya distribusi skor akhir antar 600+ kombinasi jawaban lebih natural
// dan gak numpuk cuma di beberapa golongan tengah.
// A = paling waras (0-1), F = paling akut (8-10), dengan variasi per soal
// biar soal "berat" (red flag, prioritas hidup) punya bobot psikologis lebih besar.

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      "Jam berapa biasanya lo terakhir liat HP sebelum tidur gara-gara nungguin chat doi?",
    options: [
      { label: "A", text: "Gak pernah nungguin, tidur ya tidur", score: 0 },
      { label: "B", text: "Kadang cek doang", score: 2 },
      { label: "C", text: "Sering sih, sekitar jam 11-12", score: 4 },
      { label: "D", text: "Sampe jam 1-2 pagi", score: 6 },
      { label: "E", text: "Sampe HP lowbat sendiri", score: 8 },
      {
        label: "F",
        text: "Saya tidur sambil pegang HP, posisi siaga 24 jam",
        score: 10,
      },
    ],
  },
  {
    id: 2,
    question: 'Doi WA "oke" doang tanpa emoji. Reaksi lo?',
    options: [
      { label: "A", text: "Ya emang oke, gpp", score: 0 },
      { label: "B", text: "Dibaca biasa lanjut aktivitas", score: 2 },
      { label: "C", text: "Agak kepikiran sebentar", score: 4 },
      {
        label: "D",
        text: "Mikirin maksudnya apa selama beberapa menit",
        score: 6,
      },
      {
        label: "E",
        text: "Screenshot, kirim ke grup buat dianalisis bareng temen",
        score: 8,
      },
      {
        label: "F",
        text: "Bikin essay overthinking 5 paragraf di notes HP",
        score: 10,
      },
    ],
  },
  {
    id: 3,
    question: "Story doi baru naik. Berapa lama lo nge-react?",
    options: [
      { label: "A", text: "Gak nonton story orang", score: 0 },
      { label: "B", text: "Ntar-ntar juga ditonton", score: 2 },
      { label: "C", text: "Dalam sejam lah", score: 4 },
      { label: "D", text: "Kurang dari 10 menit", score: 6 },
      { label: "E", text: "Kurang dari 1 menit, udah standby", score: 8 },
      {
        label: "F",
        text: "Notifikasi story-nya gua set paling atas, react detik pertama",
        score: 10,
      },
    ],
  },
  {
    id: 4,
    question:
      "Lo lagi di tempat baru/liburan. Hal pertama yang lo lakuin?",
    options: [
      { label: "A", text: "Nikmatin momennya sendiri dulu", score: 0 },
      { label: "B", text: "Foto-foto buat diri sendiri", score: 2 },
      {
        label: "C",
        text: "Kepikiran pengen cerita ke doi ntar",
        score: 4,
      },
      { label: "D", text: "Langsung kirim foto/lokasi ke doi", score: 6 },
      {
        label: "E",
        text: 'Video call doi biar dia "ikut" liburan',
        score: 8,
      },
      {
        label: "F",
        text: "Gak jadi nikmatin krn kepikiran doi gak ada di sini",
        score: 10,
      },
    ],
  },
  {
    id: 5,
    question: "Doi gak bales chat 3 jam. Lo ngapain?",
    options: [
      { label: "A", text: "Biasa aja, sibuk juga", score: 0 },
      { label: "B", text: "Lanjut kerjaan, nanti juga bales", score: 2 },
      { label: "C", text: "Sesekali cek HP", score: 4 },
      { label: "D", text: "Cek HP tiap 15 menit", score: 6 },
      {
        label: "E",
        text: 'Mulai bikin skenario "jangan-jangan dia..."',
        score: 8,
      },
      {
        label: "F",
        text: 'Udah nyiapin chat susulan "dimarahin emoji" version',
        score: 10,
      },
    ],
  },
  {
    id: 6,
    question:
      "Temen ngajak hangout pas lo udah ada plan random sama doi (atau berharap diajak doi). Pilihan lo?",
    options: [
      { label: "A", text: "Hangout sama temen, doi nomor dua", score: 0 },
      { label: "B", text: "Hangout, sambil chat doi nyambi", score: 2 },
      { label: "C", text: "Mikir dulu lama", score: 4 },
      {
        label: "D",
        text: "Nego waktu biar bisa dua-duanya",
        score: 5,
      },
      {
        label: "E",
        text: "Batalin temen demi standby buat doi",
        score: 8,
      },
      {
        label: "F",
        text: "Gak usah ditanya, otomatis pilih doi",
        score: 10,
      },
    ],
  },
  {
    id: 7,
    question: "Lo browsing online shop. Tiba-tiba lo...",
    options: [
      { label: "A", text: "Beli barang buat diri sendiri aja", score: 0 },
      { label: "B", text: "Liat-liat doang gak beli", score: 1 },
      {
        label: "C",
        text: 'Kepikiran "ini cocok buat doi"',
        score: 4,
      },
      { label: "D", text: "Add to cart barang buat doi", score: 6 },
      {
        label: "E",
        text: "Checkout barang buat doi duluan sebelum punya sendiri",
        score: 8,
      },
      {
        label: "F",
        text: 'Wishlist khusus "Doi" udah ada 50 item',
        score: 10,
      },
    ],
  },
  {
    id: 8,
    question: "Gimana cara lo nge-judge mood doi dari chat?",
    options: [
      { label: "A", text: "Gak terlalu mikirin, ya udah", score: 0 },
      { label: "B", text: "Liat sekilas aja", score: 2 },
      {
        label: "C",
        text: "Notice kalo beda dari biasanya",
        score: 4,
      },
      {
        label: "D",
        text: "Analisis pemilihan kata & tanda baca",
        score: 6,
      },
      {
        label: "E",
        text: "Bandingin sama chat-chat sebelumnya buat pattern",
        score: 8,
      },
      {
        label: "F",
        text: "Punya tabel mental lengkap pola titik koma doi per mood",
        score: 10,
      },
    ],
  },
  {
    id: 9,
    question: "Playlist musik lo belakangan ini isinya...",
    options: [
      {
        label: "A",
        text: "Sama aja kayak biasa, genre favorit gua",
        score: 0,
      },
      { label: "B", text: "Random sesuai mood harian", score: 1 },
      {
        label: "C",
        text: "Mulai keselip lagu galau dikit",
        score: 4,
      },
      {
        label: "D",
        text: "Banyak lagu yang related sama doi",
        score: 6,
      },
      {
        label: "E",
        text: 'Playlist khusus "buat doi" / "pas mikirin doi"',
        score: 8,
      },
      {
        label: "F",
        text: "Semua playlist isinya lagu yang ngingetin sama doi doang",
        score: 10,
      },
    ],
  },
  {
    id: 10,
    question:
      'Lo ketemu mantan doi atau orang yang "deket" sama doi. Reaksi lo?',
    options: [
      { label: "A", text: "Biasa aja, gak ada urusan", score: 0 },
      { label: "B", text: "Say hi sopan doang", score: 1 },
      {
        label: "C",
        text: "Agak penasaran background-nya",
        score: 4,
      },
      {
        label: "D",
        text: "Nyari tau lebih lanjut diem-diem",
        score: 6,
      },
      { label: "E", text: "Stalk medsos orang itu detail", score: 8 },
      {
        label: "F",
        text: "Udah punya timeline lengkap hubungan doi sama orang itu",
        score: 10,
      },
    ],
  },
  {
    id: 11,
    question: "Doi cerita masalah hidupnya. Respon lo?",
    options: [
      { label: "A", text: "Dengerin, kasih saran objektif", score: 0 },
      { label: "B", text: "Dengerin, kasih dukungan standar", score: 1 },
      { label: "C", text: "Ikut kepikiran abis itu", score: 4 },
      {
        label: "D",
        text: "Mikirin solusi sampe lo sendiri stress",
        score: 6,
      },
      {
        label: "E",
        text: "Masalah doi jadi masalah lo nomor satu",
        score: 8,
      },
      {
        label: "F",
        text: "Lo lebih stress dari doi sendiri yang punya masalah",
        score: 10,
      },
    ],
  },
  {
    id: 12,
    question: "Gimana cara lo respon kalo doi salah / nyebelin ke lo?",
    options: [
      { label: "A", text: "Tegur langsung, gak masalah", score: 0 },
      { label: "B", text: "Bilang baik-baik", score: 1 },
      { label: "C", text: "Diem aja sambil agak kesel", score: 4 },
      {
        label: "D",
        text: "Cari pembenaran buat tindakan doi",
        score: 6,
      },
      { label: "E", text: "Nyalahin diri sendiri duluan", score: 8 },
      {
        label: "F",
        text: "Bela doi ke siapapun yang protes, walau jelas2 doi salah",
        score: 10,
      },
    ],
  },
  {
    id: 13,
    question: "Lo abis ribut sama doi. Gimana harimu?",
    options: [
      { label: "A", text: "Tetep produktif kayak biasa", score: 0 },
      {
        label: "B",
        text: "Agak kepikiran tapi tetep jalan",
        score: 2,
      },
      { label: "C", text: "Mood turun lumayan", score: 4 },
      { label: "D", text: "Susah fokus kerja/sekolah", score: 6 },
      {
        label: "E",
        text: "Gak ngapa-ngapain selain mikirin ribut tadi",
        score: 8,
      },
      {
        label: "F",
        text: "Hidup berasa berhenti total sampe baikan",
        score: 10,
      },
    ],
  },
  {
    id: 14,
    question:
      "Berapa banyak draft chat yang lo tulis-hapus-tulis lagi ke doi?",
    options: [
      {
        label: "A",
        text: "Gak pernah, langsung kirim apa adanya",
        score: 0,
      },
      { label: "B", text: "Sesekali edit dikit", score: 2 },
      { label: "C", text: "Beberapa kali revisi", score: 4 },
      { label: "D", text: "Bisa 10+ kali ganti kata", score: 6 },
      {
        label: "E",
        text: "Sampe minta pendapat temen dulu sebelum kirim",
        score: 8,
      },
      {
        label: "F",
        text: "Ada grup khusus buat review setiap chat ke doi",
        score: 10,
      },
    ],
  },
  {
    id: 15,
    question: "Soal masa depan, lo udah mikirin...",
    options: [
      {
        label: "A",
        text: "Belum mikirin apa-apa, fokus sekarang",
        score: 0,
      },
      {
        label: "B",
        text: "Rencana karir/diri sendiri dulu",
        score: 1,
      },
      {
        label: "C",
        text: "Kadang kebayang masa depan bareng doi",
        score: 4,
      },
      { label: "D", text: "Udah ada bayangan nama anak", score: 6 },
      {
        label: "E",
        text: "Udah survey venue nikah & undangan",
        score: 8,
      },
      {
        label: "F",
        text: "Udah bikin moodboard lengkap rumah tangga bersama doi",
        score: 10,
      },
    ],
  },
  {
    id: 16,
    question:
      "Gimana reaksi lo kalo liat doi deket sama orang lain (temen biasa)?",
    options: [
      { label: "A", text: "Wajar, dia punya temen lain juga", score: 0 },
      { label: "B", text: "Gak masalah sama sekali", score: 1 },
      { label: "C", text: "Dikit penasaran siapa itu", score: 4 },
      { label: "D", text: "Mulai nanya-nanya halus", score: 6 },
      {
        label: "E",
        text: "Cemburu tapi gak ngomong langsung",
        score: 8,
      },
      {
        label: "F",
        text: "Interogasi total + cari tau riwayat orang itu",
        score: 10,
      },
    ],
  },
  {
    id: 17,
    question: "Lo lagi makan enak sendirian. Hal yang muncul di kepala?",
    options: [
      { label: "A", text: "Fokus nikmatin makanan", score: 0 },
      { label: "B", text: "Mikirin makanan doang gak lain", score: 1 },
      { label: "C", text: "Pengen foto buat diupload", score: 2 },
      {
        label: "D",
        text: '"Doi pasti suka nih"',
        score: 5,
      },
      {
        label: "E",
        text: "Nahan diri gak makan duluan sebelum doi tau",
        score: 8,
      },
      {
        label: "F",
        text: "Rasa makanan jadi gak enak kalo doi gak ada di sini",
        score: 10,
      },
    ],
  },
  {
    id: 18,
    question:
      "Lo udah tau ada red flag di doi (misal: suka ghosting, kasar, dll). Apa yang lo lakuin?",
    options: [
      {
        label: "A",
        text: "Langsung evaluasi & jaga jarak",
        score: 0,
      },
      {
        label: "B",
        text: "Bahas baik-baik, kasih batasan jelas",
        score: 2,
      },
      {
        label: "C",
        text: "Diem-diem khawatir tapi lanjut",
        score: 5,
      },
      {
        label: "D",
        text: 'Cari pembenaran "mungkin dia capek doang"',
        score: 7,
      },
      {
        label: "E",
        text: "Tetep lanjut walau udah sering ngerasa gak nyaman",
        score: 9,
      },
      {
        label: "F",
        text: "Defend red flag itu ke temen-temen yang ngingetin",
        score: 10,
      },
    ],
  },
  {
    id: 19,
    question:
      'Kapan terakhir kali lo cek "last seen" atau status online doi?',
    options: [
      { label: "A", text: "Gak pernah ngecek itu", score: 0 },
      { label: "B", text: "Lupa, gak penting", score: 1 },
      {
        label: "C",
        text: "Kadang doang kalo lagi nunggu bales",
        score: 4,
      },
      { label: "D", text: "Beberapa kali sehari", score: 6 },
      {
        label: "E",
        text: "Tiap buka HP otomatis cek itu duluan",
        score: 8,
      },
      {
        label: "F",
        text: "Udah hafal jam-jam aktif doi kayak jadwal kereta",
        score: 10,
      },
    ],
  },
  {
    id: 20,
    question: "Gimana caranya lo milih baju/outfit harian?",
    options: [
      {
        label: "A",
        text: "Sesuai mood & kenyamanan sendiri",
        score: 0,
      },
      { label: "B", text: "Sesuai acara doang", score: 1 },
      {
        label: "C",
        text: 'Kadang kepikiran "doi suka warna apa ya"',
        score: 4,
      },
      {
        label: "D",
        text: "Mulai nyesuaiin warna favorit doi",
        score: 6,
      },
      {
        label: "E",
        text: "Outfit lo udah dominan warna kesukaan doi semua",
        score: 8,
      },
      {
        label: "F",
        text: 'Lo dressing sesuai requirement imajiner "biar doi makin sayang"',
        score: 10,
      },
    ],
  },
  {
    id: 21,
    question: "Lo nemu meme/konten lucu. Apa yang lo lakuin?",
    options: [
      { label: "A", text: "Ketawa sendiri, lanjut scroll", score: 0 },
      { label: "B", text: "Share ke grup temen", score: 1 },
      {
        label: "C",
        text: '"Doi pasti suka nih juga"',
        score: 4,
      },
      {
        label: "D",
        text: "Kirim langsung ke doi duluan sebelum yang lain",
        score: 6,
      },
      {
        label: "E",
        text: 'Bikin folder khusus "meme buat doi"',
        score: 8,
      },
      {
        label: "F",
        text: "Bikin meme sendiri yang related ke doi & lo",
        score: 10,
      },
    ],
  },
  {
    id: 22,
    question: "Soal duit, lo paling gampang ngeluarin uang buat...",
    options: [
      {
        label: "A",
        text: "Kebutuhan & keinginan diri sendiri",
        score: 0,
      },
      { label: "B", text: "Investasi/tabungan masa depan", score: 1 },
      {
        label: "C",
        text: "Sesekali beliin hadiah kecil random",
        score: 3,
      },
      {
        label: "D",
        text: "Lebih royal kalo buat doi dibanding diri sendiri",
        score: 6,
      },
      {
        label: "E",
        text: "Pinjem duit demi nuruti kemauan doi",
        score: 9,
      },
      {
        label: "F",
        text: "Saldo rekening abis demi bikin doi senang terus",
        score: 10,
      },
    ],
  },
  {
    id: 23,
    question:
      "Gimana reaksi lo pas liat notifikasi chat masuk, sebelum tau dari siapa?",
    options: [
      { label: "A", text: "Biasa aja, buka kalo sempet", score: 0 },
      {
        label: "B",
        text: "Penasaran standar siapa yg chat",
        score: 2,
      },
      { label: "C", text: "Harap-harap itu doi", score: 4 },
      { label: "D", text: "Jantung berdebar dikit", score: 6 },
      { label: "E", text: "Langsung grab HP secepat kilat", score: 8 },
      {
        label: "F",
        text: "Udah ada nada notif khusus, denger bunyinya aja jantung lompat",
        score: 10,
      },
    ],
  },
  {
    id: 24,
    question:
      "Kalo doi posting foto bareng orang lain (temen, keluarga, dll), lo...",
    options: [
      { label: "A", text: "Like biasa aja", score: 0 },
      { label: "B", text: "Comment positif standar", score: 1 },
      {
        label: "C",
        text: "Zoom-zoom liat siapa aja yang ada",
        score: 4,
      },
      {
        label: "D",
        text: "Analisis posisi & ekspresi tiap orang di foto",
        score: 6,
      },
      {
        label: "E",
        text: "Screenshot buat disimpen/dibahas",
        score: 8,
      },
      {
        label: "F",
        text: "Bikin teori konspirasi lengkap soal foto itu",
        score: 10,
      },
    ],
  },
  {
    id: 25,
    question: "Apa yang lo lakuin kalo lagi bosen banget di tengah hari?",
    options: [
      { label: "A", text: "Main game/scroll medsos biasa", score: 0 },
      { label: "B", text: "Tidur atau nyari hiburan random", score: 1 },
      { label: "C", text: "Kepoin medsos doi dikit", score: 4 },
      {
        label: "D",
        text: "Re-read chat lama sama doi",
        score: 6,
      },
      {
        label: "E",
        text: "Liatin foto-foto doi yang udah lo save",
        score: 8,
      },
      {
        label: "F",
        text: "Bikin ulang timeline hubungan dari hari pertama di kepala",
        score: 10,
      },
    ],
  },
  {
    id: 26,
    question:
      "Gimana cara lo respon kalo rencana lo & doi gak sejalan (misal beda pilihan tempat makan)?",
    options: [
      { label: "A", text: "Diskusi biasa, cari tengah", score: 0 },
      { label: "B", text: "Kompromi standar dua arah", score: 1 },
      {
        label: "C",
        text: "Lo lebih sering ngalah duluan",
        score: 4,
      },
      {
        label: "D",
        text: "Lo selalu ngalah apapun caranya",
        score: 6,
      },
      {
        label: "E",
        text: "Keinginan lo otomatis ke-cancel demi ngikutin doi",
        score: 8,
      },
      {
        label: "F",
        text: "Lo bahkan udah lupa apa keinginan lo sendiri",
        score: 10,
      },
    ],
  },
  {
    id: 27,
    question:
      "Lo liat doi typing... terus berhenti, terus typing lagi. Reaksi lo?",
    options: [
      { label: "A", text: "Gak notice, gak ngeliatin terus", score: 0 },
      {
        label: "B",
        text: "Liat sekilas terus lanjut aktivitas",
        score: 2,
      },
      {
        label: "C",
        text: '"Ngetik apa ya"',
        score: 4,
      },
      {
        label: "D",
        text: "Mata gak lepas dari layar nungguin",
        score: 6,
      },
      {
        label: "E",
        text: "Udah nyiapin reaksi/jawaban duluan",
        score: 8,
      },
      {
        label: "F",
        text: "Bisa nebak isi chat dari pola titik tiga itu",
        score: 10,
      },
    ],
  },
  {
    id: 28,
    question:
      "Soal circle pertemanan lo sekarang dibanding sebelum kenal doi:",
    options: [
      { label: "A", text: "Sama aja, gak berubah", score: 0 },
      {
        label: "B",
        text: "Nambah temen baru dari circle doi tapi tetep seimbang",
        score: 2,
      },
      {
        label: "C",
        text: "Mulai lebih sering sama circle doi",
        score: 4,
      },
      {
        label: "D",
        text: "Circle lama mulai jarang ketemu",
        score: 6,
      },
      {
        label: "E",
        text: "Circle lo sekarang circle-nya doi semua",
        score: 8,
      },
      {
        label: "F",
        text: "Lo bahkan lupa kontak temen lama sendiri",
        score: 10,
      },
    ],
  },
  {
    id: 29,
    question:
      "Apa reaksi lo kalo orang lain ngomongin kejelekan doi (sekalipun bener)?",
    options: [
      { label: "A", text: "Dengerin, kasih pendapat objektif", score: 0 },
      { label: "B", text: "Netral, gak ikut nge-judge", score: 1 },
      {
        label: "C",
        text: "Agak gak nyaman tapi diem",
        score: 4,
      },
      { label: "D", text: "Mulai defend dikit-dikit", score: 6 },
      {
        label: "E",
        text: "Langsung bela total walau dalem hati ngakuin bener",
        score: 8,
      },
      {
        label: "F",
        text: "Putus pertemanan demi loyalitas ke doi",
        score: 10,
      },
    ],
  },
  {
    id: 30,
    question:
      "Lo lagi belajar/kerja, terus HP bunyi notif chat doi. Apa yang terjadi?",
    options: [
      { label: "A", text: "Lanjut kerjaan, dibalas nanti", score: 0 },
      { label: "B", text: "Liat dulu, balas kalo penting", score: 2 },
      { label: "C", text: "Fokus kerja keganggu dikit", score: 4 },
      {
        label: "D",
        text: "Konsentrasi langsung hilang",
        score: 6,
      },
      {
        label: "E",
        text: "Kerjaan ditunda demi bales chat",
        score: 8,
      },
      {
        label: "F",
        text: "Kerjaan ditinggal total, gak bisa fokus sampe selesai chat-nya",
        score: 10,
      },
    ],
  },
  {
    id: 31,
    question:
      "Kalo lo disuruh deskripsiin hubungan lo & doi ke orang asing, lo bakal cerita...",
    options: [
      {
        label: "A",
        text: 'Singkat & objektif, "ya gini-gini aja"',
        score: 0,
      },
      {
        label: "B",
        text: "Cerita standar, ada plus minus",
        score: 1,
      },
      {
        label: "C",
        text: "Lebih banyak sisi baiknya doang",
        score: 4,
      },
      {
        label: "D",
        text: "Cerita panjang, semua hal soal doi",
        score: 6,
      },
      {
        label: "E",
        text: "Cerita berjam-jam tanpa sadar lo ngomong sendiri",
        score: 8,
      },
      {
        label: "F",
        text: "Bawa slide presentasi cinta lengkap dengan studi kasus",
        score: 10,
      },
    ],
  },
  {
    id: 32,
    question:
      "Lo abis liat film romantis/komedi. Hal pertama yang lo pikirin?",
    options: [
      { label: "A", text: "Review film itu doang", score: 0 },
      { label: "B", text: "Mikirin filmnya seru/gak", score: 1 },
      {
        label: "C",
        text: "Kepikiran sekilas relate ke kehidupan lo",
        score: 3,
      },
      {
        label: "D",
        text: "Kebayang momen kayak gitu sama doi",
        score: 6,
      },
      {
        label: "E",
        text: "Pengen rewatch sambil video call doi",
        score: 8,
      },
      {
        label: "F",
        text: "Nangis sambil bikin caption panjang khusus tentang doi",
        score: 10,
      },
    ],
  },
  {
    id: 33,
    question:
      "Gimana cara lo tidur kalo lagi LDR-an / lagi jauh dari doi (atau berharap deket doi)?",
    options: [
      { label: "A", text: "Tidur normal kayak biasa", score: 0 },
      { label: "B", text: "Agak susah tidur dikit doang", score: 2 },
      { label: "C", text: "Video call dulu sebelum tidur", score: 4 },
      { label: "D", text: "Telponan sampe ketiduran", score: 6 },
      {
        label: "E",
        text: "Nyetel rekaman suara doi biar tenang",
        score: 8,
      },
      {
        label: "F",
        text: "Tidur sambil chat masih terbuka, takut miss apapun",
        score: 10,
      },
    ],
  },
  {
    id: 34,
    question:
      "Lo lagi olahraga/diet/self improvement. Motivasi terbesarnya?",
    options: [
      {
        label: "A",
        text: "Buat diri sendiri, kesehatan & kepercayaan diri",
        score: 0,
      },
      {
        label: "B",
        text: "Campuran personal goal & influence luar",
        score: 1,
      },
      {
        label: "C",
        text: "Biar makin pede di depan doi",
        score: 4,
      },
      {
        label: "D",
        text: "Spesifik biar doi makin notice lo",
        score: 6,
      },
      { label: "E", text: 'Demi "pantes" sama doi', score: 8 },
      {
        label: "F",
        text: 'Demi jadi versi yang doi "approve" 100%, walau lo sendiri gak nyaman',
        score: 10,
      },
    ],
  },
  {
    id: 35,
    question:
      "Lo nemu kesempatan kerja/kuliah bagus tapi lokasinya jauh dari doi. Pilihan lo?",
    options: [
      {
        label: "A",
        text: "Ambil aja, karir/diri sendiri prioritas",
        score: 0,
      },
      {
        label: "B",
        text: "Pertimbangin matang-matang dulu",
        score: 2,
      },
      {
        label: "C",
        text: "Mulai ragu karena jauh dari doi",
        score: 5,
      },
      {
        label: "D",
        text: "Cari cara biar tetep deket doi walau gimanapun",
        score: 7,
      },
      {
        label: "E",
        text: "Tolak kesempatan demi gak jauh dari doi",
        score: 9,
      },
      {
        label: "F",
        text: "Gak usah dipikir, otomatis tolak demi doi",
        score: 10,
      },
    ],
  },
  {
    id: 36,
    question:
      'Berapa kali lo refresh/reload chat doi kalo dia "online" tapi gak bales?',
    options: [
      { label: "A", text: "Gak pernah refresh-refresh", score: 0 },
      { label: "B", text: "Sesekali doang", score: 2 },
      { label: "C", text: "Beberapa kali", score: 4 },
      { label: "D", text: "Tiap semenit sekali", score: 6 },
      {
        label: "E",
        text: "Sampe nyaris bikin app crash",
        score: 8,
      },
      {
        label: "F",
        text: "HP lo panas gara-gara refresh terus tanpa henti",
        score: 10,
      },
    ],
  },
  {
    id: 37,
    question:
      "Lo lagi denger orang curhat soal hubungan toxic. Reaksi spontan lo?",
    options: [
      {
        label: "A",
        text: 'Kasih saran objektif "lo harus pergi"',
        score: 0,
      },
      {
        label: "B",
        text: "Empati tapi tetep kasih perspektif jujur",
        score: 1,
      },
      {
        label: "C",
        text: "Diem-diem relate dikit sama situasi sendiri",
        score: 5,
      },
      {
        label: "D",
        text: '"Tapi situasi gua beda kok"',
        score: 7,
      },
      {
        label: "E",
        text: 'Bandingin sama "untungnya doi gak separah itu"',
        score: 8,
      },
      {
        label: "F",
        text: "Justru jadi defend pola serupa yang ada di hubungan lo sendiri",
        score: 10,
      },
    ],
  },
  {
    id: 38,
    question:
      "Gimana sikap lo soal rencana liburan/akhir pekan tanpa doi sama sekali?",
    options: [
      { label: "A", text: "Sering banget, normal aja", score: 0 },
      { label: "B", text: "Kadang-kadang, gak masalah", score: 1 },
      {
        label: "C",
        text: "Bisa, tapi kepikiran doi terus",
        score: 4,
      },
      {
        label: "D",
        text: "Susah niat kalo doi gak ikut",
        score: 6,
      },
      {
        label: "E",
        text: "Selalu cari cara biar doi diajak",
        score: 8,
      },
      {
        label: "F",
        text: "Gak pernah bisa, harus ada doi baru rencana jadi",
        score: 10,
      },
    ],
  },
  {
    id: 39,
    question:
      "Sebutkan jumlah alarm/reminder yang lo set yang berhubungan langsung sama doi (chat pagi, kabarin, dll):",
    options: [
      { label: "A", text: "Nol, gak pernah set kayak gitu", score: 0 },
      {
        label: "B",
        text: "Cuma buat hal penting doang (ultah misalnya)",
        score: 1,
      },
      { label: "C", text: "Satu dua reminder kecil", score: 4 },
      { label: "D", text: "Reminder harian standar", score: 6 },
      {
        label: "E",
        text: "Banyak, hampir tiap jam ada",
        score: 8,
      },
      {
        label: "F",
        text: "Alarm lo isinya 90% reminder soal doi semua",
        score: 10,
      },
    ],
  },
  {
    id: 40,
    question:
      "Kalo disuruh pilih: 1 hari tanpa internet ATAU 1 hari tanpa kabar dari doi, lo pilih?",
    options: [
      { label: "A", text: "Tanpa kabar doi, santai aja", score: 0 },
      {
        label: "B",
        text: "Lebih milih internet, doi nomor dua",
        score: 1,
      },
      { label: "C", text: "Mikir lama banget buat milih", score: 4 },
      {
        label: "D",
        text: "Susah pilih, dua-duanya berat",
        score: 6,
      },
      {
        label: "E",
        text: "Pilih tanpa internet asal masih bisa kontak doi",
        score: 8,
      },
      {
        label: "F",
        text: "Gak usah ditanya, internet jelas lebih rela dikorbanin",
        score: 10,
      },
    ],
  },
];

export const MAX_POSSIBLE_SCORE = QUIZ_QUESTIONS.length * 10; // 400
