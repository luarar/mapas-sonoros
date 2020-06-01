import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container } from 'react-bootstrap';
import CustomNavbar from './components/CustomNavbar';
import CustomMap from './components/CustomMap';

var fakeData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Budapest metro Jingle",
        "description": "Budapest, Hungary",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/4/41/Budapest_metro_jingle.ogg",
        "credit_url": "https://commons.wikimedia.org/wiki/File:Budapest_metro_jingle.ogg",
        "marker-symbol": "commercial",
        "marker-size": "large",
        "marker-color": "c4ba6a"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [18.8494264, 47.4808706]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "title": "News CS jingle",
        "description": "Prague, Czech Republic",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/d/da/News-cs-jingle.ogg",
        "credit_url": "https://commons.wikimedia.org/wiki/File:News-cs-jingle.ogg"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [14.3819975, 50.0842324]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "title": "Sleepys jingle",
        "description": "Bed maker &mdash; Hicksville, New York.",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Sleepys_jingle_60_seconds.ogg",
        "credit_url": "https://commons.wikimedia.org/wiki/File:Sleepys_jingle_60_seconds.ogg"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-73.523333, 40.763333]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "title": "ding-dong3",
        "description": "'Recorded at a metro station in Barcelona'",
        "audio_url": "https://freesound.org/data/previews/155/155776_2767757-lq.mp3",
        "credit_url": "http://freesound.org/people/MetroSoundBCN/sounds/155776/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [2.0083379, 41.3947046]
      }
    },

    {
      "type": "Feature",
      "properties": {
        "title": "London Underground - Mind The Gap",
        "description": "'Short sample of the famous 'mind the gap' announcement...'",
        "audio_url": "https://freesound.org/data/previews/327/327942_4486188-lq.mp3",
        "credit_url": "http://freesound.org/people/kwahmah_02/sounds/327942/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-0.09, 51.505]
      }
    }
  ],

  "x-useful-resources": [
    "paris:  -2.3732829, 48.8453195"
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
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
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
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
    const formData = new FormData()
    formData.append('file', {
      audio: './../public/cat.mp3',
      tags: ["untag", "otrotag"],
      instrument: "other",
      genre: "other",
      use_type: "track",
      description: "sound-maps",
      licence: "CC-BY-SA-4.0",
      name: "test-for-sound-maps"
    })


    let headers = new Headers();
    let username = 'Luarit'
    let password = 'mL3ufPuWrb94yKb'
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + username + ":" + password);
    headers.append('Origin', 'http://localhost:3000');

    axios.post(`https://redpanal.org/api/audio/`,
      {
        headers: headers,
        // auth: {
        //   username: 'Luarit',
        //   password: 'mL3ufPuWrb94yKb' // Bad password
        // },
        body: formData
      },
      {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
          })
        },
      })
      .then(res => { // then print response status
        toast.success('upload success')
      })
      .catch(err => { // then print response status
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
              <input type="file" className="form-control" multiple onChange={this.onChangeHandler} />
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