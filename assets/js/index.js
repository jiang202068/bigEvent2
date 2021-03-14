//退出
$("#btnLogout").on("click", function () {
  layui.layer.confirm("确定退出吗？", function (index) {
    layui.layer.close(index);
    localStorage.removeItem("token");
    location.href = "login.html";
  });
});

//获取用户信息
getUserInfo();
function getUserInfo() {
  axios({
    url: "/my/userinfo",
  }).then(function (res) {
    if (res.data.status !== 0) {
      return layui.layer.msg(res.data.message);
    }
    let info = res.data.data;
    console.log(info);
    //显示名字
    let name = info.nickname || info.username;
    $("#welcome").text("欢迎 " + name);

    //显示头像
    if (info.user_pic) {
      $(".layui-nav-img").attr("src", info.user_pic).show();
      $(".text-avatar-box").hide();
      console.log(info.user_pic);
    } else {
      $(".text-avatar-box")
        .show()
        .children()
        .text(info.username[0].toUpperCase());
      $(".layui-nav-img").hide();
    }
  });
}
