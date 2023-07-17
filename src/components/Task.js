import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare, faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons"
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"

export default function Task(props) {
    return (
        <div className={`tarefa ${props.completo ? 'tarefa-completa' : ''}`}>
          <p className="tarefa-texto">{props.texto}</p>
          <button onClick={props.removerTarefa} className="botao btn-trash">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <button onClick={props.editarTarefa} className="botao btn-edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={props.alternaTarefaCompleta} className="botao btn-complete">
            {props.completo ? (
              <FontAwesomeIcon icon={faSquare} />
            ) : (
              <FontAwesomeIcon icon={faSquareCheck} />
            )}
          </button>
          <button onClick={props.subirPosTarefa} className="botao btn-move">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button onClick={props.descerPosTarefa} className="botao btn-move">
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      );
}