$(document).ready(function () {
    $("#Download_Gltf").off().on("click", function () {
        ExportObject(btnBack)
    })
});
// ExportObject(btnBack)

function ExportObject(model) {
    let exporter = new VATS.GLTFExporter();
    let My_model = model.getObject3D("mesh");
    My_model.model = model.object3D.model;

    let animation = model.getObject3D("mesh").animations || model.object3D.model.animations || [];
    exporter.parse(My_model, function (result) {
        var dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(result));
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "test.gltf");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, { animations: animation });
}


