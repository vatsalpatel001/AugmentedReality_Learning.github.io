// model
 const link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link );  
var data = JSON.stringify( );

//
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild; 
}



// var sceneEl = document.createElement("a-scene");
var sceneEl = createElementFromHTML(`    <a-scene
      arjs
      embedded
      renderer="logarithmicDepthBuffer: true;"
      vr-mode-ui="enabled: false"
      gesture-detector
      id="scene"
      cursor="rayOrigin: mouse"
    ></a-scene>`);

sceneEl.innerHTML=` 
     <a-assets>
        <a-asset-item id="bird"  src="https://cdn.glitch.com/1061d524-9d0f-4b25-97fd-48ebd0fce63c%2Fsceneglb.glb?1546534633849"></a-asset-item>
      </a-assets>

       <a-camera id="camera">
      <a-entity vat-model gesture-handler gltf-model="#bird" position="0 0 -3" scale="0.004 0.004 0.004" animation-mixer="clip:Take 001;" visible="true"></a-entity>
      
    </a-camera>
    `;

 document.body.appendChild(sceneEl);
AFRAME.registerComponent("vat-model",{
 init: function () {
   //three js loader code + attaching it to the entity's object3D
  // var loader = new THREE.GLTFLoader();
  // loader.parse( data, '', ( gltf ) => {		
  // gltf.scene.traverse( ( child ) => {			
  // if ( child.isMesh ) {				
  // child.geometry.center();				
  // }			
  // } );		
  // this.el.object3D.add( gltf.scene );		
  // } );
//    download();
// function download(){
   
  
     
     
   
   
    const exporter = new THREE.GLTFExporter();
    exporter.parse(
        this.el.object3D,
        function (result) {
          console.log(result)
            saveArrayBuffer(JSON.stringify( result, null, 2 ), 'ThreejsScene.gltf'); 
        },
        { 
            binary: false
        }
    );

// }
     }
});





function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

function save(blob, filename) {
    link.href = URL.createObjectURL(blob);    
    link.download = filename;
    link.click(); // This step makes sure your glb file gets downloaded
   
}





		






