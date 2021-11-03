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
      move_back(add);
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
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,100,30000);
  //camera=new THREE.PerspectiveCamera(100,2,0.5,100);
  //camera.position.set(900,-2000,-900);
  camera.position.set(0,-100,-2500);
  console.log(camera.position);
  // camera.position.set(0,0,-100);
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls=new THREE.OrbitControls(camera, renderer.domElement);

 
  const boxWidth = 5000;
  const boxHeight = 5000;
  const boxDepth = 5000;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color,
    opacity:0.5,
transparent:true,});
//const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    

    cube.position.x = x+10;
    console.log("y: ",cube.position.y);
    cube.position.y = 5;
    console.log("y: ",cube.position.y);

    scene.add(cube);
    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
   
  ];

  // ground
  var groundTexture = new THREE.TextureLoader().load( "floor.jpg" );
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set( 10000, 10000 );
  groundTexture.anisotropy = 16;
  groundTexture.encoding = THREE.sRGBEncoding;
  var groundMaterial=new THREE.MeshStandardMaterial({map:groundTexture});
  var mesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(10000,10000),groundMaterial);
  mesh.position.y = -1000;
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add( mesh );

  // right wall - 광원 추가해야 보임
  var rightwallTexture = new THREE.TextureLoader().load( "floor.jpg" );
  rightwallTexture.wrapS = rightwallTexture.wrapT = THREE.RepeatWrapping;
  rightwallTexture.repeat.set( 10000, 10000 );
  rightwallTexture.anisotropy = 16;
  rightwallTexture.encoding = THREE.sRGBEncoding;
  var rightwallMaterial=new THREE.MeshStandardMaterial({map:rightwallTexture});
  var right_wall_mesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(10000,10000),rightwallMaterial);
  
  right_wall_mesh.rotation.y = - Math.PI / 2;
  right_wall_mesh.position.x = -5000;
  right_wall_mesh.receiveShadow = false;
  right_wall_mesh.rotation.y=359.71836;
  scene.add( right_wall_mesh );

  // left wall
  var leftwallTexture = new THREE.TextureLoader().load( "floor.jpg" );
  leftwallTexture.wrapS = leftwallTexture.wrapT = THREE.RepeatWrapping;
  leftwallTexture.repeat.set( 10000, 10000 );
  leftwallTexture.anisotropy = 16;
  leftwallTexture.encoding = THREE.sRGBEncoding;
  var leftwallMaterial=new THREE.MeshStandardMaterial({map:leftwallTexture});
  var left_wall_mesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(10000,10000),leftwallMaterial);
  
  left_wall_mesh.rotation.y = - Math.PI / 2;
  left_wall_mesh.position.x = 5000;
  left_wall_mesh.receiveShadow = true;
  scene.add( left_wall_mesh );

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

  // Using the 5 light sources
  // 광원 조절해주기
  scene.background=texture;
	hlight = new THREE.AmbientLight (0x404040,1);
	scene.add(hlight);
	light = new THREE.PointLight(0xc4c4c4,1);
	light.position.set(0,3000,5000);
	scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4,1);
	light2.position.set(5000,1000,0);
	scene.add(light2);
	light3 = new THREE.PointLight(0xc4c4c4,1);
	light3.position.set(0,5000,-5000);
	scene.add(light3);
	light4 = new THREE.PointLight(0xc4c4c4,1);
	light4.position.set(-5000,5000,2500);
	scene.add(light4);
  
  

  //finish line
  const line_loader = new THREE.GLTFLoader();
	line_loader.load('./squid_game_finish_line/scene.gltf', function(gltf){
	line = gltf.scene.children[0];
	line.scale.set(3.9,3,2.5);
  line.position.x=0;
  line.position.y=-1225;
  line.position.z=4500;
	scene.add(gltf.scene);
	}, undefined, function (error) {
		  console.error(error);
	});

  // girl
  const loader2 = new THREE.GLTFLoader();
	loader2.load('./model/scene.gltf', function(gltf){
	girl = gltf.scene.children[0];
	girl.scale.set(1000,1000,1000);
  girl.position.x=-100;
  girl.position.y=-1000;
  girl.position.z=5000;
  girl.rotation.z=0;
	scene.add(gltf.scene);
  animate();
	}, undefined, function (error) {
		  console.error(error);
	});

  // 팔다리가 움직이게 할 수 있음 좋겠음
  // player
  const player_loader=new THREE.GLTFLoader();
  player_loader.load('./squid_game_player/scene.gltf',function(gltf){
  player=gltf.scene.children[0];
  player.scale.set(200,200,200);
    player.position.x=3;
    player.position.y=-1000;
    
    player.position.z=-4800;
    
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });

  /////////////////////////////////////////////////////////////////////
  // Architecture
  // House 1
  const house1=new THREE.GLTFLoader();
  house1.load('./architecture/house1/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(0.75, 0.75, 0.75);
    house.rotation.z=1000;
    house.position.x=-4000;
    house.position.y=-1000;
    house.position.z=-3500;
    
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  // House 2
  const house2=new THREE.GLTFLoader();
  house2.load('./architecture/house2/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(1.2, 1.2, 1.2);
    house.rotation.z=3000;
    house.position.x=-4000;
    house.position.y=-1000;
    house.position.z=-1000;

    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  // House 3
  const house3=new THREE.GLTFLoader();
  house3.load('./architecture/house3/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(5, 5, 5);
    house.rotation.z=-8050;
    house.position.x=4000;
    house.position.y=-1000;
    house.position.z=-3000;
      
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  // Car1
  const car1=new THREE.GLTFLoader();
  car1.load('./architecture/car1/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(2, 2, 2);
    house.rotation.z=-300;
    house.position.x= 3000;
    house.position.y=-1000;
    house.position.z=-1500;
          
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  // Car2
  const car2=new THREE.GLTFLoader();
  car2.load('./architecture/car2/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(2, 2, 2);
    house.rotation.z=-1000;
    house.position.x=-3500;
    house.position.y=-1000;
    house.position.z=-2500;
          
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  // water
  const water=new THREE.GLTFLoader();
  water.load('./architecture/water/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(50, 50, 50);
    house.rotation.z=-1000;
    house.position.x=-4000;
    house.position.y=-600;
    house.position.z=2500;
          
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  // garage
  const garage=new THREE.GLTFLoader();
  garage.load('./architecture/garage/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(0.15, 0.15, 0.15);
    house.rotation.z=-500;
    house.position.x=4000;
    house.position.y=-1000;
    house.position.z=2000;
          
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });  

  // StorageTank
  const storage=new THREE.GLTFLoader();
  storage.load('./architecture/storagetank/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(60, 60, 60);
    house.rotation.z=-7000;
    house.position.x=-3500;
    house.position.y=-1000;
    house.position.z=1400;
          
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });  

  // container
  const container=new THREE.GLTFLoader();
  container.load('./architecture/container/scene.gltf',function(gltf){
    house=gltf.scene.children[0];
    house.scale.set(1000, 1000, 1000);
    house.rotation.z=-2000;
    house.position.x=3500;
    house.position.y=-600;
    house.position.z=00;
          
    scene.add(gltf.scene);
  }, undefined,function(error){
    console.error(error);
  });

  /////////////////////////////////////////////////////////////////////

  ////////////////////// 오징어 (장애물) /////////////////////////////////
  // bigSquid
  const bigSquid=new THREE.GLTFLoader();
  bigSquid.load('./squid_game_bigSquid/scene.gltf',function(gltf){
    squid=gltf.scene.children[0];
    squid.scale.set(1.6,1.6,1.6);
    squid.rotation.z=500;
    squid.position.x=-1000;
    squid.position.y=-800;
    squid.position.z=500;
    
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });

  // bigSquid2
  const bigSquid2=new THREE.GLTFLoader();
  bigSquid2.load('./squid_game_bigSquid/scene.gltf',function(gltf){
    squid=gltf.scene.children[0];
    squid.scale.set(1.6, 1.6, 1.6);
    squid.rotation.z=3000;
    squid.position.x=1000;
    squid.position.y=-800;
    squid.position.z=-2000;
    
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });

  // Octopus
  const octopus=new THREE.GLTFLoader();
  octopus.load('./squid_game_octopus/scene.gltf',function(gltf){
    squid=gltf.scene.children[0];
    squid.scale.set(700,700,700);
    squid.rotation.z=1000;
    squid.position.x=1500;
    squid.position.y=-200;
    squid.position.z=2000;
    
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });
  ////////////////////// 오징어 (장애물) /////////////////////////////////

  // moveSquid
  const moveSquid=new THREE.GLTFLoader();
  moveSquid.load('./squid_game_cuteSquid/scene.gltf',function(gltf){
      mvsquid=gltf.scene.children[0];
      mvsquid.scale.set(150, 150, 150);
      mvsquid.position.x=-300;
      mvsquid.position.y=-800;
      mvsquid.position.z=-1000;
      
      scene.add(gltf.scene);
      animate_squid();
  }, undefined,function(error){
      console.error(error);
  });

  // moveSquid2
  const moveSquid2=new THREE.GLTFLoader();
  moveSquid2.load('./squid_game_cuteSquid/scene.gltf',function(gltf){
        mvsquid2=gltf.scene.children[0];
        mvsquid2.scale.set(150, 150, 150);
        mvsquid2.position.x=-600;
        mvsquid2.position.y=-800;
        mvsquid2.position.z=1000;
        
        scene.add(gltf.scene);
        animate_squid2();
    }, undefined,function(error){
        console.error(error);
    });

  ////////////////////// 움직이는 오징어 //////////////////////////////////

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

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
  
  // girl animation
function animate() {
  sleep(Math.random()*4000 + 4000)
  .then(() => girl.rotation.z=84.75)
  .then(() => sleep(Math.random()*2000 + 4000))
  .then(() => girl.rotation.z=0)
  .then(() => girl.translate.y=-10)
  .then(() => renderer.render(scene,camera))
  .then(() => requestAnimationFrame(animate));
}

function move_left(add)
{
  // player.rotation.z-=add; // change player's direction
  player.position.x+=add;

  camera.position.x+=add/5;

  renderer.render(scene,camera);
  requestAnimationFrame(animate); 
}

function move_right(add)
{
  // player.rotation.z+=add; // change player's direction
  player.position.x-=add;

  camera.position.x-=add/5;

  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

function move(add)
{
  player.position.z+=add;
  camera.position.z+=add/5;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

function move_back(add)
{
  player.position.z-=add;
  camera.position.z-=add/5;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
}

// animation Squid
function animate_squid(time) {
  time*=0.01;

  mvsquid.position.z=time;
  mvsquid.position.x=time;
  renderer.render(scene,camera);
  requestAnimationFrame(animate_squid);
}

// animation Squid
function animate_squid2(time) {
  time*=-0.01;
  mvsquid2.position.z=time;
  mvsquid2.position.x=time;
  renderer.render(scene,camera);
  requestAnimationFrame(animate_squid2);
}
