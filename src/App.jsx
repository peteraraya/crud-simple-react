import React from 'react';
import shortid from 'shortid';


function App() {

  // relacionar formularios con react con un state
  const [tarea, setTarea] = React.useState('');

  const [tareas,setTareas] = React.useState([]);

  const [ modoEdicion, setModoEdicion ] = React.useState(false);

  const [ id, setId] = React.useState([])

  const [ error, setError] = React.useState(null)

  const agregarTarea = e =>{
    e.preventDefault();
    if ((!tarea.trim())) {
      console.log('elemento vacío');
      setError('Escriba algo por favor ... ');
      return;
    }
    console.log(tarea);


    setTareas([
      ...tareas,
      { id: shortid.generate(), nombreTarea:tarea}
    ])


    // Limpia input
    setTarea('');
    setError(null);
  }

// Relación entre boton
  const eliminarTarea = id =>{
    // console.log(id);
    // Filtra todo lo que sea disntinto al id que estamos mandando - si el id es igual no lo incorpora al nuevo array
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item =>{
    console.log(item);
    setModoEdicion(true); // modificamos a true
    setTarea(item.nombreTarea);
    setId(item.id);
  }


  const editarTarea = e =>{
    e.preventDefault();
    if ((!tarea.trim())) {
      console.log('elemento vacío');
      setError('Escriba algo por favor ... ');
      return;
    }
    // devolvemos el objeto id
    const arrayEditado = tareas.map( 
                        item => item.id === id ? {id:id,nombreTarea:tarea} : item);

     // Guardamos
     setTareas(arrayEditado);
    setModoEdicion(false); // modificamos a true
    setTarea('');
    setId(''); 
    setError(null);                  
  }


  return (
    <div className="container">
      <h1 className="text-center mt-5"> Crud Simple</h1>

      <hr />

      <div className="row">
        <div className="col-8">
          <h4 className="text-center">
              Lista de tareas
              <ul className="list-group">
              {
                tareas.length === 0 ? (
                  <li className="list-group-item">No hay tareas</li>
                ) : (

                    tareas.map(item => (
                      <li className="list-group-item" key={item.id}>
                        <span className="lead mr-2">{item.nombreTarea}</span>
                        <button
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => eliminarTarea(item.id)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editar(item)}
                        >
                          Editar</button>
                      </li>
                    ))
                  )
              }
              

              </ul>
          </h4>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null 
            } 
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="ingrese tarea"
              onChange={ e => setTarea(e.target.value)}
              value={tarea}
              />

              {
                modoEdicion ? (
                <button
                  className="btn btn-warning btn-block"
                  type="submit" >Editar</button>
                ) : (

                  <button
                    className="btn btn-dark btn-block"
                    type="submit" >Agregar</button>
                )
              }


          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
