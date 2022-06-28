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
        <a-asset-item id="monkey"  src="https://cdn.glitch.com/26fe8b08-0b65-4eae-9cb6-063baef89004%2Fmonkey.gltf?v=1628504914868"></a-asset-item>
      </a-assets>

       <a-camera id="camera">
      <a-entity vat-model gesture-handler gltf-model="#bird" position="0 -0.8 -3" scale="0.002 0.002 0.002" animation-mixer="clip:Take 001;" visible="true"></a-entity>
      <a-entity vat-model gesture-handler gltf-model="#monkey" position="0 0 -3" scale="0.3 0.3 0.3" animation-mixer="clip:*;" visible="true"></a-entity>
      
    </a-camera>
    `;

 document.body.appendChild(sceneEl);



		






