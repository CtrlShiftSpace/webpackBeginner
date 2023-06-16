// 載入Babylon.js module
import { ArcRotateCamera, Engine, HemisphericLight, Vector3, CreateGround, CreatePlane, Scene, StandardMaterial, Color3, CreateBox, Mesh, UtilityLayerRenderer, GizmoManager, AxisDragGizmo } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

// 
const canvas = document.getElementById("renderCanvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// 建立Babylon場景
var scene = new Scene(engine);

var defDist = 50;
var spheres = [];

// 建立攝影機
var camera = new ArcRotateCamera("Camera", 0, 10, 0, new Vector3(0, 0, 0), scene);
// This positions the camera
camera.setPosition(new Vector3(0, defDist, 0));

// This attaches the camera to the canvas
camera.attachControl(canvas, true);
//camera.mode = Camera.orthographic_CAMERA;
//camera.detachControl();

// 設定縮放範圍
camera.lowerRadiusLimit = 10;
camera.upperRadiusLimit = 100;

// 方向光源
var light = new HemisphericLight("light", new Vector3(0, 100, 0), scene) 
var rot_state = {x:camera.alpha , y:camera.beta};

//Materials
var redMat = new StandardMaterial("red", scene);
redMat.diffuseColor = new Color3(1, 0, 0);
redMat.emissiveColor = new Color3(1, 0, 0);
redMat.specularColor = new Color3(1, 0, 0);

var greenMat = new StandardMaterial("green", scene);
greenMat.diffuseColor = new Color3(0, 1, 0);
greenMat.emissiveColor = new Color3(0, 1, 0);
greenMat.specularColor = new Color3(0, 1, 0);

var blueMat = new StandardMaterial("blue", scene);
blueMat.diffuseColor = new Color3(0, 0, 1);
blueMat.emissiveColor = new Color3(0, 0, 1);
blueMat.specularColor = new Color3(0, 0, 1);

var blackMat = new StandardMaterial("black", scene);
blackMat.diffuseColor = new Color3(0, 0, 0);
blackMat.emissiveColor = new Color3(0, 0, 0);
blackMat.specularColor = new Color3(0, 0, 0);

var gridMat = new GridMaterial("grid", scene);
gridMat.mainColor = new Color3(1, 1, 1);
gridMat.lineColor = new Color3(0, 0, 0);

var box1 = CreateBox('box',{size: 1, width: 1, height: 1});
var whiteMat = new StandardMaterial("white", scene);
whiteMat.diffuseColor = new Color3(1, 1, 1);
whiteMat.emissiveColor = new Color3(1, 1, 1);
whiteMat.specularColor = new Color3(1, 1, 1);
box1.position.y = 3;
box1.material = gridMat;

var box2 = CreateBox('box',{size: 1, width: 4, height: 2, depth: 5});
box2.position.x = 6;
box2.position.y = 3;
box2.material = gridMat;

var box3 = CreateBox('box',{size: 1, width: 4, height: 2, depth: 5});
box3.position.x = 4;
box3.position.y = 1;
box3.material = gridMat;

spheres.push(box1);
spheres.push(box2);
spheres.push(box3);

var ground = CreateGround("ground1", {width: 100, height: 100, subdivisions: 2, color: 'black', sideOrientation: Mesh.DOUBLESIDE}, scene);
ground.material = new GridMaterial("groundMaterial", scene);

var plane3 = CreatePlane("plane3", {width: 200, height: 200, sideOrientation: Mesh.DOUBLESIDE});
plane3.position.y = 0;
plane3.position.z = -50;
plane3.material = new GridMaterial("groundMaterial", scene);

// GUI
var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

// 前視圖
var btnFront = Button.CreateSimpleButton("btnFront", "前視圖");
// 俯視圖
var btnTop = Button.CreateSimpleButton("btnTop", "俯視圖");

btnFront.width = "100px";
btnFront.height = "50px";
btnFront.color = "white";
btnFront.fontSize = 20;
btnFront.background = "grey";
btnFront.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
btnFront.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
btnFront.onPointerUpObservable.add(function() {
    camera.setPosition(new Vector3(0, 0, defDist));
    rot_state = {x:camera.alpha , y:camera.beta};

    btnFront.background = "red";
    btnTop.background = "grey";
});
advancedTexture.addControl(btnFront);

btnTop.width = "100px";
btnTop.height = "50px";
btnTop.top = "60px";
btnTop.color = "white";
btnTop.fontSize = 20;
btnTop.background = "red";
btnTop.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
btnTop.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
btnTop.onPointerUpObservable.add(function() {
    camera.setPosition(new Vector3(0, defDist, 0));
    rot_state = {x:camera.alpha , y:camera.beta};

    btnFront.background = "grey";
    btnTop.background = "red";
});
advancedTexture.addControl(btnTop);

scene.registerBeforeRender(function(){
    //camera.alpha = rot_state.x;
    //camera.beta = rot_state.y;
});

// Create utility layer the gizmo will be rendered on
var utilLayer = new UtilityLayerRenderer(scene);

// Initialize GizmoManager
var gizmoManager = new GizmoManager(scene);
gizmoManager.boundingBoxGizmoEnabled = false;
gizmoManager.positionGizmoEnabled = true;
gizmoManager.rotationGizmoEnabled = false;
gizmoManager.scaleGizmoEnabled = false;



// Restrict gizmos to only spheres
gizmoManager.attachableMeshes = spheres;
// Toggle gizmos with keyboard buttons
/*document.onkeydown = (e)=>{
    if(e.key == 'w'){
        gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled
    }
    if(e.key == 'e'){
        gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled
    }
    if(e.key == 'r'){
        gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled
    }
    if(e.key == 'q'){
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled
    }
}*/

// 往X軸拖動事件
gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragStartObservable.add(() => {
    console.log("Position gizmo's x axis started to be dragged");
});
gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(() => {
    console.log("Position gizmo's x axis drag was ended");
});

// Create the gizmo and attach to the sphere
/*var gizmoX = new AxisDragGizmo(new Vector3(1,0,0), Color3.FromHexString("#00b894"), utilLayer);
var gizmoZ = new AxisDragGizmo(new Vector3(0,0,1), Color3.FromHexString("#00b894"), utilLayer);
gizmoX.attachedMesh = box1;
gizmoZ.attachedMesh = box1;*/

/*gizmoX.updateGizmoRotationToMatchAttachedMesh = false;
gizmoX.updateGizmoPositionToMatchAttachedMesh = true;
gizmoZ.updateGizmoRotationToMatchAttachedMesh = false;
gizmoZ.updateGizmoPositionToMatchAttachedMesh = true;*/

// Toggle gizmo on keypress
/*document.onkeydown = ()=>{
    gizmo.attachedMesh = !gizmo.attachedMesh ? sphere : null
}*/

    //return scene;

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});