//去注册
$("#showReg").on("click", function () {
  $(".login-form").hide();
  $(".reg-form").show();
});
//去登录
$("#showLogin").on("click", function () {
  $(".login-form").show();
  $(".reg-form").hide();
});

//自定义校验规则
layui.form.verify({
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^\S{6,12}$/, "密码必须6到12位，且不能出现空格"],
  //两次输入密码一致
  repwd: function (value) {
    // value 表示确认密码
    let pwd = $(".reg-form .passValue").val(); // 获取密码
    if (value !== pwd) {
      return "两次密码不一致";
    }
  },
});

//注册提交事件
$(".reg-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  axios({
    method: "POST",
    url: " http://ajax.frontend.itheima.net/api/reguser",
    data,
  }).then(function (res) {
    console.log(res);
    if (res.data.status !== 0) {
      return layui.layer.msg(res.data.message);
    }
    layui.layer.msg(res.data.message);
    $("#showLogin").click();
    $(".reg-name").val($(".ipt-name").val());
    $(".reg-pwd").val($(".passValue").val());
  });
});

//注册登录事件
$(".login-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  axios({
    method: "POST",
    url: "http://ajax.frontend.itheima.net/api/login",
    data,
  }).then((res) => {
    console.log(res);
    if (res.data.status !== 0) {
      return layui.layer.msg(res.data.message);
    }
    localStorage.setItem("token", res.data.token);
    layer.msg(res.data.message);
    location.href = "index.html";
  });
});
