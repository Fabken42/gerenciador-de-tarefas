import { configureStore } from "@reduxjs/toolkit";
import tarefasReducer from './tarefas.js'

export default configureStore({
    reducer:{
        tarefas: tarefasReducer
    }
})