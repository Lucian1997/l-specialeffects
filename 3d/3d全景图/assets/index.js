//视觉点，场景，渲染
let camera, scene, renderer;
let geometry, material, mesh;
//三维向量
let target = new THREE.Vector3();
let lon = 90,
	lat = 0;
let phi = 0,
	theta = 0;
let touchX, touchY;
init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	scene = new THREE.Scene();
	let sides = [{
		position: [-512, 0, 0],
		rotation: [0, Math.PI / 2, 0]
	}, {
		position: [512, 0, 0],
		rotation: [0, -Math.PI / 2, 0]
	}, {
		position: [0, 512, 0],
		rotation: [Math.PI / 2, 0, Math.PI]
	}, {
		position: [0, -512, 0],
		rotation: [-Math.PI / 2, 0, Math.PI]
	}, {
		position: [0, 0, 512],
		rotation: [0, Math.PI, 0]
	}, {
		position: [0, 0, -512],
		rotation: [0, 0, 0]
	}];
	for (let i = 0; i < sides.length; i++) {
		let side = sides[i];
		let element = document.getElementById("surface_" + i);
		element.width = 1026;
		let object = new THREE.CSS3DObject(element);
		object.position.fromArray(side.position);
		object.rotation.fromArray(side.rotation);
		scene.add(object);
	}
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('wheel', onDocumentMouseWheel, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	window.addEventListener('resize', onWindowResize, false);
}

function animate() {
	requestAnimationFrame(animate);
	lat = Math.max(-85, Math.min(85, lat));
	// 将角度转换成弧度函数
	phi = THREE.Math.degToRad(90 - lat);
	theta = THREE.Math.degToRad(lon);
	target.x = Math.sin(phi) * Math.cos(theta);
	target.y = Math.cos(phi);
	target.z = Math.sin(phi) * Math.sin(theta);
	console.log(lat,lon)
	console.log('lat',lat)
	console.log('phi',phi)
	console.log('theta',theta)
	console.log(target)
	camera.lookAt(target);
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseMove(event) {
	let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
	lon -= movementX * 0.1;
	lat += movementY * 0.1;
}

function onDocumentMouseUp(event) {
	document.removeEventListener('mousemove', onDocumentMouseMove);
	document.removeEventListener('mouseup', onDocumentMouseUp);
}

function onDocumentMouseWheel(event) {
	camera.fov += event.deltaY * 0.05;
	camera.updateProjectionMatrix();
}

function onDocumentTouchStart(event) {
	event.preventDefault();
	let touch = event.touches[0];
	touchX = touch.screenX;
	touchY = touch.screenY;
}

function onDocumentTouchMove(event) {
	event.preventDefault();
	let touch = event.touches[0];
	lon -= (touch.screenX - touchX) * 0.1;
	lat += (touch.screenY - touchY) * 0.1;
	touchX = touch.screenX;
	touchY = touch.screenY;
}
