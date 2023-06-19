// 載入Babylon.js module
import * as BABYLON from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

var defDist = 50;

const TOP_VIEW_SCENE = 0x00;
const FRONT_VIEW_SCENE = 0x01;

var cur_view_scene = TOP_VIEW_SCENE;
var spheres = [];

// 渲染的canvas
const canvas = document.getElementById("renderCanvas");
// 建立Babylon引擎
const engine = new BABYLON.Engine(canvas);
// 建立Babylon場景
var scene = new BABYLON.Scene(engine);
// 建立攝影機
const camera = new BABYLON.FreeCamera(
    "Camera",
    new BABYLON.Vector3(0, defDist, 0),
    scene
);

// var camera = new BABYLON.ArcRotateCamera(
//     "Camera", // 攝影機名稱
//     0, // 攝影機alpha值，控制水平旋轉角度
//     10, // 攝影機beta值，控制垂直旋轉角度
//     0, // 攝影機半徑
//     new BABYLON.Vector3(0, 0, 0), // 攝影機目標點
//     scene
// );

// 將攝影機附加到canvas上
camera.attachControl(canvas, true);
//camera.inputs.attachInput(camera.inputs.attached.mouse);

// 設定攝影機位置
//camera.position.set(0, 10, 0);//  setPosition(new BABYLON.Vector3(0, defDist, 0));
camera.setTarget(BABYLON.Vector3.Zero());

//camera.mode = Camera.orthographic_CAMERA;
//camera.detachControl();

// 設定縮放範圍
camera.lowerRadiusLimit = 10;
camera.upperRadiusLimit = 100;

// 光源
var light = new BABYLON.HemisphericLight(
    "light", // 光源名稱
    new BABYLON.Vector3(0, 100, 0),  // 光源方向
    scene // 光源所在場景
);
var rot_state = {x:camera.alpha , y:camera.beta};

//Materials
var redMat = new BABYLON.StandardMaterial("red", scene);
redMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
redMat.specularColor = new BABYLON.Color3(1, 0, 0);

var greenMat = new BABYLON.StandardMaterial("green", scene);
greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0);
greenMat.specularColor = new BABYLON.Color3(0, 1, 0);

var blueMat = new BABYLON.StandardMaterial("blue", scene);
blueMat.diffuseColor = new BABYLON.Color3(0, 0, 1);
blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
blueMat.specularColor = new BABYLON.Color3(0, 0, 1);

var blackMat = new BABYLON.StandardMaterial("black", scene);
blackMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
blackMat.emissiveColor = new BABYLON.Color3(0, 0, 0);
blackMat.specularColor = new BABYLON.Color3(0, 0, 0);

var gridMat = new GridMaterial("grid", scene);
gridMat.mainColor = new BABYLON.Color3(1, 1, 1);
gridMat.lineColor = new BABYLON.Color3(0, 0, 0);

var box1 = BABYLON.MeshBuilder.CreateBox('box',{size: 1, width: 1, height: 1});
var whiteMat = new BABYLON.StandardMaterial("white", scene);
whiteMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
whiteMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
whiteMat.specularColor = new BABYLON.Color3(1, 1, 1);
box1.position.y = 3;
box1.material = gridMat;

var box2 = BABYLON.MeshBuilder.CreateBox('box',{size: 1, width: 4, height: 2, depth: 5});
box2.position.x = 6;
box2.position.y = 3;
box2.material = gridMat;

var box3 = BABYLON.MeshBuilder.CreateBox('box',{size: 1, width: 4, height: 2, depth: 5});
box3.position.x = 4;
box3.position.y = 1;
box3.material = gridMat;

spheres.push(box1);
spheres.push(box2);
spheres.push(box3);

// 創建地面
var ground = BABYLON.MeshBuilder.CreateGround(
    "ground1",
    {
        width: 100,
        height: 100,
        subdivisions: 2,
        color: 'black',
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    },
    scene
);

ground.material = new GridMaterial("groundMaterial", scene);

// 創建平面(垂直於地面)
var plane3 = BABYLON.MeshBuilder.CreatePlane(
    "plane3",
    {
        width: 200,
        height: 200,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    },
    scene
);
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
    cur_view_scene = FRONT_VIEW_SCENE;
    camera.position.set(0, 10, defDist);
    camera.setTarget(BABYLON.Vector3.Zero());
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
    cur_view_scene = TOP_VIEW_SCENE;
    camera.position.set(0, defDist, 0);
    camera.setTarget(BABYLON.Vector3.Zero());
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
var utilLayer = new BABYLON.UtilityLayerRenderer(scene);

// Initialize GizmoManager
var gizmoManager = new BABYLON.GizmoManager(scene);
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

// 創建球
const sphere = BABYLON.MeshBuilder.CreateSphere(
    "Sphere", // 球的名稱
    { diameter: 2} ,// 球的直徑
    scene // 球所在的場景
);
sphere.position.set(0, 1, 0);
sphere.scaling.set(0.5, 0.5, 0.5);

// 旋轉方式
// 1. 物體本身旋轉
//sphere.rotation.set(0, Math.PI / 4, 0);
// 2. 依照特定點旋轉
sphere.rotateAround(
    new BABYLON.Vector3(0,0,0), // 旋轉中心點
    new BABYLON.Vector3(0,1,0), // 旋轉軸
    Math.PI / 4 // 旋轉角度
)

var pointerDragBehavior = new BABYLON.PointerDragBehavior({});
pointerDragBehavior.useObjectOrientationForDragging = false;

// Listen to drag events
pointerDragBehavior.onDragStartObservable.add((event)=>{
    console.log("dragStart");
    console.log(event);
})
pointerDragBehavior.onDragObservable.add((event)=>{
    console.log("drag");
    console.log(event);
})
pointerDragBehavior.onDragEndObservable.add((event)=>{
    console.log("dragEnd");
    console.log(event);
})

// If handling drag events manually is desired, set move attached to false
// pointerDragBehavior.moveAttached = false;
sphere.addBehavior(pointerDragBehavior);

// 移除預設的鍵盤操作類型
camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

// Create our own manager:
var FreeCameraKeyboardArrowInput = function () {
    this._keys = [];
    this.keysLeft = [37];
    this.keysTop = [38];
    this.keysRight = [39];
    this.keysBottom = [40];
    this.horizontalMove = 1;
    this.verticalMove = 1;
}

// Hooking keyboard events
FreeCameraKeyboardArrowInput.prototype.attachControl = function (noPreventDefault) {
    var _this = this;
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
    if (!this._onKeyDown) {
        element.tabIndex = 1;
        this._onKeyDown = function (evt) {
            if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                _this.keysRight.indexOf(evt.keyCode) !== -1 ||
                _this.keysTop.indexOf(evt.keyCode) !== -1 ||
                _this.keysBottom.indexOf(evt.keyCode) !== -1) {
                var index = _this._keys.indexOf(evt.keyCode);
                if (index === -1) {
                    _this._keys.push(evt.keyCode);
                }
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            }
        };
        this._onKeyUp = function (evt) {
            if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                _this.keysRight.indexOf(evt.keyCode) !== -1 ||
                _this.keysTop.indexOf(evt.keyCode) !== -1 ||
                _this.keysBottom.indexOf(evt.keyCode) !== -1) {
                var index = _this._keys.indexOf(evt.keyCode);
                if (index >= 0) {
                    _this._keys.splice(index, 1);
                }
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            }
        };

        element.addEventListener("keydown", this._onKeyDown, false);
        element.addEventListener("keyup", this._onKeyUp, false);
        BABYLON.Tools.RegisterTopRootEvents(canvas, [
            { name: "blur", handler: this._onLostFocus }
        ]);
    }
};

// Unhook
FreeCameraKeyboardArrowInput.prototype.detachControl = function () {
    if (this._onKeyDown) {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        element.removeEventListener("keydown", this._onKeyDown);
        element.removeEventListener("keyup", this._onKeyUp);
        BABYLON.Tools.UnregisterTopRootEvents(canvas, [
            { name: "blur", handler: this._onLostFocus }
        ]);
        this._keys = [];
        this._onKeyDown = null;
        this._onKeyUp = null;
    }
};

// This function is called by the system on every frame
FreeCameraKeyboardArrowInput.prototype.checkInputs = function () {
    if (this._onKeyDown) {
        var camera = this.camera;
        // Keyboard
        for (var index = 0; index < this._keys.length; index++) {
            var keyCode = this._keys[index];
            var hOffset = 0,
                vOffset = 0;
            if (this.keysLeft.indexOf(keyCode) !== -1) {
                hOffset = this.horizontalMove;
            }
            else if (this.keysRight.indexOf(keyCode) !== -1) {
                hOffset = -this.horizontalMove;
            }
            else if (this.keysTop.indexOf(keyCode) !== -1) {
                vOffset = -this.verticalMove;
            }
            else if (this.keysBottom.indexOf(keyCode) !== -1) {
                vOffset = this.verticalMove;
            }

            // 移動方向判斷
            if (cur_view_scene == TOP_VIEW_SCENE){
                camera.position.x += hOffset;
                camera.position.z += vOffset;
            }
            else if (cur_view_scene == FRONT_VIEW_SCENE){
                camera.position.x += hOffset;
                camera.position.z += vOffset;
            }
        }
    }
};
FreeCameraKeyboardArrowInput.prototype.getTypeName = function () {
    return "FreeCameraKeyboardArrowInput";
};
FreeCameraKeyboardArrowInput.prototype._onLostFocus = function (e) {
    this._keys = [];
};
FreeCameraKeyboardArrowInput.prototype.getSimpleName = function () {
    return "keyboardArrow";
};

// Connect to camera:
camera.inputs.add(new FreeCameraKeyboardArrowInput());

// 每一幀渲染場景
engine.runRenderLoop(() => {
    scene.render();
});

// 視窗大小變化
window.addEventListener("resize", function () {
    engine.resize();
});