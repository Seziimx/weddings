window.lang = "kz";

const translations = {
  kz: {
    title: "Айдар & Гүлсезім — Тойға шақыру",
        hero_titles: "ТОЙҒА ШАҚЫРУ",
    hero_title: "Айдар & Гүлсезім",
    hero_date: "05.09.2025",
    hero_place: "Шаңырақ көтеру тойына шақырамыз!",
    hero_map: "📍 Локацияны көру",
    invitation_title: "Құрметті қонақтар,",
    invitation_names: "Айдар & Гүлсезім",
    invitation_date: "05.09.2025",
    invitation_subtitle: "Шаңырақ көтеру тойына шақырамыз!",
    invitation_text: "Сіздерді ұлымыз <strong>Айдар</strong> мен келініміз <strong>Гүлсезімнің</strong> үйлену тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
    invitation_poem: "Бақыт қонып ақ отау түндігіне,<br>Тағы да сезім нұры күлді, міне.<br>Қол ұстасты жұбайлар салтанатпен,<br>Жарастығы сай келіп бір-біріне.",
    day_title: "Той күні:",
    day_time: "2025 жылғы 5 қыркүйек, сағат 18:00",
    address_title: "Мекен-жайымыз:",
    address_text: "Amira Grand Hall мейрамханасы, Ақтөбе қаласы",
    confirm_title: "Тойға келуіңізді растауыңызды сұраймыз:",
    form_name: "Аты-жөніңіз",
    form_phone: "Телефон нөміріңіз",
    form_question: "Тойға келесіз бе?",
    form_select: "Таңдаңыз",
    form_yes: "Ия, келемін",
    form_no: "Өкінішке орай бара алмаймын",
    form_comment: "Тілегіңіз немесе ескертпе",
    form_send: "Жіберу",
    owners_title: "ТОЙ ИЕЛЕРІ",
    owners_message: "Тойымыздың қадірлі қонағы болыңыз!",
    owners_name: "Асылхан & Алтынгүл",
      relation_question: "Кім болып келесіз?",
  relation_select: "Таңдаңыз",
  relation_zhakyn: "Жақын туыс",
  relation_nagasy: "Нағашы жұрт",
  relation_kuda: "Құда-жекжат",
  relation_ake: "Ағайын-туыс (Әкесі жағынан)",
  relation_sheshe: "Ағайын-туыс (Анасы жағынан)",
  relation_dostar_groom: "Достар (Күйеу жігіттің достары)",
  relation_dostar_bride: "Достар (Қалыңдықтың достары)",
  relation_aryp: "Әріптестер",
  relation_korshi: "Көрші-қолаң", 
    gift_label: "Қонақ кәде сомасы"
  },
  ru: {
    title: "Айдар & Гулсезим — Приглашение на свадьбу",
    hero_titles: "ПРИГЛАШЕНИЕ НА СВАДЬБУ",
    hero_title: "Айдар & Гулсезим",
    hero_date: "05.09.2025",
    hero_place: "Приглашаем отметить день создания нашей новой семьи!",
    hero_map: "📍 Посмотреть локацию",
    invitation_title: "Дорогие гости,",
    invitation_names: "Айдар & Гулсезим",
    invitation_date: "05.09.2025",
    invitation_subtitle: "Приглашаем на наш праздник!",
    invitation_text: "Приглашаем вас стать почетным гостем на торжестве нашего сына <strong>Айдара</strong> и невестки <strong>Гулсезим</strong>!",
    invitation_poem: "Счастье в дом пусть постучится,<br>Пусть любовь опять родится.<br>Руки крепко обручились —<br>Сердца в унисон сплотились.",
    day_title: "Дата свадьбы:",
    day_time: "5 сентября 2025 года, 18:00",
    address_title: "Наш адрес:",
    address_text: "Ресторан Amira Grand Hall, г. Актобе",
    confirm_title: "Пожалуйста, подтвердите ваше участие:",
    form_name: "Ваше имя",
    form_phone: "Телефон",
    form_question: "Вы придёте?",
    form_select: "Выберите",
    form_yes: "Да, приду",
    form_no: "К сожалению, не смогу",
    form_comment: "Ваше пожелание или комментарий",
    form_send: "Отправить",
    owners_title: "ОРГАНИЗАТОРЫ",
    owners_message: "Будьте почетным гостем на нашем торжестве!",
    owners_name: "Асылхан & Алтынгул", 
      relation_question: "Кем вы приходитесь?",
  relation_select: "Выберите",
  relation_zhakyn: "Близкий родственник",
  relation_nagasy: "Родня со стороны матери",
  relation_kuda: "Куда-жекжат",
  relation_ake: "Родственник со стороны отца",
  relation_sheshe: "Родственник со стороны матери",
  relation_dostar_groom: "Друзья жениха",
  relation_dostar_bride: "Друзья невесты",
  relation_aryp: "Коллеги",
  relation_korshi: "Соседи",
    gift_label: "Сумма подарка"
  }
};

function translate() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerHTML = translations[window.lang][el.getAttribute("data-i18n")];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = translations[window.lang][el.getAttribute("data-i18n-placeholder")];
  });

  const giftLabel = document.querySelector(".gift-label");
  if (giftLabel) {
    giftLabel.innerText = translations[window.lang].gift_label;
  }
}
