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
    camera.position.z = 2.5;
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
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load('webgl_resource/models/texture/female.jpg', function (image) {
        texture.image = image;
        texture.needsUpdate = true;
    });

    var material = new THREE.MeshBasicMaterial({map: texture});
    var loader = new THREE.OBJLoader(manager);
    loader.load('webgl_resource/models/obj/Female.obj', function (object) {
        var mesh = new THREE.Mesh(object, material);
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
                child.position.set(0,-0.8,0);
            }
        });
        object.castShadow = true;  // 模型也产生阴影
        scene.add(object);//将导入的模型添加到场景
    });
}

//初始化灯光
var light;

function initLight() {
    light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(10, 10, 10);
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
    controls.minDistance = 2;
    controls.maxDistance = 100;
    controls.enablePan = true;
}

function start() {
    debugger;
    initscene();
    initCamera();
    initrenderer();
    initObject();
    initLight();
    animate();
    initControls();
    document.getElementById('canvas-frame').appendChild(renderer.domElement);

}
