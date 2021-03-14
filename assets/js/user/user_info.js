//获取用户信息
function getInfo() {
  axios({
    url: "/my/userinfo",
  }).then(function (res) {
    //给表单赋值
    layui.form.val("formTest", res.data.data);
  });
}
getInfo();

//自定义校验昵称
layui.form.verify({
  niname: function (value) {
    if (value.length > 6) {
      return "昵称长度需要在1-6个字符";
    }
  },
});

//提交修改
$("#form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  axios({
    method: "POST",
    url: "/my/userinfo",
    data,
  }).then(function (res) {
    layui.layer.msg(res.data.message);
    window.parent.getUserInfo();
  });
});

//重置
$("#btnReset").on("click", function (e) {
  e.preventDefault();
  getInfo();
});
