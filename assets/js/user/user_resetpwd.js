// 修改密码验证
layui.form.verify({
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  //新密码不能和旧密码相同
  newpass: function (value) {
    if (value === $("[name = oldPwd]").val()) {
      return "新密码不能和旧密码相同";
    }
  },
  //确认密码和新密码不相同
  repass: function (value) {
    if (value !== $("[name = newPwd]").val()) {
      return "确认密码和新密码不相同";
    }
  },
});

//提交信息
$("#form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  axios({
    method: "POST",
    url: "/my/updatepwd",
    data,
  }).then(function (res) {
    if (res.data.status !== 0) {
      return layui.layer.msg(res.data.message);
    }
    layui.layer.msg(res.data.message);
  });
});

// 表单重置功能;
$("#form")[0].reset();
