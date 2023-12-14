<template>
<editor/>
</template>
<script>
import editor from '/src/components/editor.vue';
export default{
    components:{
        editor
    },
    created() {
              document.body.style.overflow = 'hidden';
            }
}
</script>