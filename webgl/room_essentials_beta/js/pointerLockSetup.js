var pointerLock = (function () {

    var controls;

    function init(camera, scene){

        this.controls = new THREE.PointerLockControls(camera);
        scene.add(this.controls.getObject());

        //pointerlock needs click to activate
        document.addEventListener('click', function (event) {

            var element = document.getElementsByTagName("canvas")[0];

            function pointerlockchange(event) {

                if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                    pointerLock.controls.enabled = true;
                } else {
                    pointerLock.controls.enabled = false;
                    pointerLock.controls.getObject().rotation.y = 0; // Rotates Yaw Object
                    pointerLock.controls.getObject().children[0].rotation.x = 0; // Rotates the Pitch Object                    
                }

            }

            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

            element.requestPointerLock = element.requestPointerLock ||
                element.mozRequestPointerLock ||
                element.webkitRequestPointerLock;

            element.requestPointerLock();         

        }, false);

    }
    return{
        init: init,
        controls: controls
    }

})();

