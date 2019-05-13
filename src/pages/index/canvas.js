import React, { Component } from 'react';
import { Row, Col, CardPanel} from 'react-materialize';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

class Canvas extends Component {
  

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      image: '',
      count_once: 0,
    }
  }

  componentDidMount(){
    console.log("Windows");
    
    console.log("props");
    console.log(this.props);

    console.log("UI<<<<<");
    console.log(this.editorRef);

    

   
    

  }

  render() {

    const image = this.props.image;
    let image_show = '';
    console.log(image);
    if(typeof image.results !== "undefined" && this.state.count_once === 0) {
      if(image.results.length > 0) {
        this.setState({image: image.results[0].urls.small})
        this.setState({count_once: 1});
        console.log("IMAGE");
        console.log(image.results[0].urls.small);
        //this.editorRef.current.props.includeUI.loadImageFromURL('http://url/testImage.png', 'lena');
    
        

        image_show = image.results[0].urls.small;
    

      }
    }

    if(this.state.image) {
      const editorInstance = this.editorRef.current.getInstance();    
        editorInstance.loadImageFromURL(image.results[0].urls.regular, 'lena').then(result => {
          console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
          console.log('new : ' + result.newWidth + ', ' + result.newHeight);
          editorInstance.ui.resizeEditor({
            imageSize: {oldWidth: result.oldWidth, oldHeight: result.oldHeight, newWidth: result.newWidth, newHeight: result.newHeight},
        });
        
        });
    }
    
    return (
      <div className="canvas-wrapper center">
         <ImageEditor
            ref={this.editorRef}
            includeUI={{
              loadImage: {
                path: 'img/sampleImage.jpg',
                name: 'SampleImage'
              },
              menu: ['shape', 'filter'],
              initMenu: 'filter',
              uiSize: {
                width: '1000px',
                height: '700px'
              },
              menuBarPosition: 'bottom'
            }}
          />
      </div>
    );
  }
}

export default Canvas;

/*
<div className="canvas z-depth-4" style={{backgroundImage: `url(${this.state.image})`}}>
Este é o Canvas
{ this.props.hidden_word }
</div>
*/
