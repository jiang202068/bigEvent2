//退出
$("#btnLogout").on("click", { icon: 2, title: "提示" }, function () {
  layui.layer.confirm("确定退出？", function (index) {
    localStorage.removeItem("token");
    location.href = "login.html";
    layui.layer.close(index);
  });
});

//获取用户信息
getUserInfo();
function getUserInfo() {
  axios({
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }).then(function (res) {
    console.log(res);
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
      $(".layui-nav-img").show().attr("src", info.user_pic);
      $(".text-avatar-box").hide();
    }
    {
      $(".text-avatar-box")
        .show()
        .children()
        .text(info.username[0].toUpperCase());
      $(".layui-nav-img").hide();
    }
  });
}

//用户
