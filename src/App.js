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

    let username = process.env.username
    let password = process.env.password
    let post_url = process.env.post_url
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + username + ":" + password);
    headers.append('Origin', 'http://localhost:3000');

    //axios.post(post_url,
    axios.post(`https://redpanal.org/api/audio/`,
      {
        headers: headers,
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
    // var watchID = navigator.geolocation.watchPosition(function (position) {
    //   console.log(position.coords.latitude, position.coords.longitude);
    // });

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