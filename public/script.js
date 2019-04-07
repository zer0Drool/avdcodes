(function() {

console.log(' ');
console.log('avd is a collaborative digital art project');
console.log('email: avdgallery@gmail.com');
console.log('insta: @avd.codes');

console.log('%c       ', 'font-size: 420px; background: url(http://www.avd.codes/positronic.png) no-repeat;');
console.log(' ');

var cubeX = document.getElementById('environment-cube');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, 1792/913.5, 0.1, 1000 );
camera.position.z = 3;
camera.position.y = 1;

var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
cubeX.appendChild( renderer.domElement );
renderer.setClearColor("#fff", 0);

renderer.setSize( 1792, 913.5 );

var suzanne;
var loadNum = document.getElementById('load-num');
var theDon;
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
// 		size: 1,
// 		height: 0.1,
// 		curveSegments: 15
//     });
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

function init() {

    var environmentWrap = document.getElementById('environment-wrap');
    var xDown;
    var xDiff;
    var rotato = 0;
    var transitioning = false;
    var currPos = 0;
    var positions = [
        ['0deg', '0deg', '0deg', '0px', '-451px', '-1090px'],
        ['0deg', '-10deg', '0deg', '30px', '-371px', '-80px'],
        ['-2deg', '131deg', '10deg', '731px', '-290px', '376px'],
        ['45deg', '-90deg', '-15deg', '71px', '-1390px', '-104px'],
        ['-43deg', '-3deg', '13deg', '333px', '1261px', '-1085px']
    ]

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 37 && !transitioning) {
            move('back');
        }
        if (e.keyCode === 39 && !transitioning) {
            move('forward');
        }
    })

    var moved = false;

    function move(direction) {
        if (!moved) {
            moved = true;
            document.getElementById('help').style.display = 'none';
        }
        direction === 'forward' ? currPos++ : currPos--;
        if (currPos < 0) {
            currPos = positions.length - 1
        }
        if (currPos > positions.length - 1) {
            currPos = 0
        }
        transitioning = true;
        cubeX.style.transform = `rotateX(${positions[currPos][0]}) rotateY(${positions[currPos][1]}) rotateZ(${positions[currPos][2]}) translateX(${positions[currPos][3]}) translateY(${positions[currPos][4]}) translateZ(${positions[currPos][5]})`;

        setTimeout(() => {
            transitioning = false;
        }, 1000)
    }

}

init();

}());
