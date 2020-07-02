import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container } from 'react-bootstrap';
import CustomNavbar from './components/CustomNavbar';
import CustomMap from './components/CustomMap';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      position_lat: '',
      position_long: ''
    }

  }


  
  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files
    //define message container
    let err = []
    // list allow mime type
    const types = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-m4a', 'audio/mp3']
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container   
        err[x] = files[x].type + ' is not a supported format\n';
      }
    };
    for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
      // discard selected file
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }
  maxSelectFile = (event) => {
    let files = event.target.files
    if (files.length > 1) {
      const msg = 'Only 1 audio can be uploaded'
      event.target.value = null
      toast.warn(msg)
      return false;
    }
    return true;
  }
  checkFileSize = (event) => {
    let files = event.target.files
    let size = 20000000000000000000
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    };
    for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
      // discard selected file
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }

  onChangeHandler = event => {
    var files = event.target.files
    if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0
      })
    }
  }

  onClickHandler = () => {
    var formData = new FormData()
    formData.append('audio', this.state.selectedFile.item(0))
    formData.append('tags',JSON.stringify(["mapas-sonoros", "sound-maps"]))
    formData.append('instrument','other')
    formData.append('position_lat', '-34.59449')
    formData.append('position_long', '-58.40592')
    formData.append('genre','other')
    formData.append('use_type','track')
    formData.append('description','sound-maps')
    // formData.append('license','CC-BY-SA-4.0')
    formData.append('name',this.state.selectedFile.item(0).name)


    let username = process.env.REACT_APP_USERNAME
    let password = process.env.REACT_APP_PASSWORD
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    // console.log(process.env)
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Basic ' + username + ":" + password);
    // headers.append('Access-Control-Allow-Origin', '*');

    axios.post('/api/audio/', formData ,
      {
        headers: {
          'Authorization': `Basic ${token}`
        },
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
          })
        }
      })
      .then(res => { // then print response status
        console.log(res)
        toast.success('upload success')
      })
      .catch(err => { // then print response status
        console.log(err)
        toast.error('upload fail')
      })
  }



  render() {
    var watchID = navigator.geolocation.watchPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });

    return (
      <>
         <CustomNavbar />
        <Container fluid className="no-gutter">
          <Jumbotron>
            <h1>Mapas sonoros</h1>
            <h3>Lorem ipsum sor amet </h3>
          </Jumbotron>
        </Container>
        <Container className="mg-btm">
          <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Subí tu archivo de audio</label>
              <input type="file" className="form-control" accept="audio/*" onChange={this.onChangeHandler} />
            </div>
            <div>


  <div class="form-group">
    <label for="exampleInputEmail1">Longitud (hasta 5 decimales)</label>
    <input type="long" class="form-control" id="long" aria-describedby="longitude" placeholder="Longitud" />
    <small id="longHelp" class="form-text text-muted">Habilitar la geolocalización del navegador para completar automáticamente</small>

  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Longitud (hasta 5 decimales)</label>
    <input type="lat" class="form-control" id="lat" aria-describedby="latitude" placeholder="Latitud" />
    <small id="longHelp" class="form-text text-muted">Habilitar la geolocalización del navegador para completar automáticamente</small>

  </div>


            </div>
            <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
            </div>
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Subir</button>
          </div>
        </Container>
        <Container fluid className="no-gutter">
          <CustomMap />
        </Container>
      </>
    );
  }
}

export default App;