var scene;
var camera;
var width;
var height;

function initscene() {
    scene = new THREE.Scene();
}

function initCamera() {
    debugger;
    width = $('#canvas-frame').width();
    height = $('#canvas-frame').height();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 250;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(scene.position);
}

var renderer;

function initrenderer() {
    debugger;
    width = $('#canvas-frame').width();
    height = $('#canvas-frame').height();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff,1);//设置背景颜色
    renderer.shadowMap.Enabled = true;    // 告诉渲染器需要
    //document.getElementById('canvas-frame').appendChild(renderer.domElement);
}

function initObject() {
    var manager = new THREE.LoadingManager();
    var loader = new THREE.FBXLoader(manager);
    loader.load('webgl_resource/models/fbx/030.fbx', function (object) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.position.set(0,0,0);
            }
        } );
        scene.add(object);//将导入的模型添加到场景
    });
}

//初始化灯光
var light;

function initLight() {
    light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(100, 100, 100);
    scene.add(light);
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.minDistance = 200;
    controls.maxDistance = 600;
    controls.enablePan = true;
}

function start_shaonv() {
    initscene();
    initCamera();
    initrenderer();
    initObject();
    initLight();
    animate();
    initControls();
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
}

