import React, { useState } from 'react';
import 'react-day-picker/lib/style.css';

import api from '../../services/api';

interface ITrack {
  id: number;
  name: string;
}

interface IError {
  success: boolean;
  message: string;
  statusCode: number;
  error?: object;
}

const Dashboard: React.FC = () => {

  // Variável de erros.
  const [error, setError] = useState<IError|null>();

  // Lista de músicas.
  const [playlist, setPlayList] = useState<ITrack[]>([]);

  /**
   * Função para mostrar Input de cidade ou Inputs de Latitude e longitude 
   * com base no switch.
   */
  const disableCity = () => {
    const switchForm         : HTMLInputElement|null = document.querySelector('#disableCity');
    const sectionCity        : HTMLInputElement|null = document.querySelector('#sectionCity');
    const sectionCoordinates : HTMLInputElement|null = document.querySelector('#sectionCoordinates');

    if (switchForm?.checked) {
      sectionCity?.classList.remove('d-none')
      sectionCoordinates?.classList.add('d-none')
    } else {
      sectionCoordinates?.classList.remove('d-none')  
      sectionCity?.classList.add('d-none')
    }
  }

  /**
   * Envia as informações de Cidade ou de Coordenadas para o back-end e
   * recupera as playlist para exibi-las
   */
  const recoverPlaylist = () => {
    const switchForm: HTMLInputElement|null = document.querySelector('#disableCity');
    const inputCity:  HTMLInputElement|null = document.querySelector('#inputCity');
    const inputLat:   HTMLInputElement|null = document.querySelector('#inputLat');
    const inputLon:   HTMLInputElement|null = document.querySelector('#inputLon');

    // Pega os parâmetros.
    let params = {};
    if (switchForm?.checked) {
      params = {
        city: inputCity?.value
      }
    } else {
      params = {
        latitude: inputLat?.value,
        longitude: inputLon?.value,
      }
    }

    // Realiza a requisição de dados.
    api.get('/playlists/temperatura', { params }).then(({ data }) => {
      if (data.success) {
        setPlayList(data.tracks);
        setError(null);
      } else {
        setPlayList([]);
        setError(data);
      }
    })
  }

  return (
      <main className="container">
        <div className="row mt-5">
          <section className="col-sm-8 col-md-4 offset-sm-2 offset-md-0" style={{marginTop: "20%" }}>
            <p className="lead">Informe os dados para podermos retornar a playlist</p>
            <form > 
              <section id="sectionCity">
                <label htmlFor="cidade">Cidade</label>
                <input type="text" className="form-control" defaultValue="Ituporanga" name="cidade" id="inputCity" />
              </section>

              <section id="sectionCoordinates" className="d-none">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" className="form-control col-12" placeholder="70.00" name="latitude" id="inputLat" />
                <label htmlFor="longitude ">Longitude</label>
                <input type="number" className="form-control col-12" placeholder="70.00" name="longitude" id="inputLon" />
              </section>

              <div className="mt-2">

                <div className="form-check form-switch d-flex justify-content-end">
                  <input className="form-check-input mr-3" type="checkbox" id="disableCity" defaultChecked onClick={disableCity}/>
                  <label className="form-check-label ml-2" htmlFor="disableCity">Cidade</label>
                </div>

                <button type="button" className="btn btn-primary col-12 mt-2 mb-3" onClick={recoverPlaylist}> Recuperar Playlist </button>

              </div>
              {
                error && 
                <div className="alert alert-danger" role="alert"> 
                  <h4 className="text-danger">{error.message}</h4>
                </div>
              }
            </form>
          </section>
          <section id="sectionPlaylist" className="border-start col-md-7 offset-md-1 col-sm-8 offset-sm-2">
            
            <ul className="list-group">
              {playlist && playlist.map(element => {
                return <li className="list-group-item" key={element.id}>{element.name}</li>
              })}
            </ul>
          </section>
        </div>
      </main>
  );
};

export default Dashboard;
