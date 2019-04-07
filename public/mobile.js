(function() {

    console.log(' ');
    console.log('avd is a collaborative digital art project');
    console.log('email: avdgallery@gmail.com');
    console.log('insta: @avd.codes');

    console.log('%c       ', 'font-size: 420px; background: url(http://www.avd.codes/positronic.png) no-repeat;');
    console.log(' ');

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 3;
    camera.position.y = 1.5;

    var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor("#fff", 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 1.5;

    var suzanne;
    var theDon;
    var loadNum = document.getElementById('load-num');
    var loader = new THREE.GLTFLoader();

    loader.load(
        '/ya.glb',

        function(gltf) {
            console.log(gltf);
            console.log(gltf.animations);
            suzanne = gltf.scene;
            suzanne.castShadow = true;
            scene.add(suzanne);
        },

        function(xhr) {
            theDon = (xhr.loaded / 3159408).toFixed(1);
            console.log(theDon + ' loaded');
            if (theDon > 0.9) {
                loadNum.style.display = 'none';
            }
            loadNum.innerText = theDon;
        },

        function (error) {
    		console.log('An error happened', error);
    	}
    )

    // var loaderTwo = new THREE.FontLoader();
    // loaderTwo.load('TNR.json', function (font) {
    //     var geometry = new THREE.TextGeometry('v2.0', {
    //         font: font,
    // 		size: 1.5,
    // 		height: 0.15,
    // 		curveSegments: 15
    //     })
    //     geometry.center();
    //
    //     var material = new THREE.MeshPhongMaterial();
    //     suzanne = new THREE.Mesh(geometry, material)
    //     suzanne.material.color.set(0x5870CA);
    //
    //     scene.add(suzanne);
    // })

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 7 );
    directionalLight.position.set(0, -2, 5);
    scene.add( directionalLight );

    var render = function () {
      requestAnimationFrame( render );

      if (suzanne) {
          // suzanne.rotation.x += 0.01;
          suzanne.rotation.y += 0.01;
          // suzanne.rotation.z += 0.005;
      }

      renderer.render(scene, camera);
    };

    render();
}());
