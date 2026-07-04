export type QuizOption = {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
  score: number;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Seberapa sering lo nge-stalk profil doi padahal udah tau isinya dari luar kepala?',
    options: [
      { label: 'A', text: 'Gak pernah. Buat apa?', score: 1 },
      { label: 'B', text: 'Sekali-kali kalo lagi iseng', score: 3 },
      { label: 'C', text: 'Lumayan sering, tapi langsung tutup biar gak keliatan', score: 5 },
      { label: 'D', text: 'Hampir tiap hari, udah kayak rutinitas pagi', score: 8 },
      { label: 'E', text: 'Tiap jam. Gua hapal urutannya sampai foto jadul 2016', score: 10 },
    ],
  },
  {
    id: 2,
    question: 'Kalau doi slow respon, lo biasanya ngapain?',
    options: [
      { label: 'A', text: 'Lanjut aktivitas, bales ya bales', score: 1 },
      { label: 'B', text: 'Ngecek HP tiap 10 menit', score: 3 },
      { label: 'C', text: 'Buka chat berkali-kali sambil liatin \'last seen\'', score: 5 },
      { label: 'D', text: 'Ngirim chat follow-up biar keliatan ada', score: 7 },
      { label: 'E', text: 'Spam chat, cek semua sosmed dia, sambil udah dramain skenario terburuk di kepala', score: 10 },
    ],
  },
  {
    id: 3,
    question: 'Pernah gak bikin skenario jadian sama doi di kepala padahal kalian belom ngobrol pun?',
    options: [
      { label: 'A', text: 'Gak pernah, terlalu lebay', score: 1 },
      { label: 'B', text: 'Pernah sekali, tapi langsung sadar diri', score: 3 },
      { label: 'C', text: 'Sering, dan skenarionya makin detail tiap hari', score: 6 },
      { label: 'D', text: 'Udah sampe nikah, punya anak, dan nama-namanya juga udah dipilihin', score: 9 },
      { label: 'E', text: 'Gua udah tau kita jodoh. Doi yang belom sadar aja', score: 10 },
    ],
  },
  {
    id: 4,
    question: 'Seberapa cepat lo buka story doi setelah upload?',
    options: [
      { label: 'A', text: 'Gak sengaja lihat ya udah, gak sengaja gak lihat ya gak kenapa', score: 1 },
      { label: 'B', text: 'Buka kalau ada waktu luang', score: 3 },
      { label: 'C', text: 'Dalam 15 menit pertama', score: 6 },
      { label: 'D', text: 'Notif muncul = langsung buka, apapun yang lagi gua lakuin', score: 8 },
      { label: 'E', text: 'Gua pantau terus biar jadi viewer pertama. Tiap hari. Konsisten.', score: 10 },
    ],
  },
  {
    id: 5,
    question: 'Pernah gak sengaja post story atau caption galau biar dinotice doi?',
    options: [
      { label: 'A', text: 'Gak pernah, terlalu cringe', score: 1 },
      { label: 'B', text: 'Pernah, tapi bilangnya \'kebetulan\'', score: 4 },
      { label: 'C', text: 'Iya, dan gua ngitung berapa lama sebelum dia reaksi', score: 6 },
      { label: 'D', text: 'Tiap ada drama sama doi, story gua langsung update', score: 8 },
      { label: 'E', text: 'Story dan caption gua literally dirancang khusus buat dia baca dan mikir', score: 10 },
    ],
  },
  {
    id: 6,
    question: 'Jam berapa biasanya lo terakhir buka HP karena nungguin chat doi sebelum tidur?',
    options: [
      { label: 'A', text: 'HP langsung masuk laci jam 9 malem, cukup', score: 1 },
      { label: 'B', text: 'Jam 11-an, masih wajar lah', score: 4 },
      { label: 'C', text: 'Jam 1 pagi, sambil pura-pura mau tidur tapi tetep pantau', score: 6 },
      { label: 'D', text: 'Sampai subuh kalo perlu, siapa yang bisa tidur?', score: 9 },
      { label: 'E', text: 'Tidur? Lo kira gua bisa tidur tanpa goodnight dari dia?', score: 10 },
    ],
  },
  {
    id: 7,
    question: 'Seberapa besar kemungkinan lo masih simpan chat lama kalian dan dibaca ulang?',
    options: [
      { label: 'A', text: 'Chat lama gua hapus, kalo udah lewat ya udah lewat', score: 1 },
      { label: 'B', text: 'Masih ada sih, tapi gak pernah dibuka', score: 3 },
      { label: 'C', text: 'Masih ada dan sesekali terbaca waktu gabut', score: 5 },
      { label: 'D', text: 'Dibaca ulang pas lagi kangen atau overthink', score: 8 },
      { label: 'E', text: 'Gua screenshot semua, backup di cloud, dan punya folder khusus', score: 10 },
    ],
  },
  {
    id: 8,
    question: 'Reaksi lo kalau doi tiba-tiba gak update apapun seharian?',
    options: [
      { label: 'A', text: 'Gak notice sama sekali', score: 1 },
      { label: 'B', text: 'Notice, tapi gak kenapa-kenapa', score: 3 },
      { label: 'C', text: 'Kepikiran sedikit, tapi masih bisa fokus aktivitas', score: 5 },
      { label: 'D', text: 'Gelisah dan mulai kirim chat \'lo baik-baik aja?\'', score: 7 },
      { label: 'E', text: 'Panik, cek semua platform, udah siap nelpon semua kontak dia', score: 10 },
    ],
  },
  {
    id: 9,
    question: 'Pernah gak lo silent treatment doi padahal yang salah lo sendiri?',
    options: [
      { label: 'A', text: 'Gak pernah, kalo salah langsung minta maaf', score: 1 },
      { label: 'B', text: 'Jarang, dan kalo pun iya gua sadar itu salah', score: 3 },
      { label: 'C', text: 'Beberapa kali, gengsi duluan sih', score: 5 },
      { label: 'D', text: 'Sering, sambil nungguin dia yang duluan minta maaf', score: 8 },
      { label: 'E', text: 'Silent treatment itu senjata utama gua dan gua bangga', score: 10 },
    ],
  },
  {
    id: 10,
    question: 'Kalau doi berubah gaya chat-nya tiba-tiba jadi lebih singkat, lo langsung mikir apa?',
    options: [
      { label: 'A', text: 'Mungkin dia lagi sibuk, biasa aja', score: 1 },
      { label: 'B', text: 'Sedikit kepikiran, tapi gak dilebay-lebayin', score: 3 },
      { label: 'C', text: 'Mulai analisis tone-nya, ada yang berubah nih', score: 5 },
      { label: 'D', text: 'Langsung minta kejelasan karena gak bisa tenang', score: 8 },
      { label: 'E', text: '\'Dia selingkuh\' adalah kesimpulan default gua sebelum ada bukti sebaliknya', score: 10 },
    ],
  },
  {
    id: 11,
    question: 'Seberapa ahli lo membaca \'kode\' doi yang sebenernya mungkin cuma ada di otak lo?',
    options: [
      { label: 'A', text: 'Gak pernah baca kode, kalau mau bilang ya bilang langsung', score: 1 },
      { label: 'B', text: 'Kadang kepikiran, tapi langsung dilepas', score: 3 },
      { label: 'C', text: 'Sering analisis dan kadang bener, kadang salah kaprah', score: 6 },
      { label: 'D', text: 'Gua udah level dosen semiotika kode doi', score: 8 },
      { label: 'E', text: 'Gua bisa nulis skripsi tentang arti emoji dari doi', score: 10 },
    ],
  },
  {
    id: 12,
    question: 'Reaksi lo kalau lihat doi like foto orang lain yang cukup menarik?',
    options: [
      { label: 'A', text: 'Biasa aja, itu hak dia', score: 1 },
      { label: 'B', text: 'Notice, tapi langsung move on', score: 3 },
      { label: 'C', text: 'Kepikiran sebentar, stalking profil yang di-like bentar', score: 5 },
      { label: 'D', text: 'Nge-stalk dalam dan mulai bandingin diri sendiri', score: 8 },
      { label: 'E', text: 'Udah siap deklarasi perang dunia ketiga, dikubur dalam-dalam', score: 10 },
    ],
  },
  {
    id: 13,
    question: 'Kalau doi balas chat cuma \'wkwkwk\', lo nangkepnya gimana?',
    options: [
      { label: 'A', text: 'Dia ngerasa lucu, done', score: 1 },
      { label: 'B', text: 'Oke, gua lanjut topik lain', score: 3 },
      { label: 'C', text: 'Mulai mikir: \'Dia bosen gak sama gua?\'', score: 5 },
      { label: 'D', text: 'Analisis panjangnya wkwk: cold atau warm tergantung jumlah huruf', score: 8 },
      { label: 'E', text: 'Gua screenshot dan minta 5 teman bantu analisis maknanya', score: 10 },
    ],
  },
  {
    id: 14,
    question: 'Pas lagi bareng doi, seberapa sering lo mikirin \'nanti kalau dia ninggalin gue gimana?\'',
    options: [
      { label: 'A', text: 'Gak pernah, nikmatin aja momennya', score: 1 },
      { label: 'B', text: 'Pernah kepikir, tapi langsung buang jauh-jauh', score: 3 },
      { label: 'C', text: 'Sesekali muncul, tapi masih bisa dikontrol', score: 5 },
      { label: 'D', text: 'Hampir selalu ada di background pikiran gua', score: 8 },
      { label: 'E', text: 'Gua udah plan A sampai Z buat skenario dia ninggalin gua', score: 10 },
    ],
  },
  {
    id: 15,
    question: 'Pernah gak lo pura-pura sibuk padahal lagi nunggu dia chat duluan?',
    options: [
      { label: 'A', text: 'Gak pernah, kalo mau ngobrol ya ngobrol aja', score: 1 },
      { label: 'B', text: 'Jarang, tapi pernah demi gengsi', score: 3 },
      { label: 'C', text: 'Lumayan sering, strategi \'playing hard to get\'', score: 6 },
      { label: 'D', text: 'Hampir tiap kali, sambil refresh chat setiap 30 detik', score: 8 },
      { label: 'E', text: 'Gua bahkan atur \'last seen\' biar keliatan baru online', score: 10 },
    ],
  },
  {
    id: 16,
    question: 'Seberapa detail lo hafal rutinitas harian doi dari hasil stalking?',
    options: [
      { label: 'A', text: 'Gak tau dan gak mau tau, itu urusan dia', score: 1 },
      { label: 'B', text: 'Tau garis besarnya, tapi gak detail-detail amat', score: 4 },
      { label: 'C', text: 'Tau jam biasanya dia online dan tempat yang sering dikunjungin', score: 6 },
      { label: 'D', text: 'Tau jadwal harian dia lebih detail dari jadwal sendiri', score: 8 },
      { label: 'E', text: 'Gua bisa nulis biografi singkat doi tanpa pernah ngobrol langsung', score: 10 },
    ],
  },
  {
    id: 17,
    question: 'Kalau doi mention nama orang yang lo gak kenal, reaksi lo?',
    options: [
      { label: 'A', text: 'Angguk-angguk, gak ada urusan gua', score: 1 },
      { label: 'B', text: 'Penasaran dikit, tapi gak sampai nanya lebih jauh', score: 3 },
      { label: 'C', text: 'Langsung stalking nama itu di sosmed setelah ngobrol selesai', score: 6 },
      { label: 'D', text: 'Nge-stalk dalam, lihat foto bareng doi, dan mulai khawatir', score: 8 },
      { label: 'E', text: 'Gua udah bisa bikin peta hubungan sosial doi sampai teman SMP-nya', score: 10 },
    ],
  },
  {
    id: 18,
    question: 'Pernah gak lo skip rencana penting demi ada waktu buat doi?',
    options: [
      { label: 'A', text: 'Gak pernah, rencana ya rencana', score: 1 },
      { label: 'B', text: 'Pernah sekali dan langsung nyesal', score: 3 },
      { label: 'C', text: 'Beberapa kali, tapi masih milih-milih mana yang dikorbanin', score: 5 },
      { label: 'D', text: 'Sering, dan doi jadi prioritas utama otomatis', score: 8 },
      { label: 'E', text: 'Agenda gua basically diatur ulang sesuai availability doi', score: 10 },
    ],
  },
  {
    id: 19,
    question: 'Seberapa sering lo screenshot chat kalian buat ditunjukin ke teman curhat?',
    options: [
      { label: 'A', text: 'Gak pernah, itu privasi', score: 1 },
      { label: 'B', text: 'Pernah, waktu ada yang beneran ambigu', score: 3 },
      { label: 'C', text: 'Lumayan sering, buat minta second opinion', score: 5 },
      { label: 'D', text: 'Hampir tiap ada chat \'penting\', langsung dishare ke grup curhat', score: 8 },
      { label: 'E', text: 'Teman-teman gua udah hafal nama doi karena sering gua ceritain', score: 10 },
    ],
  },
  {
    id: 20,
    question: 'Pernah gak lo ghosting orang yang nge-PDKT ke lo karena fokus ke doi?',
    options: [
      { label: 'A', text: 'Gak pernah, semua orang tetap gua hargai', score: 1 },
      { label: 'B', text: 'Pernah, tapi gua jelasin dulu alasannya', score: 3 },
      { label: 'C', text: 'Beberapa kali ghosting halus, maaf ya', score: 5 },
      { label: 'D', text: 'Sering, karena radar gua cuma nyala buat satu orang', score: 8 },
      { label: 'E', text: 'Berapa pun yang nge-PDKT, gua gak notice karena otak gua cuma isi satu nama', score: 10 },
    ],
  },
  {
    id: 21,
    question: 'Seberapa jauh lo pernah ngorek masa lalu doi di sosmed?',
    options: [
      { label: 'A', text: 'Gak pernah, masa lalu dia bukan urusan gua', score: 1 },
      { label: 'B', text: 'Sampai setahun ke belakang, gak lebih', score: 4 },
      { label: 'C', text: 'Sampai foto 3-4 tahun lalu, scroll sambil nahan napas', score: 6 },
      { label: 'D', text: 'Sampai foto 2016, dan gua tau nama mantannya', score: 8 },
      { label: 'E', text: 'Gua udah sampai awal akun dibuat. Forensik digital level dewa', score: 10 },
    ],
  },
  {
    id: 22,
    question: 'Pernah gak lo cemburu sama teman deket doi padahal mereka udah temenan lama sebelum lo kenal?',
    options: [
      { label: 'A', text: 'Gak pernah, bukan hak gua juga', score: 1 },
      { label: 'B', text: 'Pernah sedikit, tapi langsung rasional lagi', score: 3 },
      { label: 'C', text: 'Lumayan sering, apalagi kalau mereka ketemu terus', score: 6 },
      { label: 'D', text: 'Cemburu banget dan gua sering nanya doi soal mereka', score: 8 },
      { label: 'E', text: 'Teman deket doi = ancaman. Semua dicurigai sampai terbukti gak bahaya', score: 10 },
    ],
  },
  {
    id: 23,
    question: 'Kalau doi bilang \'kita temenan aja\', lo bakal ngapain?',
    options: [
      { label: 'A', text: 'Oke, respect keputusannya dan move on', score: 1 },
      { label: 'B', text: 'Sedih dulu, tapi akhirnya menerima', score: 4 },
      { label: 'C', text: 'Tetap stay dekat sambil harap-harap dia berubah pikiran', score: 6 },
      { label: 'D', text: 'Jadi teman tapi terus cari celah buat lebih dari teman', score: 8 },
      { label: 'E', text: 'Friendzone bukan akhir. Ini cuma babak awal strategi panjang gua', score: 10 },
    ],
  },
  {
    id: 24,
    question: 'Seberapa rela lo nurunin standar hidup atau value pribadi demi doi?',
    options: [
      { label: 'A', text: 'Gak bakal pernah, standar gua ada alasannya', score: 1 },
      { label: 'B', text: 'Sedikit kompromi mungkin, tapi ada batasnya', score: 4 },
      { label: 'C', text: 'Beberapa value gua udah bergeser tanpa gua sadar', score: 6 },
      { label: 'D', text: 'Banyak yang gua korbanin, tapi gua bilang \'ini namanya cinta\'', score: 8 },
      { label: 'E', text: 'Standar? Gua udah nge-reset semua demi dia', score: 10 },
    ],
  },
  {
    id: 25,
    question: 'Pernah gak lo sengaja cari spot yang sama kayak di story doi biar bisa \'kebetulan\' keliatan relate?',
    options: [
      { label: 'A', text: 'Gak pernah, terlalu jauh itu', score: 1 },
      { label: 'B', text: 'Gak sampe situ, tapi mungkin ikut-ikutan seleranya', score: 3 },
      { label: 'C', text: 'Pernah sekali dua kali biar ada bahan obrolan', score: 6 },
      { label: 'D', text: 'Lumayan sering, gua anggap itu cara kenalan yang alami', score: 8 },
      { label: 'E', text: 'Gua literally mapping lokasi favorit doi buat koordinasi \'kebetulan\' ketemu', score: 10 },
    ],
  },
  {
    id: 26,
    question: 'Seberapa sering lo berubah selera (musik, film, makanan) karena ngikutin doi?',
    options: [
      { label: 'A', text: 'Gak pernah. Selera gua ya selera gua', score: 1 },
      { label: 'B', text: 'Pernah nyoba hal yang dia suka, tapi tetap jadi diri sendiri', score: 3 },
      { label: 'C', text: 'Playlist gua udah 70% berisi lagu yang doi suka', score: 5 },
      { label: 'D', text: 'Gua otomatis adopt taste dia dalam banyak hal tanpa sadar', score: 8 },
      { label: 'E', text: 'Gua udah jadi versi diri sendiri yang dirancang untuk cocok sama doi', score: 10 },
    ],
  },
  {
    id: 27,
    question: 'Pernah gak lo bela doi mati-matian padahal dalam hati tau dia yang salah?',
    options: [
      { label: 'A', text: 'Gak pernah, salah ya salah', score: 1 },
      { label: 'B', text: 'Pernah sekali, tapi akhirnya tetap jujur', score: 3 },
      { label: 'C', text: 'Beberapa kali, gengsi kalo doi diomongin jelek', score: 6 },
      { label: 'D', text: 'Hampir selalu bela, rasanya sakit kalau doi dikritikin', score: 8 },
      { label: 'E', text: 'Doi salah? Gak mungkin. Yang salah pasti situasinya', score: 10 },
    ],
  },
  {
    id: 28,
    question: 'Kalau doi online tapi gak bales chat lo, lo ngapain?',
    options: [
      { label: 'A', text: 'Santai, mungkin dia lagi ada urusan', score: 1 },
      { label: 'B', text: 'Kepikiran sedikit tapi bisa lanjut aktivitas', score: 3 },
      { label: 'C', text: 'Bolak-balik buka chat sambil nunggu centang dua biru', score: 6 },
      { label: 'D', text: 'Ngirim follow-up atau emoji biar keliatan ada', score: 8 },
      { label: 'E', text: 'Panik, buka semua sosmed dia, dan nulis 3 paragraf pesan yang akhirnya gak dikirim', score: 10 },
    ],
  },
  {
    id: 29,
    question: 'Apa hal paling gak logis yang pernah lo lakuin demi dapetin perhatian doi?',
    options: [
      { label: 'A', text: 'Gak pernah lakuin hal gak logis, gua selalu wajar', score: 1 },
      { label: 'B', text: 'Pernah pake outfit yang gak nyaman biar keliatan keren', score: 4 },
      { label: 'C', text: 'Belajar hal baru yang gua gak suka karena doi suka itu', score: 6 },
      { label: 'D', text: 'Sengaja pergi ke tempat yang doi sering ke sana, berharap \'ketemu\'', score: 8 },
      { label: 'E', text: 'Kalau gua ceritain, lo bakal geleng-geleng. Tapi gua lakuin dengan bangga', score: 10 },
    ],
  },
  {
    id: 30,
    question: 'Pernah gak lo ngerasa diri sendiri kayak \'badut\' pas lagi sama atau nungguin doi?',
    options: [
      { label: 'A', text: 'Gak pernah, gua selalu percaya diri', score: 1 },
      { label: 'B', text: 'Pernah sekali, tapi cepat disadari dan diatasi', score: 3 },
      { label: 'C', text: 'Lumayan sering, dan gua cuma senyum sambil nelen pahit sendiri', score: 6 },
      { label: 'D', text: 'Hampir tiap kali, tapi gua anggap itu bagian dari cinta', score: 8 },
      { label: 'E', text: 'Gua udah install permanen karakter \'badut\' demi doi dan gua oke-oke aja', score: 10 },
    ],
  },
  {
    id: 31,
    question: 'Kalau disuruh milih: doi tiap hari vs uang 100 juta sekali seumur hidup, lo pilih?',
    options: [
      { label: 'A', text: '100 juta. Gampang, gua realistis', score: 1 },
      { label: 'B', text: '100 juta tapi sambil sedih bentar', score: 3 },
      { label: 'C', text: 'Susah juga, butuh waktu buat mikir', score: 5 },
      { label: 'D', text: 'Doi. Uang bisa dicari, dia gak bisa diganti', score: 8 },
      { label: 'E', text: 'Doi tanpa pikir panjang. Gak butuh 100 juta selama ada dia', score: 10 },
    ],
  },
  {
    id: 32,
    question: 'Pernah gak lo nangis (atau mau nangis) di kamar mandi gara-gara mikirin doi?',
    options: [
      { label: 'A', text: 'Gak pernah, gua gak lebay soal orang lain', score: 1 },
      { label: 'B', text: 'Pernah sekali waktu lagi sangat overwhelmed', score: 4 },
      { label: 'C', text: 'Beberapa kali, dan gua gak malu ngakuin', score: 6 },
      { label: 'D', text: 'Lebih dari beberapa kali, kamar mandi udah jadi tempat curhat favorit', score: 8 },
      { label: 'E', text: 'Kamar mandi gua tau lebih banyak cerita soal doi daripada siapapun', score: 10 },
    ],
  },
  {
    id: 33,
    question: 'Kalau disuruh milih antara harga diri atau doi, lo jawab jujur?',
    options: [
      { label: 'A', text: 'Harga diri, tanpa ragu', score: 1 },
      { label: 'B', text: 'Harga diri, tapi dengan sedikit drama dulu', score: 3 },
      { label: 'C', text: 'Tergantung situasi, susah dijawab universal', score: 5 },
      { label: 'D', text: 'Doi, sambil dalam hati janji \'ini terakhir kali\'', score: 8 },
      { label: 'E', text: 'Doi. Harga diri bisa dibeli balik nanti. Mungkin.', score: 10 },
    ],
  },
  {
    id: 34,
    question: 'Seberapa besar kemungkinan lo bisa move on dalam sebulan kalau doi tiba-tiba ninggalin?',
    options: [
      { label: 'A', text: 'Besar, gua percaya waktu menyembuhkan segalanya', score: 1 },
      { label: 'B', text: 'Lumayan, dengan effort keras', score: 3 },
      { label: 'C', text: 'Kecil, butuh waktu lebih dari sebulan', score: 5 },
      { label: 'D', text: 'Hampir mustahil dalam sebulan. 6 bulan mungkin', score: 8 },
      { label: 'E', text: 'Move on? Gua gak punya kamus itu kalo udah tentang dia', score: 10 },
    ],
  },
  {
    id: 35,
    question: 'Seberapa sering lo overthinking soal masa depan hubungan sama doi yang belum jelas statusnya?',
    options: [
      { label: 'A', text: 'Gak pernah, belom ada yang perlu dipikirin', score: 1 },
      { label: 'B', text: 'Sesekali, tapi langsung gua stop', score: 3 },
      { label: 'C', text: 'Cukup sering, skenario baik dan buruk sama-sama dipikirin', score: 6 },
      { label: 'D', text: 'Hampir tiap hari, dan sering bikin susah tidur', score: 8 },
      { label: 'E', text: 'Gua udah overlive 47 skenario masa depan kita, semua endingnya gua hapal', score: 10 },
    ],
  },
  {
    id: 36,
    question: 'Apa yang bakal lo lakuin kalau tau doi sebenernya gak suka lo balik?',
    options: [
      { label: 'A', text: 'Terima, dan fokus ke hal lain yang bikin gua happy', score: 1 },
      { label: 'B', text: 'Sedih dulu, tapi akhirnya let go', score: 3 },
      { label: 'C', text: 'Butuh waktu lama tapi akhirnya bisa menerima', score: 5 },
      { label: 'D', text: 'Tetap ada di dekat dia sambil harap-harap dia berubah pikiran', score: 8 },
      { label: 'E', text: 'Gak percaya itu fakta final. Pasti ada cara. Gua akan cari', score: 10 },
    ],
  },
  {
    id: 37,
    question: 'Pernah gak lo ngerasa dunia hampa banget kalau sehari aja gak ada kabar dari doi?',
    options: [
      { label: 'A', text: 'Gak pernah, hari gua penuh tanpa bergantung sama siapapun', score: 1 },
      { label: 'B', text: 'Sedikit kurang enak, tapi hari tetap berjalan normal', score: 3 },
      { label: 'C', text: 'Mood gua langsung turun, meski masih bisa fungsi', score: 5 },
      { label: 'D', text: 'Hampa banget, dan gua jadi kurang produktif seharian', score: 8 },
      { label: 'E', text: 'Dunia literally berhenti berputar kalau dia gak ngasih kabar. Ini bukan lebay', score: 10 },
    ],
  },
  {
    id: 38,
    question: 'Kalau bisa dapet jawaban jujur dari doi soal perasaannya ke lo, lo milih tau atau gak?',
    options: [
      { label: 'A', text: 'Mau tau, apapun jawabannya gua siap', score: 1 },
      { label: 'B', text: 'Mau tau, tapi minta waktu sehari buat mental prep dulu', score: 3 },
      { label: 'C', text: 'Mau tau tapi takut, butuh dukungan teman dulu', score: 5 },
      { label: 'D', text: 'Gak yakin mau tau, kalau jawabannya buruk bisa chaos', score: 8 },
      { label: 'E', text: 'Gak mau tau. Selama belum ada jawaban, harapan masih ada', score: 10 },
    ],
  },
  {
    id: 39,
    question: 'Seberapa yakin lo kalau lo adalah \'the one\' buat doi, meskipun belum ada konfirmasi?',
    options: [
      { label: 'A', text: 'Gak yakin sama sekali, itu bukan gua yang nentuin', score: 1 },
      { label: 'B', text: 'Ada harapan, tapi gua realistis', score: 3 },
      { label: 'C', text: 'Cukup yakin, dan itu yang bikin gua semangat', score: 5 },
      { label: 'D', text: 'Sangat yakin, gua tinggal nunggu dia sadar aja', score: 8 },
      { label: 'E', text: '100% yakin. Alam semesta juga pasti setuju. Tinggal nunggu timing yang tepat', score: 10 },
    ],
  },
  {
    id: 40,
    question: 'Di penghujung kuis ini — satu kata yang paling jujur menggambarkan kondisi hati lo sekarang soal doi?',
    options: [
      { label: 'A', text: '\'Bebas\' — gua gak terlalu terikat sama siapapun sekarang', score: 1 },
      { label: 'B', text: '\'Penasaran\' — ada tertarik, tapi masih bisa santai', score: 4 },
      { label: 'C', text: '\'Campur aduk\' — seneng tapi juga khawatir', score: 6 },
      { label: 'D', text: '\'Tergantung\' — mood gua terlalu dipengaruhi sama dia', score: 8 },
      { label: 'E', text: '\'Habis\' — gua udah all-in dan gua gak tau ini sehat atau gak', score: 10 },
    ],
  },
];

export const MAX_POSSIBLE_SCORE = QUIZ_QUESTIONS.length * 10;
