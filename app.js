const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60];
const STORAGE_KEY = "ebbinghaus-memory-app-v1";
const LANGUAGE_KEY = "ebbinghaus-memory-app-language";
const SUPABASE_URL = window.EBBINGHAUS_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.EBBINGHAUS_SUPABASE_ANON_KEY || "";
const HAS_SUPABASE_CONFIG = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const I18N = {
  zh: {
    htmlLang: "zh-CN",
    title: "艾宾浩斯复习日历",
    language: "语言",
    statsToday: "今日待复习",
    statsTotal: "知识条目",
    statsDone: "已完成节点",
    nav: { calendar: "日历", reviews: "复习", entry: "记录", library: "知识库" },
    localTitle: "本地保存",
    localMode: "本地模式",
    cloudReadyMode: "云端可用",
    cloudSyncMode: "云端同步",
    knowledgeBase: "知识库",
    editMode: "编辑模式",
    localDescription: "当前内容保存在这个浏览器里。配置 Supabase 后，可以登录并同步不同设备的数据。",
    cloudReady: "登录后保存到云端",
    cloudReadyDescription: "请登录或注册账号。每个用户只能看到自己的学习内容。",
    cloudSync: "云端同步已开启",
    cloudSyncDescription: "当前知识和复习状态会保存到云数据库，并且只属于这个账号。",
    emailPlaceholder: "邮箱",
    passwordPlaceholder: "密码，至少 6 位",
    signIn: "登录",
    signUp: "注册",
    signOut: "退出登录",
    weekdays: ["一", "二", "三", "四", "五", "六", "日"],
    prevMonth: "上个月",
    nextMonth: "下个月",
    selectedDay: "Selected Day",
    selectedReviewTitle: "{date} 复习",
    jumpToday: "回到今天",
    newMemory: "记录新知识",
    entryTitle: "记录学习内容",
    editTitle: "编辑学习内容",
    entryDescription: "输入学习日期、类别和知识点，系统会自动生成复习节点。",
    editDescription: "修改学习日期、类别、知识点或备注。已有复习完成记录会保留。",
    learnDate: "学习日期",
    category: "类别",
    topic: "知识点",
    note: "备注",
    categoryPlaceholder: "例如：英语、数学、产品设计",
    topicPlaceholder: "例如：过去完成时、导数定义",
    notePlaceholder: "可写关键词、链接、例题编号等",
    addSubmit: "添加到复习计划",
    saveEdit: "保存修改",
    cancelEdit: "取消编辑",
    intervalTitle: "默认复习间隔",
    intervalDay: "{day} 天后",
    libraryTitle: "全部知识",
    clearAll: "清空数据",
    search: "搜索",
    searchPlaceholder: "搜索类别、知识点或备注",
    filter: "分类",
    sort: "排序",
    allCategories: "全部分类",
    sortNewest: "最新记录",
    sortLearnDesc: "学习日期近到远",
    sortLearnAsc: "学习日期远到近",
    sortCategory: "按分类",
    resultSummary: "筛选结果 {total} 条，每页 {pageSize} 条",
    pageInfo: "第 {page} / {totalPages} 页",
    prevPage: "上一页",
    nextPage: "下一页",
    emptyReviewTitle: "这一天没有复习任务",
    emptyReviewBody: "可以选择其他日期，或添加新的知识点。",
    emptyMemoryTitle: "还没有知识条目",
    emptyMemoryBody: "从上方表单添加第一条内容，日历会自动排期。",
    noMatchTitle: "没有匹配的知识条目",
    noMatchBody: "换一个关键词或分类筛选试试。",
    reviewCount: "{count} 项",
    calendarAria: "{date}，{count} 个复习任务",
    learnedOn: "学习于 {date}",
    learnDateMeta: "学习日期 {date}",
    reviewStage: "第 {day} 天复习",
    done: "已完成",
    markDone: "标记完成",
    edit: "编辑",
    delete: "删除",
    timelineDay: "{day}天 {date}",
    confirmClear: "确定清空全部知识和复习记录吗？",
    signInFirstSave: "请先登录，再保存到云端。",
    signInFirstEdit: "请先登录，再保存修改。",
    enterEmailPassword: "请输入邮箱和密码。",
    enterEmailPassword6: "请输入邮箱，密码至少 6 位。",
    signUpSuccess: "注册成功。如果 Supabase 开启了邮箱确认，请先到邮箱完成确认。",
    readCloudFail: "读取云端数据失败：{message}",
    saveFail: "保存失败：{message}",
    updateFail: "更新失败：{message}",
    editFail: "保存修改失败：{message}",
    clearFail: "清空失败：{message}",
    deleteFail: "删除失败：{message}",
    signInFail: "登录失败：{message}",
    signUpFail: "注册失败：{message}",
    signOutFail: "退出失败：{message}",
    seedCategoryEnglish: "英语",
    seedTopicEnglish: "虚拟语气 if only",
    seedNoteEnglish: "整理 3 个例句，复习时自己造句。",
    seedCategoryDesign: "产品设计",
    seedTopicDesign: "用户旅程地图",
    seedNoteDesign: "重点看触点、情绪曲线和机会点。",
  },
  ja: {
    htmlLang: "ja",
    title: "エビングハウス復習カレンダー",
    language: "言語",
    statsToday: "今日の復習",
    statsTotal: "知識項目",
    statsDone: "完了ノード",
    nav: { calendar: "カレンダー", reviews: "復習", entry: "記録", library: "知識庫" },
    localTitle: "ローカル保存",
    localMode: "ローカルモード",
    cloudReadyMode: "クラウド準備完了",
    cloudSyncMode: "クラウド同期",
    knowledgeBase: "知識庫",
    editMode: "編集モード",
    localDescription: "内容はこのブラウザに保存されます。Supabase を設定すると、ログインして複数端末で同期できます。",
    cloudReady: "ログインしてクラウド保存",
    cloudReadyDescription: "ログインまたは登録してください。各ユーザーは自分の学習内容だけを見られます。",
    cloudSync: "クラウド同期中",
    cloudSyncDescription: "知識と復習状態はクラウド DB に保存され、このアカウントだけに紐づきます。",
    emailPlaceholder: "メールアドレス",
    passwordPlaceholder: "パスワード（6文字以上）",
    signIn: "ログイン",
    signUp: "登録",
    signOut: "ログアウト",
    weekdays: ["月", "火", "水", "木", "金", "土", "日"],
    prevMonth: "前月",
    nextMonth: "翌月",
    selectedDay: "選択日",
    selectedReviewTitle: "{date} の復習",
    jumpToday: "今日へ",
    newMemory: "新規記録",
    entryTitle: "学習内容を記録",
    editTitle: "学習内容を編集",
    entryDescription: "学習日、分類、知識項目を入力すると、復習スケジュールを自動生成します。",
    editDescription: "学習日、分類、知識項目、メモを変更できます。完了済みの復習記録は保持されます。",
    learnDate: "学習日",
    category: "分類",
    topic: "知識項目",
    note: "メモ",
    categoryPlaceholder: "例：英語、数学、プロダクト設計",
    topicPlaceholder: "例：過去完了形、導関数の定義",
    notePlaceholder: "キーワード、リンク、問題番号など",
    addSubmit: "復習計画に追加",
    saveEdit: "変更を保存",
    cancelEdit: "編集を取消",
    intervalTitle: "既定の復習間隔",
    intervalDay: "{day}日後",
    libraryTitle: "すべての知識",
    clearAll: "全データ削除",
    search: "検索",
    searchPlaceholder: "分類、知識項目、メモを検索",
    filter: "分類",
    sort: "並び替え",
    allCategories: "すべての分類",
    sortNewest: "新しい記録",
    sortLearnDesc: "学習日 新しい順",
    sortLearnAsc: "学習日 古い順",
    sortCategory: "分類順",
    resultSummary: "検索結果 {total} 件、1ページ {pageSize} 件",
    pageInfo: "{page} / {totalPages} ページ",
    prevPage: "前へ",
    nextPage: "次へ",
    emptyReviewTitle: "この日の復習はありません",
    emptyReviewBody: "別の日を選ぶか、新しい知識項目を追加してください。",
    emptyMemoryTitle: "知識項目はまだありません",
    emptyMemoryBody: "記録フォームから最初の項目を追加すると、カレンダーに自動で配置されます。",
    noMatchTitle: "一致する知識項目がありません",
    noMatchBody: "別のキーワードや分類で絞り込んでください。",
    reviewCount: "{count}件",
    calendarAria: "{date}、復習タスク {count} 件",
    learnedOn: "{date} に学習",
    learnDateMeta: "学習日 {date}",
    reviewStage: "{day}日目の復習",
    done: "完了",
    markDone: "完了にする",
    edit: "編集",
    delete: "削除",
    timelineDay: "{day}日 {date}",
    confirmClear: "すべての知識と復習記録を削除しますか？",
    signInFirstSave: "クラウドに保存するにはログインしてください。",
    signInFirstEdit: "変更を保存するにはログインしてください。",
    enterEmailPassword: "メールアドレスとパスワードを入力してください。",
    enterEmailPassword6: "メールアドレスと6文字以上のパスワードを入力してください。",
    signUpSuccess: "登録しました。Supabase でメール確認が有効な場合は、メールを確認してください。",
    readCloudFail: "クラウドデータの読み込みに失敗しました：{message}",
    saveFail: "保存に失敗しました：{message}",
    updateFail: "更新に失敗しました：{message}",
    editFail: "変更の保存に失敗しました：{message}",
    clearFail: "削除に失敗しました：{message}",
    deleteFail: "削除に失敗しました：{message}",
    signInFail: "ログインに失敗しました：{message}",
    signUpFail: "登録に失敗しました：{message}",
    signOutFail: "ログアウトに失敗しました：{message}",
    seedCategoryEnglish: "英語",
    seedTopicEnglish: "仮定法 if only",
    seedNoteEnglish: "例文を3つ整理し、復習時に自分で文を作る。",
    seedCategoryDesign: "プロダクト設計",
    seedTopicDesign: "ユーザージャーニーマップ",
    seedNoteDesign: "接点、感情曲線、機会点を重点的に見る。",
  },
  en: {
    htmlLang: "en",
    title: "Ebbinghaus Review Calendar",
    language: "Language",
    statsToday: "Due today",
    statsTotal: "Knowledge items",
    statsDone: "Completed steps",
    nav: { calendar: "Calendar", reviews: "Review", entry: "Record", library: "Library" },
    localTitle: "Local storage",
    localMode: "Local Mode",
    cloudReadyMode: "Cloud Ready",
    cloudSyncMode: "Cloud Sync",
    knowledgeBase: "Knowledge Base",
    editMode: "Edit Mode",
    localDescription: "Your content is saved in this browser. Configure Supabase to sign in and sync across devices.",
    cloudReady: "Sign in for cloud storage",
    cloudReadyDescription: "Sign in or create an account. Each user can only see their own learning content.",
    cloudSync: "Cloud sync enabled",
    cloudSyncDescription: "Your knowledge items and review status are saved to the cloud database for this account only.",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password, at least 6 characters",
    signIn: "Sign in",
    signUp: "Sign up",
    signOut: "Sign out",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    prevMonth: "Previous month",
    nextMonth: "Next month",
    selectedDay: "Selected Day",
    selectedReviewTitle: "{date} Review",
    jumpToday: "Today",
    newMemory: "Record item",
    entryTitle: "Record Learning",
    editTitle: "Edit Learning",
    entryDescription: "Enter the learning date, category, and topic. The app will generate review dates automatically.",
    editDescription: "Edit the learning date, category, topic, or note. Existing completed review records are kept.",
    learnDate: "Learning date",
    category: "Category",
    topic: "Topic",
    note: "Note",
    categoryPlaceholder: "e.g. English, Math, Product Design",
    topicPlaceholder: "e.g. Past perfect, derivative definition",
    notePlaceholder: "Keywords, links, exercise numbers, etc.",
    addSubmit: "Add to review plan",
    saveEdit: "Save changes",
    cancelEdit: "Cancel edit",
    intervalTitle: "Default review intervals",
    intervalDay: "After {day} days",
    libraryTitle: "All Knowledge",
    clearAll: "Clear all",
    search: "Search",
    searchPlaceholder: "Search category, topic, or note",
    filter: "Category",
    sort: "Sort",
    allCategories: "All categories",
    sortNewest: "Newest records",
    sortLearnDesc: "Learning date newest",
    sortLearnAsc: "Learning date oldest",
    sortCategory: "By category",
    resultSummary: "{total} results, {pageSize} per page",
    pageInfo: "Page {page} / {totalPages}",
    prevPage: "Previous",
    nextPage: "Next",
    emptyReviewTitle: "No reviews on this day",
    emptyReviewBody: "Choose another date or add a new knowledge item.",
    emptyMemoryTitle: "No knowledge items yet",
    emptyMemoryBody: "Add your first item from the record form. The calendar will schedule it automatically.",
    noMatchTitle: "No matching knowledge items",
    noMatchBody: "Try another keyword or category filter.",
    reviewCount: "{count}",
    calendarAria: "{date}, {count} review tasks",
    learnedOn: "Learned on {date}",
    learnDateMeta: "Learning date {date}",
    reviewStage: "Day {day} review",
    done: "Done",
    markDone: "Mark done",
    edit: "Edit",
    delete: "Delete",
    timelineDay: "{day}d {date}",
    confirmClear: "Clear all knowledge items and review records?",
    signInFirstSave: "Please sign in before saving to the cloud.",
    signInFirstEdit: "Please sign in before saving changes.",
    enterEmailPassword: "Please enter email and password.",
    enterEmailPassword6: "Please enter an email and a password of at least 6 characters.",
    signUpSuccess: "Sign-up succeeded. If Supabase email confirmation is enabled, please confirm your email first.",
    readCloudFail: "Failed to load cloud data: {message}",
    saveFail: "Save failed: {message}",
    updateFail: "Update failed: {message}",
    editFail: "Failed to save changes: {message}",
    clearFail: "Clear failed: {message}",
    deleteFail: "Delete failed: {message}",
    signInFail: "Sign-in failed: {message}",
    signUpFail: "Sign-up failed: {message}",
    signOutFail: "Sign-out failed: {message}",
    seedCategoryEnglish: "English",
    seedTopicEnglish: "Subjunctive: if only",
    seedNoteEnglish: "Collect 3 example sentences and make your own during review.",
    seedCategoryDesign: "Product Design",
    seedTopicDesign: "User Journey Map",
    seedNoteDesign: "Focus on touchpoints, emotion curves, and opportunity areas.",
  },
};

const state = {
  memories: [],
  supabase: null,
  user: null,
  isCloudMode: false,
  language: loadLanguage(),
  viewDate: startOfMonth(new Date()),
  selectedDate: toDateKey(new Date()),
  activePage: "calendar",
  editingId: "",
  reviewIndex: new Map(),
  library: {
    search: "",
    category: "",
    sort: "newest",
    page: 1,
    pageSize: 25,
  },
};

const els = {
  appTitle: document.querySelector("#appTitle"),
  languageLabel: document.querySelector("#languageLabel"),
  languageSelect: document.querySelector("#languageSelect"),
  form: document.querySelector("#memoryForm"),
  learnDate: document.querySelector("#learnDate"),
  category: document.querySelector("#category"),
  topic: document.querySelector("#topic"),
  note: document.querySelector("#note"),
  editModeLabel: document.querySelector("#editModeLabel"),
  entryTitle: document.querySelector("#entryTitle"),
  entryDescription: document.querySelector("#entryDescription"),
  submitMemoryButton: document.querySelector("#submitMemoryButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  intervalList: document.querySelector("#intervalList"),
  calendarGrid: document.querySelector("#calendarGrid"),
  monthTitle: document.querySelector("#monthTitle"),
  selectedDateTitle: document.querySelector("#selectedDateTitle"),
  reviewList: document.querySelector("#reviewList"),
  memoryList: document.querySelector("#memoryList"),
  prevMonth: document.querySelector("#prevMonth"),
  nextMonth: document.querySelector("#nextMonth"),
  jumpToday: document.querySelector("#jumpToday"),
  clearAll: document.querySelector("#clearAll"),
  pages: document.querySelectorAll("[data-page]"),
  navButtons: document.querySelectorAll("[data-page-target]"),
  goEntryFromReviews: document.querySelector("#goEntryFromReviews"),
  librarySearch: document.querySelector("#librarySearch"),
  categoryFilter: document.querySelector("#categoryFilter"),
  sortMode: document.querySelector("#sortMode"),
  authForm: document.querySelector("#authForm"),
  authEmail: document.querySelector("#authEmail"),
  authPassword: document.querySelector("#authPassword"),
  signInButton: document.querySelector("#signInButton"),
  signUpButton: document.querySelector("#signUpButton"),
  signOutButton: document.querySelector("#signOutButton"),
  learnDateLabel: document.querySelector("#learnDateLabel"),
  categoryLabel: document.querySelector("#categoryLabel"),
  topicLabel: document.querySelector("#topicLabel"),
  noteLabel: document.querySelector("#noteLabel"),
  intervalTitle: document.querySelector("#intervalTitle"),
  libraryTitle: document.querySelector("#libraryTitle"),
  searchLabel: document.querySelector("#searchLabel"),
  filterLabel: document.querySelector("#filterLabel"),
  sortLabel: document.querySelector("#sortLabel"),
  accountActions: document.querySelector("#accountActions"),
  accountEmail: document.querySelector("#accountEmail"),
  authTitle: document.querySelector("#authTitle"),
  authDescription: document.querySelector("#authDescription"),
  syncMode: document.querySelector("#syncMode"),
  librarySummary: document.querySelector("#librarySummary"),
  libraryPageInfo: document.querySelector("#libraryPageInfo"),
  prevLibraryPage: document.querySelector("#prevLibraryPage"),
  nextLibraryPage: document.querySelector("#nextLibraryPage"),
  todayCount: document.querySelector("#todayCount"),
  todayCountLabel: document.querySelector("#todayCountLabel"),
  totalCount: document.querySelector("#totalCount"),
  totalCountLabel: document.querySelector("#totalCountLabel"),
  doneCount: document.querySelector("#doneCount"),
  doneCountLabel: document.querySelector("#doneCountLabel"),
  emptyTemplate: document.querySelector("#emptyTemplate"),
};

async function init() {
  resetFromUrl();
  await initDataStore();
  state.activePage = getInitialPage();
  els.languageSelect.value = state.language;
  els.learnDate.value = toDateKey(new Date());

  els.form.addEventListener("submit", handleAddMemory);
  els.languageSelect.addEventListener("change", () => {
    state.language = els.languageSelect.value;
    localStorage.setItem(LANGUAGE_KEY, state.language);
    render();
  });
  els.prevMonth.addEventListener("click", () => shiftMonth(-1));
  els.nextMonth.addEventListener("click", () => shiftMonth(1));
  els.jumpToday.addEventListener("click", jumpToToday);
  els.cancelEditButton.addEventListener("click", cancelEdit);
  els.clearAll.addEventListener("click", clearAllData);
  els.goEntryFromReviews.addEventListener("click", () => setActivePage("entry"));
  els.navButtons.forEach((button) => {
    button.addEventListener("click", () => setActivePage(button.dataset.pageTarget));
  });
  els.librarySearch.addEventListener("input", () => {
    state.library.search = els.librarySearch.value.trim();
    state.library.page = 1;
    renderMemoryList();
  });
  els.categoryFilter.addEventListener("change", () => {
    state.library.category = els.categoryFilter.value;
    state.library.page = 1;
    renderMemoryList();
  });
  els.sortMode.addEventListener("change", () => {
    state.library.sort = els.sortMode.value;
    state.library.page = 1;
    renderMemoryList();
  });
  els.prevLibraryPage.addEventListener("click", () => changeLibraryPage(-1));
  els.nextLibraryPage.addEventListener("click", () => changeLibraryPage(1));
  els.signInButton.addEventListener("click", () => signIn());
  els.signUpButton.addEventListener("click", () => signUp());
  els.signOutButton.addEventListener("click", () => signOut());
  window.addEventListener("hashchange", () => {
    const nextPage = parsePageFromHash();
    if (nextPage) {
      state.activePage = nextPage;
      renderShell();
    }
  });

  render();
}

async function initDataStore() {
  if (!HAS_SUPABASE_CONFIG) {
    state.memories = loadLocalMemories();
    return;
  }

  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    state.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
    const { data } = await state.supabase.auth.getSession();
    state.user = data.session?.user || null;
    state.isCloudMode = Boolean(state.user);
    state.memories = state.user ? await loadCloudMemories() : [];
    state.supabase.auth.onAuthStateChange(async (_event, session) => {
      state.user = session?.user || null;
      state.isCloudMode = Boolean(state.user);
      state.memories = state.user ? await loadCloudMemories() : [];
      render();
    });
  } catch (error) {
    console.warn("Supabase 初始化失败，已回退到本地模式。", error);
    state.memories = loadLocalMemories();
    state.isCloudMode = false;
  }
}

function resetFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("reset")) return;
  localStorage.removeItem(STORAGE_KEY);
  window.history.replaceState({}, "", window.location.pathname);
}

function loadLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (["zh", "ja", "en"].includes(saved)) return saved;
  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith("ja")) return "ja";
  if (browserLanguage.startsWith("en")) return "en";
  return "zh";
}

function t(key, values = {}) {
  const value = I18N[state.language]?.[key] ?? I18N.zh[key] ?? key;
  if (typeof value !== "string") return value;
  return Object.entries(values).reduce((text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement), value);
}

function getInitialPage() {
  return parsePageFromHash() || "calendar";
}

function parsePageFromHash() {
  const page = window.location.hash.replace("#", "");
  return ["calendar", "reviews", "entry", "library"].includes(page) ? page : "";
}

function loadLocalMemories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedMemories();
  } catch {
    return seedMemories();
  }
}

function seedMemories() {
  const today = new Date();
  const threeDaysAgo = addDays(today, -3);
  const yesterday = addDays(today, -1);

  return [
    {
      id: createId(),
      learnDate: toDateKey(threeDaysAgo),
      category: t("seedCategoryEnglish"),
      topic: t("seedTopicEnglish"),
      note: t("seedNoteEnglish"),
      completed: {},
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      learnDate: toDateKey(yesterday),
      category: t("seedCategoryDesign"),
      topic: t("seedTopicDesign"),
      note: t("seedNoteDesign"),
      completed: {},
      createdAt: new Date().toISOString(),
    },
  ];
}

function saveLocalMemories() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.memories));
}

async function loadCloudMemories() {
  const { data, error } = await state.supabase
    .from("memories")
    .select("id, learn_date, category, topic, note, completed, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    alert(t("readCloudFail", { message: error.message }));
    return [];
  }
  return data.map(mapCloudMemory);
}

function mapCloudMemory(row) {
  return {
    id: row.id,
    learnDate: row.learn_date,
    category: row.category,
    topic: row.topic,
    note: row.note || "",
    completed: row.completed || {},
    createdAt: row.created_at,
  };
}

async function handleAddMemory(event) {
  event.preventDefault();

  if (state.editingId) {
    await updateMemoryFromForm();
    return;
  }

  const memory = getMemoryFromForm();

  if (!memory.learnDate || !memory.category || !memory.topic) return;

  if (HAS_SUPABASE_CONFIG && !state.user) {
    alert(t("signInFirstSave"));
    setActivePage("entry");
    return;
  }

  if (state.isCloudMode) {
    const { data, error } = await state.supabase
      .from("memories")
      .insert({
        learn_date: memory.learnDate,
        category: memory.category,
        topic: memory.topic,
        note: memory.note,
        completed: memory.completed,
      })
      .select("id, learn_date, category, topic, note, completed, created_at")
      .single();
    if (error) {
      alert(t("saveFail", { message: error.message }));
      return;
    }
    state.memories.unshift(mapCloudMemory(data));
  } else {
    state.memories.unshift(memory);
    saveLocalMemories();
  }

  state.selectedDate = nextReviewDate(memory);
  state.viewDate = startOfMonth(parseDateKey(state.selectedDate));
  state.activePage = "reviews";
  resetEntryForm();
  render();
}

function getMemoryFromForm() {
  return {
    id: createId(),
    learnDate: els.learnDate.value,
    category: els.category.value.trim(),
    topic: els.topic.value.trim(),
    note: els.note.value.trim(),
    completed: {},
    createdAt: new Date().toISOString(),
  };
}

async function updateMemoryFromForm() {
  const memory = state.memories.find((item) => item.id === state.editingId);
  if (!memory) {
    cancelEdit();
    return;
  }

  const nextValues = getMemoryFromForm();
  if (!nextValues.learnDate || !nextValues.category || !nextValues.topic) return;

  if (HAS_SUPABASE_CONFIG && !state.user) {
    alert(t("signInFirstEdit"));
    setActivePage("entry");
    return;
  }

  const previous = { ...memory };
  memory.learnDate = nextValues.learnDate;
  memory.category = nextValues.category;
  memory.topic = nextValues.topic;
  memory.note = nextValues.note;

  if (state.isCloudMode) {
    const { error } = await state.supabase
      .from("memories")
      .update({
        learn_date: memory.learnDate,
        category: memory.category,
        topic: memory.topic,
        note: memory.note,
      })
      .eq("id", memory.id);
    if (error) {
      Object.assign(memory, previous);
      alert(t("editFail", { message: error.message }));
      return;
    }
  } else {
    saveLocalMemories();
  }

  state.selectedDate = nextReviewDate(memory);
  state.viewDate = startOfMonth(parseDateKey(state.selectedDate));
  state.activePage = "library";
  state.editingId = "";
  resetEntryForm();
  render();
}

function shiftMonth(delta) {
  state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + delta, 1);
  render();
}

function jumpToToday() {
  const today = new Date();
  state.selectedDate = toDateKey(today);
  state.viewDate = startOfMonth(today);
  render();
}

async function clearAllData() {
  if (!state.memories.length) return;
  const confirmed = window.confirm(t("confirmClear"));
  if (!confirmed) return;
  if (state.isCloudMode) {
    const { error } = await state.supabase.from("memories").delete().eq("user_id", state.user.id);
    if (error) {
      alert(t("clearFail", { message: error.message }));
      return;
    }
  }
  state.memories = [];
  state.library.page = 1;
  if (!state.isCloudMode) saveLocalMemories();
  render();
}

function render() {
  rebuildReviewIndex();
  renderShell();
  renderStaticText();
  renderAuth();
  renderStats();
  renderEntryMode();
  renderCalendar();
  renderSelectedReviews();
  renderCategoryOptions();
  renderMemoryList();
}

function renderStaticText() {
  document.documentElement.lang = t("htmlLang");
  document.title = t("title");
  els.appTitle.textContent = t("title");
  els.languageLabel.textContent = t("language");
  els.todayCountLabel.textContent = t("statsToday");
  els.totalCountLabel.textContent = t("statsTotal");
  els.doneCountLabel.textContent = t("statsDone");
  els.navButtons.forEach((button) => {
    button.textContent = t("nav")[button.dataset.pageTarget];
  });
  els.authEmail.placeholder = t("emailPlaceholder");
  els.authPassword.placeholder = t("passwordPlaceholder");
  els.signInButton.textContent = t("signIn");
  els.signUpButton.textContent = t("signUp");
  els.signOutButton.textContent = t("signOut");
  els.prevMonth.setAttribute("aria-label", t("prevMonth"));
  els.nextMonth.setAttribute("aria-label", t("nextMonth"));
  document.querySelectorAll(".weekday-row span").forEach((span, index) => {
    span.textContent = t("weekdays")[index];
  });
  document.querySelector(".review-board .eyebrow").textContent = t("selectedDay");
  els.jumpToday.textContent = t("jumpToday");
  els.goEntryFromReviews.textContent = t("newMemory");
  els.learnDateLabel.textContent = t("learnDate");
  els.categoryLabel.textContent = t("category");
  els.topicLabel.textContent = t("topic");
  els.noteLabel.textContent = t("note");
  els.category.placeholder = t("categoryPlaceholder");
  els.topic.placeholder = t("topicPlaceholder");
  els.note.placeholder = t("notePlaceholder");
  els.intervalTitle.textContent = t("intervalTitle");
  els.intervalList.innerHTML = REVIEW_INTERVALS.map((day) => `<span>${t("intervalDay", { day })}</span>`).join("");
  els.editModeLabel.textContent = t("editMode");
  document.querySelector(".library .eyebrow").textContent = t("knowledgeBase");
  els.libraryTitle.textContent = t("libraryTitle");
  els.clearAll.textContent = t("clearAll");
  els.searchLabel.textContent = t("search");
  els.librarySearch.placeholder = t("searchPlaceholder");
  els.filterLabel.textContent = t("filter");
  els.sortLabel.textContent = t("sort");
  renderSortOptions();
  els.prevLibraryPage.textContent = t("prevPage");
  els.nextLibraryPage.textContent = t("nextPage");
}

function renderSortOptions() {
  const options = [
    ["newest", t("sortNewest")],
    ["learnDateDesc", t("sortLearnDesc")],
    ["learnDateAsc", t("sortLearnAsc")],
    ["category", t("sortCategory")],
  ];
  els.sortMode.innerHTML = options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  els.sortMode.value = state.library.sort;
}

function renderEntryMode() {
  const isEditing = Boolean(state.editingId);
  els.editModeLabel.classList.toggle("hidden", !isEditing);
  els.entryTitle.textContent = isEditing ? t("editTitle") : t("entryTitle");
  els.entryDescription.textContent = isEditing
    ? t("editDescription")
    : t("entryDescription");
  els.submitMemoryButton.textContent = isEditing ? t("saveEdit") : t("addSubmit");
  els.cancelEditButton.textContent = t("cancelEdit");
  els.cancelEditButton.classList.toggle("hidden", !isEditing);
}

function renderAuth() {
  if (!HAS_SUPABASE_CONFIG || !state.supabase) {
    els.syncMode.textContent = t("localMode");
    els.authTitle.textContent = t("localTitle");
    els.authDescription.textContent = t("localDescription");
    els.authForm.classList.add("hidden");
    els.accountActions.classList.add("hidden");
    return;
  }

  els.syncMode.textContent = state.user ? t("cloudSyncMode") : t("cloudReadyMode");
  els.authTitle.textContent = state.user ? t("cloudSync") : t("cloudReady");
  els.authDescription.textContent = state.user
    ? t("cloudSyncDescription")
    : t("cloudReadyDescription");
  els.authForm.classList.toggle("hidden", Boolean(state.user));
  els.accountActions.classList.toggle("hidden", !state.user);
  els.accountEmail.textContent = state.user?.email || "";
}

function renderShell() {
  els.pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === state.activePage);
  });
  els.navButtons.forEach((button) => {
    const isActive = button.dataset.pageTarget === state.activePage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
  if (window.location.hash !== `#${state.activePage}`) {
    window.history.replaceState({}, "", `#${state.activePage}`);
  }
}

function setActivePage(page) {
  if (!["calendar", "reviews", "entry", "library"].includes(page)) return;
  state.activePage = page;
  renderShell();
}

function rebuildReviewIndex() {
  const index = new Map();
  state.memories.forEach((memory) => {
    REVIEW_INTERVALS.forEach((interval) => {
      const reviewDate = toDateKey(addDays(parseDateKey(memory.learnDate), interval));
      if (!index.has(reviewDate)) index.set(reviewDate, []);
      index.get(reviewDate).push({ memory, interval, reviewDate });
    });
  });
  index.forEach((reviews) => {
    reviews.sort((a, b) => a.memory.category.localeCompare(b.memory.category, "zh-CN"));
  });
  state.reviewIndex = index;
}

function renderStats() {
  els.todayCount.textContent = getReviewsForDate(toDateKey(new Date())).length;
  els.totalCount.textContent = state.memories.length;
  els.doneCount.textContent = state.memories.reduce((sum, memory) => {
    return sum + Object.values(memory.completed || {}).filter(Boolean).length;
  }, 0);
}

function renderCalendar() {
  const year = state.viewDate.getFullYear();
  const month = state.viewDate.getMonth();
  els.monthTitle.textContent = formatMonthTitle(state.viewDate);

  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const gridStart = addDays(first, -startOffset);
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const date = addDays(gridStart, index);
    const key = toDateKey(date);
    const reviews = getReviewsForDate(key);
    const isCurrentMonth = date.getMonth() === month;
    const isToday = key === toDateKey(new Date());
    const isSelected = key === state.selectedDate;

    const preview = reviews
      .slice(0, 2)
      .map((item) => `<span class="preview-item">${escapeHtml(item.memory.topic)}</span>`)
      .join("");

    cells.push(`
      <button class="day-cell ${isCurrentMonth ? "" : "outside"} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}"
        type="button"
        data-date="${key}"
        aria-label="${t("calendarAria", { date: formatDateForHuman(key), count: reviews.length })}">
        <span class="date-number">${date.getDate()}</span>
        ${reviews.length ? `<span class="day-count">${t("reviewCount", { count: reviews.length })}</span>` : ""}
        ${preview ? `<span class="day-preview">${preview}</span>` : ""}
      </button>
    `);
  }

  els.calendarGrid.innerHTML = cells.join("");
  els.calendarGrid.querySelectorAll(".day-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      state.selectedDate = cell.dataset.date;
      state.viewDate = startOfMonth(parseDateKey(state.selectedDate));
      state.activePage = "reviews";
      render();
    });
  });
}

function renderSelectedReviews() {
  const reviews = getReviewsForDate(state.selectedDate);
  els.selectedDateTitle.textContent = t("selectedReviewTitle", { date: formatDateForHuman(state.selectedDate) });

  if (!reviews.length) {
    els.reviewList.innerHTML = `
      <div class="empty-state">
        <strong>${t("emptyReviewTitle")}</strong>
        <span>${t("emptyReviewBody")}</span>
      </div>
    `;
    return;
  }

  els.reviewList.innerHTML = reviews
    .map(({ memory, interval, reviewDate }) => {
      const done = Boolean(memory.completed?.[reviewDate]);
      return `
        <article class="review-card ${done ? "done" : ""}">
          <div class="card-main">
            <div>
              <h3>${escapeHtml(memory.topic)}</h3>
              <div class="meta">
                <span class="tag">${escapeHtml(memory.category)}</span>
                <span>${t("learnedOn", { date: formatDateForHuman(memory.learnDate) })}</span>
                <span>${t("reviewStage", { day: interval })}</span>
              </div>
            </div>
            <div class="review-actions">
              <button class="mini-button ${done ? "done" : ""}" type="button" data-action="toggle" data-id="${memory.id}" data-date="${reviewDate}">
                ${done ? t("done") : t("markDone")}
              </button>
            </div>
          </div>
          ${memory.note ? `<p class="note">${escapeHtml(memory.note)}</p>` : ""}
        </article>
      `;
    })
    .join("");

  els.reviewList.querySelectorAll("[data-action='toggle']").forEach((button) => {
    button.addEventListener("click", () => toggleReview(button.dataset.id, button.dataset.date));
  });
}

function renderMemoryList() {
  if (!state.memories.length) {
    els.memoryList.innerHTML = `
      <div class="empty-state">
        <strong>${t("emptyMemoryTitle")}</strong>
        <span>${t("emptyMemoryBody")}</span>
      </div>
    `;
    updateLibraryPaging(0, 0, 1);
    return;
  }

  const filtered = getFilteredMemories();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.library.pageSize));
  state.library.page = Math.min(state.library.page, totalPages);
  const start = (state.library.page - 1) * state.library.pageSize;
  const visibleMemories = filtered.slice(start, start + state.library.pageSize);

  updateLibraryPaging(filtered.length, totalPages, state.library.page);

  if (!visibleMemories.length) {
    els.memoryList.innerHTML = `
      <div class="empty-state">
        <strong>${t("noMatchTitle")}</strong>
        <span>${t("noMatchBody")}</span>
      </div>
    `;
    return;
  }

  els.memoryList.innerHTML = visibleMemories
    .map((memory) => {
      const timeline = REVIEW_INTERVALS.map((interval) => {
        const date = toDateKey(addDays(parseDateKey(memory.learnDate), interval));
        const isDone = Boolean(memory.completed?.[date]);
        const isDue = date === state.selectedDate;
        return `<span class="${isDone ? "is-done" : ""} ${isDue ? "is-due" : ""}">${t("timelineDay", {
          day: interval,
          date: formatMonthDay(date),
        })}</span>`;
      }).join("");

      return `
        <article class="memory-card">
          <div class="card-main">
            <div>
              <h3>${escapeHtml(memory.topic)}</h3>
              <div class="meta">
                <span class="tag">${escapeHtml(memory.category)}</span>
                <span>${t("learnDateMeta", { date: formatDateForHuman(memory.learnDate) })}</span>
              </div>
            </div>
            <div class="memory-actions">
              <button class="mini-button" type="button" data-action="edit" data-id="${memory.id}">${t("edit")}</button>
              <button class="mini-button delete" type="button" data-action="delete" data-id="${memory.id}">${t("delete")}</button>
            </div>
          </div>
          ${memory.note ? `<p class="note">${escapeHtml(memory.note)}</p>` : ""}
          <div class="timeline">${timeline}</div>
        </article>
      `;
    })
    .join("");

  els.memoryList.querySelectorAll("[data-action='edit']").forEach((button) => {
    button.addEventListener("click", () => startEditMemory(button.dataset.id));
  });
  els.memoryList.querySelectorAll("[data-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteMemory(button.dataset.id));
  });
}

function startEditMemory(memoryId) {
  const memory = state.memories.find((item) => item.id === memoryId);
  if (!memory) return;
  state.editingId = memory.id;
  els.learnDate.value = memory.learnDate;
  els.category.value = memory.category;
  els.topic.value = memory.topic;
  els.note.value = memory.note || "";
  state.activePage = "entry";
  render();
}

function cancelEdit() {
  state.editingId = "";
  resetEntryForm();
  render();
}

function resetEntryForm() {
  els.form.reset();
  els.learnDate.value = toDateKey(new Date());
}

function getReviewsForDate(dateKey) {
  return state.reviewIndex.get(dateKey) || [];
}

function nextReviewDate(memory) {
  const todayKey = toDateKey(new Date());
  const upcoming = REVIEW_INTERVALS.map((interval) => toDateKey(addDays(parseDateKey(memory.learnDate), interval))).find(
    (date) => date >= todayKey,
  );
  return upcoming || toDateKey(addDays(parseDateKey(memory.learnDate), REVIEW_INTERVALS.at(-1)));
}

async function toggleReview(memoryId, reviewDate) {
  const memory = state.memories.find((item) => item.id === memoryId);
  if (!memory) return;
  memory.completed = memory.completed || {};
  memory.completed[reviewDate] = !memory.completed[reviewDate];
  if (state.isCloudMode) {
    const { error } = await state.supabase.from("memories").update({ completed: memory.completed }).eq("id", memory.id);
    if (error) {
      memory.completed[reviewDate] = !memory.completed[reviewDate];
      alert(t("updateFail", { message: error.message }));
      return;
    }
  } else {
    saveLocalMemories();
  }
  render();
}

async function deleteMemory(memoryId) {
  if (state.editingId === memoryId) {
    state.editingId = "";
    resetEntryForm();
  }
  if (state.isCloudMode) {
    const { error } = await state.supabase.from("memories").delete().eq("id", memoryId);
    if (error) {
      alert(t("deleteFail", { message: error.message }));
      return;
    }
  }
  state.memories = state.memories.filter((item) => item.id !== memoryId);
  if (!state.isCloudMode) saveLocalMemories();
  render();
}

async function signIn() {
  const email = els.authEmail.value.trim();
  const password = els.authPassword.value;
  if (!email || !password) {
    alert(t("enterEmailPassword"));
    return;
  }
  const { error } = await state.supabase.auth.signInWithPassword({ email, password });
  if (error) alert(t("signInFail", { message: error.message }));
}

async function signUp() {
  const email = els.authEmail.value.trim();
  const password = els.authPassword.value;
  if (!email || password.length < 6) {
    alert(t("enterEmailPassword6"));
    return;
  }
  const { error } = await state.supabase.auth.signUp({ email, password });
  if (error) {
    alert(t("signUpFail", { message: error.message }));
  } else {
    alert(t("signUpSuccess"));
  }
}

async function signOut() {
  const { error } = await state.supabase.auth.signOut();
  if (error) {
    alert(t("signOutFail", { message: error.message }));
    return;
  }
  state.user = null;
  state.isCloudMode = false;
  state.memories = [];
  render();
}

function renderCategoryOptions() {
  const current = state.library.category;
  const categories = [...new Set(state.memories.map((memory) => memory.category).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
  els.categoryFilter.innerHTML = [
    `<option value="">${t("allCategories")}</option>`,
    ...categories.map((category) => {
      const selected = category === current ? "selected" : "";
      return `<option value="${escapeHtml(category)}" ${selected}>${escapeHtml(category)}</option>`;
    }),
  ].join("");
  if (current && !categories.includes(current)) {
    state.library.category = "";
    els.categoryFilter.value = "";
  }
}

function getFilteredMemories() {
  const keyword = state.library.search.toLowerCase();
  return state.memories
    .filter((memory) => {
      const inCategory = !state.library.category || memory.category === state.library.category;
      const haystack = `${memory.category} ${memory.topic} ${memory.note}`.toLowerCase();
      return inCategory && (!keyword || haystack.includes(keyword));
    })
    .sort(compareMemories);
}

function compareMemories(a, b) {
  if (state.library.sort === "learnDateDesc") {
    return b.learnDate.localeCompare(a.learnDate);
  }
  if (state.library.sort === "learnDateAsc") {
    return a.learnDate.localeCompare(b.learnDate);
  }
  if (state.library.sort === "category") {
    return a.category.localeCompare(b.category, "zh-CN") || b.learnDate.localeCompare(a.learnDate);
  }
  return b.createdAt.localeCompare(a.createdAt);
}

function updateLibraryPaging(total, totalPages, page) {
  els.librarySummary.textContent = t("resultSummary", { total, pageSize: state.library.pageSize });
  els.libraryPageInfo.textContent = t("pageInfo", { page, totalPages: Math.max(1, totalPages) });
  els.prevLibraryPage.disabled = page <= 1;
  els.nextLibraryPage.disabled = page >= totalPages;
}

function changeLibraryPage(delta) {
  const total = getFilteredMemories().length;
  const totalPages = Math.max(1, Math.ceil(total / state.library.pageSize));
  state.library.page = Math.min(totalPages, Math.max(1, state.library.page + delta));
  renderMemoryList();
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateForHuman(dateKey) {
  const date = parseDateKey(dateKey);
  if (state.language === "en") {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }
  if (state.language === "ja") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatMonthDay(dateKey) {
  const date = parseDateKey(dateKey);
  if (state.language === "en") {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatMonthTitle(date) {
  if (state.language === "en") {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }
  if (state.language === "ja") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  }
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `memory-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

init();
