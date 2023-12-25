<template>
<div style="position: absolute; width: 100%; height: 100%; background-color:black;"> 
<div style="position: fixed; height: 100vh;  width:1.5vw;left: 0%; top: 0%; background-color:black;"></div>
  <div style="position: fixed; height: 2vh;  width:100vw;left: 0%; top: 0%; background-color:black;"></div>
  <div style="background-color: rgb(33, 33, 33); width: 40%; height:50%;border-radius: 13px; position:absolute; left:25%; top: 10%; padding:3%; border: 1px solid gray;" >
    <p style="color: white;">project sheldon</p>
    <div style="width: 100%; display: flex;
    justify-content: center;
    align-items: center;">
      <p style="color: white;">username:</p>
      <input v-model="userName">
    </div>
    <div style="width: 100%; display: flex;
    justify-content: center;
    align-items: center;">
    <p style="color: white;">password:</p>
      <input v-model="password">
    </div>
    </div>
</div>
</template>
<script>
export default {
  created() {
    document.body.style.overflow = 'hidden';
  }
}
</script>
<style>
</style>