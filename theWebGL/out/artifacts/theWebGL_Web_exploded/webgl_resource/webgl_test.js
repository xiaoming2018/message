var scene;

function initscene() {
    scene = new THREE.Scene();
}

var camera;

function initCamera() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.x = 4;
    camera.position.y = 1;
    camera.position.z = 3;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(scene.position);
}

var renderer;

function initrenderer() {
    debugger;
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);//设置背景颜色
    renderer.shadowMap.Enabled = true;    // 告诉渲染器需要
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
}

var cube;

function initCube() {
    var cubeGeometry = new THREE.CubeGeometry(1, 1, 1);    // Geometry: 翻译 立方体几何
    var cubeMaterial = new THREE.MeshLambertMaterial({color: '#12B7F5'});    // 立方体是0xff0000颜色
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);    // 把立方体和他的外观合并一下
    cube.castShadow = true;    // 立方体的阴影
    cube.position.x = 1;    // 立方体的坐标位置
    cube.position.y = 1;
    cube.position.z = 1;
    scene.add(cube);

    var planceGeometry = new THREE.PlaneGeometry(5, 5);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planceGeometry, planeMaterial);
    plane.receiveShadow = true;         // 平面接收阴影
    plane.rotation.x = -0.5 * Math.PI;    // 绕x轴旋转90度
    plane.position.x = 0;    // 平面坐标位置
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
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
            }
        });
        object.castShadow = true;  // 模型也产生阴影
        scene.add(object);//将导入的模型添加到场景
    });
}

//初始化灯光
var light;

function initLight() {
    // light = new THREE.AmbientLight(0xFFFFFF);
    // light.position.set(0, -10, 0);
    // scene.add(light);
    var spotLight = new THREE.SpotLight(0xffffff);  //聚光灯
    spotLight.position.set(10, 10, 1);
    spotLight.castShadow = true;    // 让光源产生阴影
    spotLight.target = cube;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 30;
    //spotLight.shadowCameraFov = 30;
    spotLight.shadowCameraVisible = true;

    spotLight.shadowMapHeight = 1024;//设置分辨率
    spotLight.shadowMapWidth = 1024;
    scene.add(spotLight);
}

function animate() {
    //mesh.rotation.y +=0.01;
    //boxMesh.rotateY(0.01);
    //controls.update();
    renderer.render(scene, camera);
    //stats.update();
    requestAnimationFrame(animate);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    //设置相机距离原点的最近距离
    controls.minDistance = 2;
    //设置相机距离原点的最远距离
    controls.maxDistance = 600;
    //是否开启右键拖拽
    controls.enablePan = true;
}

function start() {
    debugger;
    initscene();
    initCamera();
    initrenderer();
    initCube();
    initObject();
    initLight();
    animate();
    initControls();

}

function start1() {
    start();
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        content: $("#canvas-frame")
    });

}