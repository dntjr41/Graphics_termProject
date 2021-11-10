let scene, camera, renderer;
let player_loaded=0;

window.onload=function init() {
  const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
  let catchtime=0; // when girl turn around
  

  let add=100;
  // keyboard function
  window.addEventListener("keydown", e => {
    const key=e.key;
    console.log(key);
    console.log(e);
    if(catchtime==0)
    {
      if(key=='ArrowUp') // up
      {
        move(add);
      }
      if(key=='ArrowDown') // down
      {
        move_back(add);
      }
      if(key=='ArrowLeft') // left
      {
        move_left(add);
      }
      if(key=='ArrowRight') // right
      {
        move_right(add);
      }
      if(e.code=='Space') // space
      {
      
      }
    }
    else if(catchtime==1)
    {
      if(key=='ArrowUp' || key=='ArrowDown' || key=='ArrowLeft' || key=='ArrowRight' )
      {
       alert("술래에게 걸림 게임 종료");
      }
    }
   
  });
  window.addEventListener("keyup", e => { // when keyboard up
    const key = document.getElementById(e.key);
    if (key) console.log(e);
  });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,100,30000);
  //camera=new THREE.PerspectiveCamera(100,2,0.5,100);
  //camera.position.set(900,-2000,-900);
  camera.position.set(0,-100,-7000);
  console.log(camera.position);
  // camera.position.set(0,0,-100);
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls=new THREE.OrbitControls(camera, renderer.domElement);

  /////////////////////////////////////////////////////////
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );
  
  // create a global audio source
  var sound = new THREE.Audio( listener );
  
  var audioLoader = new THREE.AudioLoader();
  
  //Load a sound and set it as the Audio object's buffer
  audioLoader.load( './media/squidVoice.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop(true);
    sound.setVolume(0.1);
    sound.play();
    }
  );
  /////////////////////////////////////////////////////////


  // ground
  var groundTexture = new THREE.TextureLoader().load( "./media/floor.jpg" );
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
  var rightwallTexture = new THREE.TextureLoader().load( "/media/floor.jpg" );
  rightwallTexture.wrapS = rightwallTexture.wrapT = THREE.RepeatWrapping;
  rightwallTexture.repeat.set( 10000, 10000 );
  rightwallTexture.anisotropy = 16;
  rightwallTexture.encoding = THREE.sRGBEncoding;
  var rightwallMaterial=new THREE.MeshStandardMaterial({map:rightwallTexture});
  var right_wall_mesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(10000,10000),rightwallMaterial);
  
  right_wall_mesh.rotation.y = - Math.PI / 2;
  right_wall_mesh.position.x = -5000;
  right_wall_mesh.receiveShadow = true;
  right_wall_mesh.rotation.y=359.71836;
  scene.add( right_wall_mesh );

  // left wall
  var leftwallTexture = new THREE.TextureLoader().load( "/media/floor.jpg" );
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
	line_loader.load('./object/squid_game_finish_line/scene.gltf', function(gltf){
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
  player_loader.load('./object/squid_game_player/scene.gltf',function(gltf){
  player=gltf.scene.children[0];
  console.log(gltf)
  player.scale.set(200,200,200);
    player.position.x=0;
    player.position.y=-1000;
    
    player.position.z=-4800;
    player_loaded=1;
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });
  // animation player.
  let animation_loader=new FBXLoader();
  animation_loader.load('./object/animation_player/anim.fbx',function(object){
    scene.add(object);

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
  bigSquid.load('./object/squid_game_bigSquid/scene.gltf',function(gltf){
    squid1=gltf.scene.children[0];
    squid1.scale.set(1.6,1.6,1.6);
    squid1.rotation.z=500;
    squid1.position.x=-1000;
    squid1.position.y=-800;
    squid1.position.z=500;
    console.log("big squid loaded");
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });

  // bigSquid2
  const bigSquid2=new THREE.GLTFLoader();
  bigSquid2.load('./object/squid_game_bigSquid/scene.gltf',function(gltf){
    squid2=gltf.scene.children[0];
    squid2.scale.set(1.6, 1.6, 1.6);
    squid2.rotation.z=3000;
    squid2.position.x=1000;
    squid2.position.y=-800;
    squid2.position.z=-2000;
    
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });

  // Octopus
  const Octopus=new THREE.GLTFLoader();
  Octopus.load('./object/squid_game_octopus/scene.gltf',function(gltf){
    octopus=gltf.scene.children[0];
    octopus.scale.set(700,700,700);
    octopus.rotation.z=1000;
    octopus.position.x=1500;
    octopus.position.y=-200;
    octopus.position.z=2000;
    
    scene.add(gltf.scene);
    //animate();
  }, undefined,function(error){
    console.error(error);
  });
  ////////////////////// 오징어 (장애물) /////////////////////////////////

  // moveSquid
  const moveSquid=new THREE.GLTFLoader();
  moveSquid.load('./object/squid_game_cuteSquid/scene.gltf',function(gltf){
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
  moveSquid2.load('./object/squid_game_cuteSquid/scene.gltf',function(gltf){
        mvsquid2=gltf.scene.children[0];
        mvsquid2.scale.set(150, 150, 150);
        mvsquid2.position.x=-200;
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
  sleep(4800)
  .then(() => girl.rotation.z=84.75)
  .then(() =>catchtime=1)
  .then(() => sleep(4800))
  .then(() => girl.rotation.z=0)
  .then(() => girl.translate.y=-10)
  .then(() => catchtime=0)
  .then(() => renderer.render(scene,camera))
  .then(() => requestAnimationFrame(animate));
}
/////////////////////////////////////////////////////////////////////////////////
// 장애물 충돌 시 게임 종료 -> squid1, squid2, octopus 좌표 재설정 필요, 장애물 충돌 조건 함수화 필요
function move_left(add)
{
  // player.rotation.z-=add; // change player's direction
  player.position.x+=add;

  camera.position.x+=add/3;

  renderer.render(scene,camera);

  min1_x=Math.round(mvsquid.position.x)-16;
  max1_x=Math.round(mvsquid.position.x)+16;
  min1_z=Math.round(mvsquid.position.z)-16;
  max1_z=Math.round(mvsquid.position.z)+16;
  min2_x=Math.round(mvsquid2.position.x)-16;
  max2_x=Math.round(mvsquid2.position.x)+16;
  min2_z=Math.round(mvsquid2.position.z)-16;
  max2_z=Math.round(mvsquid2.position.z)+16;
  min_sq1_z=-4300;
  max_sq1_z=-1500;
  min_sq1_x=500;
  max_sq1_x=1000;
  min_sq2_z=-1700;
  max_sq2_z=900;
  max_sq2_x=-600;
  min_sq2_x=-1400
  min_oc_z=-2000;
  max_oc_z=700;
  min_oc_x=200;
  max_oc_x=2400;

  if((min1_x<=player.position.x&&player.position.x<=max1_x&&min1_z<=player.position.z&&player.position.z<=max1_z)||(min2_x<=player.position.x&&player.position.x<=max2_x&&min2_z<=player.position.z&&player.position.z<=max2_z)||(min_sq1_x<=player.position.x&&player.position.x<=max_sq1_x&&min_sq1_z<=player.position.z&&player.position.z<=max_sq1_z)||(min_sq2_x<=player.position.x&&player.position.x<=max_sq2_x&&min_sq2_z<=player.position.z&&player.position.z<=max_sq2_z)||(min_oc_x<=player.position.x&&player.position.x<=max_oc_x&&min_oc_z<=player.position.z&&player.position.z<=max_oc_z))
    {
      console.log("충돌!");
      alert("장애물에 부딪힘, 게임 종료")
    }

  requestAnimationFrame(animate); 
}

function move_right(add)
{
  // player.rotation.z+=add; // change player's direction
  player.position.x-=add;

  camera.position.x-=add/3;
  renderer.render(scene,camera);

 min1_x=Math.round(mvsquid.position.x)-16;
  max1_x=Math.round(mvsquid.position.x)+16;
  min1_z=Math.round(mvsquid.position.z)-16;
  max1_z=Math.round(mvsquid.position.z)+16;
  min2_x=Math.round(mvsquid2.position.x)-16;
  max2_x=Math.round(mvsquid2.position.x)+16;
  min2_z=Math.round(mvsquid2.position.z)-16;
  max2_z=Math.round(mvsquid2.position.z)+16;
  min_sq1_z=-4300;
  max_sq1_z=-1500;
  min_sq1_x=500;
  max_sq1_x=1000;
  min_sq2_z=-1700;
  max_sq2_z=900;
  max_sq2_x=-600;
  min_sq2_x=-1400
  min_oc_z=-2000;
  max_oc_z=700;
  min_oc_x=200;
  max_oc_x=2400;

  if((min1_x<=player.position.x&&player.position.x<=max1_x&&min1_z<=player.position.z&&player.position.z<=max1_z)||(min2_x<=player.position.x&&player.position.x<=max2_x&&min2_z<=player.position.z&&player.position.z<=max2_z)||(min_sq1_x<=player.position.x&&player.position.x<=max_sq1_x&&min_sq1_z<=player.position.z&&player.position.z<=max_sq1_z)||(min_sq2_x<=player.position.x&&player.position.x<=max_sq2_x&&min_sq2_z<=player.position.z&&player.position.z<=max_sq2_z)||(min_oc_x<=player.position.x&&player.position.x<=max_oc_x&&min_oc_z<=player.position.z&&player.position.z<=max_oc_z))
    {
      console.log("충돌!");
      alert("장애물에 부딪힘, 게임 종료")
    }

  requestAnimationFrame(animate);
}

function move(add)
{
  player.position.z+=add;
  camera.position.z+=add/3;
  renderer.render(scene,camera);
  console.log("player position: ",player.position);
  min1_x=Math.round(mvsquid.position.x)-16;
  max1_x=Math.round(mvsquid.position.x)+16;
  min1_z=Math.round(mvsquid.position.z)-16;
  max1_z=Math.round(mvsquid.position.z)+16;
  min2_x=Math.round(mvsquid2.position.x)-16;
  max2_x=Math.round(mvsquid2.position.x)+16;
  min2_z=Math.round(mvsquid2.position.z)-16;
  max2_z=Math.round(mvsquid2.position.z)+16;
  min_sq1_z=-4300;
  max_sq1_z=-1500;
  min_sq1_x=500;
  max_sq1_x=1000;
  min_sq2_z=-1700;
  max_sq2_z=900;
  max_sq2_x=-600;
  min_sq2_x=-1400
  min_oc_z=-2000;
  max_oc_z=700;
  min_oc_x=200;
  max_oc_x=2400;

  if((min1_x<=player.position.x&&player.position.x<=max1_x&&min1_z<=player.position.z&&player.position.z<=max1_z)||(min2_x<=player.position.x&&player.position.x<=max2_x&&min2_z<=player.position.z&&player.position.z<=max2_z)||(min_sq1_x<=player.position.x&&player.position.x<=max_sq1_x&&min_sq1_z<=player.position.z&&player.position.z<=max_sq1_z)||(min_sq2_x<=player.position.x&&player.position.x<=max_sq2_x&&min_sq2_z<=player.position.z&&player.position.z<=max_sq2_z)||(min_oc_x<=player.position.x&&player.position.x<=max_oc_x&&min_oc_z<=player.position.z&&player.position.z<=max_oc_z))
    {
      console.log("충돌!");
      alert("장애물에 부딪힘, 게임 종료")
    }

  requestAnimationFrame(animate);
}

function move_back(add)
{
  player.position.z-=add;
  camera.position.z-=add/3;
  renderer.render(scene,camera);

  min1_x=Math.round(mvsquid.position.x)-16;
  max1_x=Math.round(mvsquid.position.x)+16;
  min1_z=Math.round(mvsquid.position.z)-16;
  max1_z=Math.round(mvsquid.position.z)+16;
  min2_x=Math.round(mvsquid2.position.x)-16;
  max2_x=Math.round(mvsquid2.position.x)+16;
  min2_z=Math.round(mvsquid2.position.z)-16;
  max2_z=Math.round(mvsquid2.position.z)+16;
  min_sq1_z=-4300;
  max_sq1_z=-1500;
  min_sq1_x=500;
  max_sq1_x=1000;
  min_sq2_z=-1700;
  max_sq2_z=900;
  max_sq2_x=-600;
  min_sq2_x=-1400
  min_oc_z=-2000;
  max_oc_z=700;
  min_oc_x=200;
  max_oc_x=2400;

  if((min1_x<=player.position.x&&player.position.x<=max1_x&&min1_z<=player.position.z&&player.position.z<=max1_z)||(min2_x<=player.position.x&&player.position.x<=max2_x&&min2_z<=player.position.z&&player.position.z<=max2_z)||(min_sq1_x<=player.position.x&&player.position.x<=max_sq1_x&&min_sq1_z<=player.position.z&&player.position.z<=max_sq1_z)||(min_sq2_x<=player.position.x&&player.position.x<=max_sq2_x&&min_sq2_z<=player.position.z&&player.position.z<=max_sq2_z)||(min_oc_x<=player.position.x&&player.position.x<=max_oc_x&&min_oc_z<=player.position.z&&player.position.z<=max_oc_z))
    {
      console.log("충돌!");
      alert("장애물에 부딪힘, 게임 종료")
    }

  requestAnimationFrame(animate);
}
}

// animation Squid
function animate_squid(time) {
  time*=0.5;
  mvsquid.position.x=time;

  if (mvsquid.position.x > 5000) {
    mvsquid.position.x=5000;
    time*=-0.75;
    mvsquid.position.x=8000+time;
    
    if (mvsquid.position.x < -4000) {
      mvsquid.position.x=-4000;
      time*=-0.75;
      mvsquid.position.x=-13000+time;

      if (mvsquid.position.x > 5000) {
        mvsquid.position.x=5000;
        time*=-1.0;
        mvsquid.position.x=23000+time;

        if (mvsquid.position.x < -4000) {
          mvsquid.position.x=-4000;
          time*=-1.0;
          mvsquid.position.x=-30000+time;

          if (mvsquid.position.x > 5000) {
            mvsquid.position.x = 5000;
            time*=-0.75;
            mvsquid.position.x=30000+time;

            if (mvsquid.position.x < -4000) {
              mvsquid.position.x=-4000;
              time*=-0.75;
              mvsquid.position.x=-30000+time;
            }
          }
        }
      }
    }
  }

  renderer.render(scene,camera);

  if(player_loaded==1)
  {
    // console.log("squid position: ",mvsquid.position);
    // console.log("player position: ",player.position);
    min_x=Math.round(mvsquid.position.x)-16;
    max_x=Math.round(mvsquid.position.x)+16;
    min_z=Math.round(mvsquid.position.z)-16;
    max_z=Math.round(mvsquid.position.z)+16;
    if(min_x<=player.position.x&&player.position.x<=max_x&&min_z<=player.position.z&&player.position.z<=max_z)
    {
     
      alert("장애물에 부딪힘, 게임 종료")
    }
  }

  requestAnimationFrame(animate_squid);
}

// animation Squid
function animate_squid2(time) {
  time*=0.5;
  mvsquid2.position.z=time;

  if (mvsquid2.position.z > 5000) {
    mvsquid2.position.z=5000;
    time*=-0.75;
    mvsquid2.position.z=8000+time;
    
    if (mvsquid2.position.z < -4000) {
      mvsquid2.position.z=-4000;
      time*=-0.75;
      mvsquid2.position.z=-13000+time;

      if (mvsquid2.position.z > 5000) {
        mvsquid2.position.z=5000;
        time*=-1.0;
        mvsquid2.position.z=23000+time;

        if (mvsquid2.position.z < -4000) {
          mvsquid2.position.z=-4000;
          time*=-1.0;
          mvsquid2.position.z=-30000+time;

          if (mvsquid2.position.z > 5000) {
            mvsquid2.position.z = 5000;
            time*=-0.75;
            mvsquid2.position.z=30000+time;

            if (mvsquid2.position.z < -4000) {
              mvsquid2.position.z=-4000;
              time*=-0.75;
              mvsquid2.position.z=-30000+time;
            }
          }
        }
      }
    }
  }
  
  renderer.render(scene,camera);
  
  if(player_loaded==1)
  {
   
  min_x=Math.round(mvsquid2.position.x)-16;
  max_x=Math.round(mvsquid2.position.x)+16;
  min_z=Math.round(mvsquid2.position.z)-16;
  max_z=Math.round(mvsquid2.position.z)+16;
  
  
  if(min_x<=player.position.x&&player.position.x<=max_x&&min_z<=player.position.z&&player.position.z<=max_z)
    {
     
      alert("장애물에 부딪힘, 게임 종료")
    }
  }

  requestAnimationFrame(animate_squid2);
}