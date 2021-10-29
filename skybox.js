let scene, camera, renderer;
window.onload=function init() {
  const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

  let add=100;

  // 키보드 동작 함수
  window.addEventListener("keydown", e => {
    const key=e.key;
    console.log(key);
    console.log(e);
    if(key=='ArrowUp') // 방향 키 위
    {
      move(add);
    }
    if(key=='ArrowDown') // 방향 키 아래
    {
      
    }
    if(key=='ArrowLeft') // 방향 키 왼쪽
    {
      move_left(add);
    }
    if(key=='ArrowRight') // 방향 키 오른쪽
    {
      move_right(add);
    }
    if(e.code=='Space') // 스페이스 바
    {
      
    }
  });
  window.addEventListener("keyup", e => { // 키보드에서 뗏을 때, 
    const key = document.getElementById(e.key);
    if (key) console.log(e);
  });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-900,-200,-900);
  // camera.position.set(0,0,-100);
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls=new THREE.OrbitControls(camera, renderer.domElement);

  // background
  const loader=new THREE.CubeTextureLoader();
  const texture=loader.load([
    'background/quirk_ft.jpg',
    'background/quirk_bk.jpg',
    'background/quirk_up.jpg',
    'background/quirk_dn.jpg',
    'background/quirk_rt.jpg',
    'background/quirk_lf.jpg'
  ]);
  scene.background=texture;
  hlight = new THREE.AmbientLight (0x333333,50);
	scene.add(hlight);
	light = new THREE.DirectionalLight(0xc4c4c4,10);
	light.position.set(0,3000,5000);
	scene.add(light);
	// light2 = new THREE.PointLight(0xc4c4c4,10);
	// light2.position.set(5000,1000,0);
	// scene.add(light2);
  // light3 = new THREE.PointLight(0xc4c4c4,10);
	// light3.position.set(0,1000,-5000);
	// scene.add(light3);

  // girl
  const loader2 = new THREE.GLTFLoader();
	loader2.load('./model/scene.gltf', function(gltf){
	girl = gltf.scene.children[0];
	girl.scale.set(100,100,100);
  girl.position.x=500;
  girl.position.y=500;
	scene.add(gltf.scene);
  animate();
	}, undefined, function (error) {
		  console.error(error);
	});

  // player
  const player_loader=new THREE.GLTFLoader();
  player_loader.load('./squid_game__pinksoldier/scene.gltf',function(gltf){
    player=gltf.scene.children[0];
    player.scale.set(1,1,1);
    player.position.x=0;
    player.position.y=0;
    scene.add(gltf.scene);
    animate();
  }, undefined,function(error){
    console.error(error);
  });

  // 무궁화 꽃이 피었습니다. floating 3d text
  let fontLoader=new THREE.FontLoader();
  fontLoader.load("./Do Hyeon_Regular.json",font=>{
    let geometry=new THREE.TextGeometry(
      "무궁화 꽃이 피었습니다.",
      {
        font: font,
        size:100,
        height:0,
        curveSegments:12
      }
    );
    geometry.computeBoundingBox();
    let xMid=-0.5*(geometry.boundingBox.max.x-geometry.boundingBox.min.x);
    geometry.translate(xMid,500,0);
    
    let material=new THREE.MeshBasicMaterial({
      color:0xffffff,
      wireframe:true
    });
    let mesh=new THREE.Mesh(geometry,material);
    scene.add(mesh);
    
  });
function animate(time) {
  time*=0.001;
	girl.rotation.z=time;
  girl.translate.y=-10;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
function move_left(add)
{
  player.position.x+=add;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
function move_right(add)
{
  player.position.x-=add;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
function move(add)
{
  player.position.z+=add;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
}

