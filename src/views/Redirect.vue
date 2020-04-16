<template>
    <div>
        <br>
        <h3>
            跳转中...
        </h3>

    </div>
</template>

<script>
    import axios from "axios";
    import Url from "../utils/Url";
    import authapi from "../api/authApi";

    export default {
        name: 'Redirect',
        components: {},
        mounted() {

            var url = new URL(window.location.href);
            var entries = url.searchParams.entries();
            let a = 1;
            while (a) {
                let kv = entries.next().value;
                console.log(kv);
                if (kv != null) {
                    let k = kv[0]
                    let v = kv[1]
                    if (k == 'url') {
                        sessionStorage.setItem("pathBeforeLogin", v)
                    } else {
                        sessionStorage.setItem(k, v)
                    }
                } else {
                    break;
                }
            }
            authapi.login()
        },
        data() {
            return {}
        },
        methods: {}
    }

</script>

<style>

</style>
