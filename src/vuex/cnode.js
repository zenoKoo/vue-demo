const state = {
    tab: 'all',
    articleList: [],
    collectTopics: [],
    isLoading: false,
    isMore: false,
    isShowAsideMenu: false,
    isShowLogin: false,
    isShowInfo: false,
    isShowMsg: false,
    isShowNewArticle: false,
    isShowAbout: false,
    scrollTop: 0,
    userInfo: localStorage.userInfo && JSON.parse(localStorage.userInfo) || {avatar_url: '', id: '', loginname: '', success: false},
    ak: localStorage.ak || ''
}

const mutations = {
    changeTab(state, payload) {
      state.isLoading = payload.hasOwnProperty('isLoading') ? payload.isLoading : state.isLoading;
      state.tab = payload.type || state.tab;
      state.articleList = payload.articleList || state.articleList;
    },
    viewArcticle(state, flag) {
      state.isLoading = flag;
    },
    changeMore(state, flag) {
      state.isMore = flag;
    },
    changeScrollTop(state, scrollTop) {
      state.scrollTop = scrollTop;
    },
    showAsideMenu(state, flag) {
      state.isShowAsideMenu = flag;
    },
    showLogin(state, flag) {
      state.isShowLogin = flag;
    },
    showInfo(state, flag) {
      state.isShowInfo = flag;
    },
    showMsg(state, flag) {
      state.isShowMsg = flag;
    },
    showNewArticle(state, flag) {
      state.isShowNewArticle = flag;
    },
    showAbout(state, flag) {
      state.isShowAbout = flag;
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateAk(state, ak) {
      state.ak = ak;
    },
    updateCollect(state, collectTopics) {
      state.collectTopics = collectTopics;
    }
  }

export default {
    state,
    mutations
}