<template>
    <ul class="navbar" style="background-color:rgb(20, 19, 19); color: aliceblue;">
        <li>
    <router-link to="/">/home</router-link>
        </li>
        <li>
    <router-link to="/community" >/community</router-link>
        </li>
        <li>
    <router-link to="/write" >/write</router-link>
        </li>
        <li>
    <router-link to="/chart" >/chart</router-link>
        </li>
    </ul>
</template>
<style scoped>
/* 导航栏 */
.navbar {
    list-style-type: none; /* 去除默认的列表样式 */
    margin: 0;
    padding-top:2vh;
    width: 100vw;
    height: 6vh;
}

.navbar li {
    display: inline-block; /* 将列表项显示为水平排列 */
    margin-left: 4vw;
}
.navbar li a{
    text-decoration: none;
    color: white;
}

@media (max-width:450px){
    .navbar li a {
    padding: 0px 0px; /* 调整导航项的内边距 */
}
}
</style>