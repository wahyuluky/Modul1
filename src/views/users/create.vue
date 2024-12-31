<script setup>
    //import ref
    import { ref } from "vue";
 
    //import router
    import { useRouter } from 'vue-router';
 
    //import api
    import api from "../../api";
 
    //init router
    const router = useRouter();
 
    //define state
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const user_type = ref("");
    const errors = ref([]);
 
 
    //method "storePost"
    const storeUser = async () => {
 
        //init formData
        let formData = new FormData();
 
        //assign state value to formData
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
        formData.append("user_type", user_type.value);
 
        //store data with API
        await api.post('/api/users', formData)
        .then(() => {
            //redirect
            router.push({ path: "/users" });
        })
        .catch((error) => {
            //assign response error data to state "errors"
            errors.value = error.response.data;
        });
    };
</script>
 
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeUser()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <textarea class="form-control" v-model="name" placeholder="name"></textarea>
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <textarea class="form-control" v-model="email" placeholder="email"></textarea>
                                <div v-if="errors.email" class="alert alert-danger mt-2">
                                    <span>{{ errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Password</label>
                                <textarea class="form-control" v-model="password" placeholder="password"></textarea>
                                <div v-if="errors.password" class="alert alert-danger mt-2">
                                    <span>{{ errors.password[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">User Type</label>
                                <textarea class="form-control" v-model="user_type" placeholder="user type"></textarea>
                                <div v-if="errors.user_type" class="alert alert-danger mt-2">
                                    <span>{{ errors.user_type[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>