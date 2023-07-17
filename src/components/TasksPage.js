import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tarefasActions } from '../tarefas';
import Task from './Task';

export default function TasksPage() {
  const dispatch = useDispatch();
  const { tarefas } = useSelector((state) => state.tarefas);
  const [textoTarefa, setTextoTarefa] = useState('')
  const [idAtual, setIdAtual] = useState(parseInt(localStorage.getItem('idAtual')) || 0)
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState(-1)
  const [primeiroCarregamento, setPrimeiroCarregamento] = useState(true)

  useEffect(() => {
    if (primeiroCarregamento)
      setPrimeiroCarregamento(false)
    else
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('idAtual', JSON.stringify(idAtual))
  }, [tarefas]);

  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    dispatch(tarefasActions.setTarefas(tarefasSalvas));
  }, []);

  const handleEnviarTarefa = (ev) => {
    ev.preventDefault()

    if (textoTarefa === '') {
      alert('Preencha o campo!')
      return
    }

    if (idTarefaSelecionada === -1) {
      dispatch(tarefasActions.adicionarTarefa({ id: idAtual, texto: textoTarefa }))
    } else {
      dispatch(tarefasActions.editarTarefa({ id: idTarefaSelecionada, texto: textoTarefa }))
    }

    setTextoTarefa('')
    setIdTarefaSelecionada(-1)
    setIdAtual(idAtual + 1)
  };

  const handleRemoverTarefa = (id) => {
    dispatch(tarefasActions.removerTarefa(id))
  };

  const handleEditarTarefa = (id) => {
    setIdTarefaSelecionada(id)

    const indice = tarefas.findIndex(item => item.id === id)
    setTextoTarefa(tarefas[indice].texto)
    document.getElementById('taskInput').focus()
  };

  const alternaTarefaCompleta = (id) => {
    dispatch(tarefasActions.alternarCompletude(id))
  }

  const subirPosTarefa = (id) => {
    dispatch(tarefasActions.subirPosTarefa(id))
  }

  const descerPosTarefa = (id) => {
    dispatch(tarefasActions.descerPosTarefa(id))
  }

  const excluirTarefas = () => {
    if (window.confirm('Deseja excluir todos os itens?')) {
      dispatch(tarefasActions.excluirTodasTarefas())
      setIdAtual(0)
    }
  }

  console.log(localStorage.getItem('tarefas'));

  return (
    <div className="tasks-page-container">
      <div className="header-container">
        <h2 className="header-container__titulo">Lista de Tarefas - Fabrício K.</h2>
        <button onClick={() => excluirTarefas()} className="btn excluir-tudo-btn">
          Excluir Tudo
        </button>
      </div>

      <form onSubmit={handleEnviarTarefa} className="form-container">
        <input
          type="text"
          id="taskInput"
          value={textoTarefa}
          onChange={(ev) => setTextoTarefa(ev.target.value)}
          placeholder="Digite uma tarefa"
          className="input-tarefa"
        />
        <button type="submit" className="btn enviar-btn">
          Enviar
        </button>
      </form>

      <div className="tarefas-container">
        {tarefas.map((tarefa) => (
          <Task
            key={tarefa.id}
            texto={tarefa.texto}
            completo={tarefa.completo}
            removerTarefa={() => handleRemoverTarefa(tarefa.id)}
            editarTarefa={() => handleEditarTarefa(tarefa.id)}
            alternaTarefaCompleta={() => alternaTarefaCompleta(tarefa.id)}
            subirPosTarefa={() => subirPosTarefa(tarefa.id)}
            descerPosTarefa={() => descerPosTarefa(tarefa.id)}
          />
        ))}
      </div>
    </div>
  );
}
