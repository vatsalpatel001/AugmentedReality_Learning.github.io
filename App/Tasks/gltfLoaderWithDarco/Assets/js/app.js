$(document).ready(function () {
    $.ajax({
        url: "./Assets/Model/arrow_btn.gltf",
        dataType: "text",
        success: function (result) {
            // console.log(result)
            vat_Gltf_Loader(JSON.parse(result), myModel, function () {
                myModel.emit("model-loaded", {
                    format: "gltf",
                    model: myModel.object3D.model
                })
            })
        }
    })
});

function vat_Gltf_Loader(data, model, callback) {

    // if (VFRAME.model.loader) {
    //     return;
    // }
    // VFRAME.model.loader = true;
    var dracoLoader = new VATS.DRACOLoader();
    dracoLoader.setDecoderPath('./Assets/Darco/');
    var loader = new VATS.GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.parse(JSON.stringify(data), '', (gltf) => {
        model.object3D.model = gltf.scene || gltf.scenes[0];
        model.object3D.model.animations = gltf.animations || [];
        model.setObject3D("mesh", model.object3D.model);

        model.setAttribute('animation-mixer', "clip:*");
        // VFRAME.model.loader = false;
        if (callback) {
            callback()
        }
    });
}

