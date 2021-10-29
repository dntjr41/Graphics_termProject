let scene, camera, renderer;
window.onload=function init() {
  const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
  // 키보드 동작 함수
  window.addEventListener("keydown", e => {
    const key=e.key;
    console.log(key);
    console.log(e);
    if(key=='ArrowUp') // 방향 키 위
    {

    }
    if(key=='ArrowDown') // 방향 키 아래
    {
      
    }
    if(key=='ArrowLeft') // 방향 키 왼쪽
    {
      
    }
    if(key=='ArrowRight') // 방향 키 오른쪽
    {
      
    }
    if(e.code=='Space') // 스페이스 바
    {

    }
  });
  window.addEventListener("keyup", e => {
    const key = document.getElementById(e.key);
    if (key) console.log(e);
  });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-900,-200,-900);
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls=new THREE.OrbitControls(camera, renderer.domElement);
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( 'background/quirk_ft.jpg');
  let texture_bk = new THREE.TextureLoader().load( 'background/quirk_bk.jpg');
  let texture_up = new THREE.TextureLoader().load( 'background/quirk_up.jpg');
  let texture_dn = new THREE.TextureLoader().load( 'background/quirk_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( 'background/quirk_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( 'background/quirk_lf.jpg');
    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox ); 
  gltfLoader();
  animate();
  function gltfLoader()
  { 
    const loader = new THREE.GLTFLoader();
	  loader.load('./model/scene.gltf', function(gltf){
	  girl = gltf.scene.children[0];
	  girl.scale.set(0.5,0.5,0.5);
	  scene.add(gltf.scene);
	  }, undefined, function (error) {
		  console.error(error);
	  });
  }
function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
}
