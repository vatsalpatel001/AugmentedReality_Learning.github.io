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
    
      <a-Assets >
    
        <a-asset-item
          id="bowser1"
          src="../Assets/A2.glb"
        >
        </a-asset-item>
        
      </a-Assets>

      <a-camera id="camera">
        <a-marker
          type="pattern"
          url="../Assets/A2.patt"
          id="markerA"
        ></a-marker>
        <a-entity light="type:ambient; intensity:2"></a-entity>
        <a-entity
          light="type:directional;castShadow:true"
          position="0 1 0"
        ></a-entity>
         <a-entity
          
          cursor="fuse: true; fuseTimeout: 0"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.025"
          material="color: white; shader: flat;opacity:0"   visible="false"      
        ></a-entity>
        <a-entity
          position="0 0 -5"
          scale="0.05 0.05 0.05"
          gesture-handler
          id="vatlook"
        >
          <a-entity id="bowser-model1" gltf-model="#bowser1" visible="false">
           
          </a-entity>
        

        </a-entity>
    </a-camera>
    `;

 document.body.appendChild(sceneEl);