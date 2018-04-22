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
    renderer.setClearColor(0xb9d3ff, 1);//设置背景颜色
    renderer.shadowMap.enabled = true;    // 告诉渲染器需要
    renderer.shadowMapSoft = true; // 软阴影打开
    renderer.shadowMapType = THREE.PCFSoftShadowMap; //边缘柔和   效果较好
    //document.getElementById('canvas-frame').appendChild(renderer.domElement);
}

//接收阴影
var plane;

function plan_fun() {
    var planeGeometry = new THREE.PlaneGeometry(300, 300);//平面
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;//将平面沿着x轴进行旋转
    plane.position.x = 0;
    plane.position.y = -85;
    plane.position.z = 0;
    plane.receiveShadow = true;//平面进行接受阴影
    scene.add(plane);
}


function initObject() {
    var manager = new THREE.LoadingManager();
    var loader = new THREE.FBXLoader(manager);
    loader.load('webgl_resource/models/fbx/030.fbx', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.position.set(0, 0, 0);
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(object);//将导入的模型添加到场景
    });
}

//初始化灯光
var light;
var spotlight;

function initLight() {
    light = new THREE.AmbientLight(0xFFFFFF, 0.8);
    light.position.set(100, 100, 100);
    scene.add(light);

    spotlight = new THREE.SpotLight(0xFFFFFF, 1);
    spotlight.position.set(0, 200, 0);
    spotlight.castShadow = true;
    spotlight.shadowMapHeight = 2048;
    spotlight.shadowMapWidth = 2048;
    scene.add(spotlight);
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
    plan_fun();
    initObject();
    initLight();
    animate();
    initControls();
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
}

