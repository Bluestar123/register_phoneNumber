import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
	  chooseList:[]
  },
  mutations:{
	  set_chooseList:(state,list)=>{
		  state.chooseList = list
	  }
  }
})

export default store