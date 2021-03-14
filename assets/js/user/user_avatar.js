// 1.1 获取裁剪区域的 DOM 元素
let $image = $("#image");
let options = {
  aspectRatio: 1,
  preview: ".img-preview",
};
$image.cropper(options);

//点击上传
$("#btnChooseImage").on("click", function () {
  $("#file").click();
});

//上传图片
$("#file").on("change", function () {
  let file = this.files[0];
  if (!file) {
    return;
  }
  let newImgURL = URL.createObjectURL(file);
  $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", newImgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});

//点击提交
$("#btnCreateAvatar").on("click", function () {
  let base64Str = $image.cropper("getCroppedCanvas", {
    width: 100,
    height: 100,
  });
  let dataURL = encodeURIComponent(base64Str.toDataURL());
  console.log(dataURL);
  //发送请求
  axios.post("/my/update/avatar", `avatar=${dataURL}`).then(function (res) {
    layui.layer.msg(res.data.message);
    console.log(res);
    window.parent.getUserInfo();
  });
});
