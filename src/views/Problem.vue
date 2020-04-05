<template>
    <div class="about">
        <h1>{{this.$route.params["problemid"]}}</h1>


    </div>
</template>

<script>
    export default {
        name: 'Problem',
        components: {},
        data() {
            return {
                input: 'weqrtewa'
            }
        },
        methods: {
            testckick() {
                console.log(23423);
                this.input = "dsfa"
            }
        }
    }


</script>