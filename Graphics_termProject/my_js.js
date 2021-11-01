let scene, camera, renderer;
window.onload=function init() {
  const canvas = document.getElementById( "gl-canvas" );
  const renderer = new THREE.WebGLRenderer({canvas});
  
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;


  
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.5;
    const far = 100;
    ///camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,100,30000);
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;
    camera.position.y=0.3;
    camera.position.x=3;
    const controls=new THREE.OrbitControls(camera, canvas);
    controls.target.set(1, 1, 0);
    controls.update();
  
    const scene = new THREE.Scene();
  
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
//     const material = new THREE.MeshPhongMaterial({color,
//     opacity:0.5,
// transparent:true,});
const material = new THREE.MeshPhongMaterial({color});
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

    function render(time) {
        // time *= 0.001;
    
        
        // cubes.forEach((cube, ndx) => {
        //   const speed = 1 + ndx * .1;
        //   const rot = time * speed;
        //   cube.rotation.x = rot;
        //   cube.rotation.y = rot;
        // });
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
    
      requestAnimationFrame(render);

}

