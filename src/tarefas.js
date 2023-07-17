import { createSlice } from "@reduxjs/toolkit";

export const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState: {
    tarefas: []
  },
  reducers: {

    setTarefas:(state, action)=>{
      state.tarefas = action.payload
    },

    adicionarTarefa: (state, action) => {
      state.tarefas.push({ id: action.payload.id, texto: action.payload.texto, completo: false })
    },

    removerTarefa: (state, action) => {
      state.tarefas = state.tarefas.filter(item => item.id !== action.payload)
    },

    editarTarefa: (state, action) => {
      state.tarefas = state.tarefas.map(item => {
        if (item.id === action.payload.id)
          return { ...item, texto: action.payload.texto }
        return item
      })
    },

    alternarCompletude: (state, action) => {
      state.tarefas = state.tarefas.map(item => {
        if (item.id === action.payload) {
          return { ...item, completo: !item.completo }
        }
        return item
      })
    },

    subirPosTarefa: (state, action) => {
        const indice = state.tarefas.findIndex(item=> item.id === action.payload)
        if(indice > 0){
          const objeto = state.tarefas[indice]
          state.tarefas.splice(indice, 1)
          state.tarefas.splice(indice-1, 0, objeto)
        }
    },

    descerPosTarefa: (state, action) => {
      const indice = state.tarefas.findIndex(item => item.id === action.payload)
      if(indice<state.tarefas.length-1){
        const objeto = state.tarefas[indice]
        state.tarefas.splice(indice, 1)
        state.tarefas.splice(indice+1,0,objeto)
      }
    },
    excluirTodasTarefas:(state, action)=>{
      state.tarefas = []
    }
  }
});

export const tarefasActions = tarefasSlice.actions;
export default tarefasSlice.reducer;