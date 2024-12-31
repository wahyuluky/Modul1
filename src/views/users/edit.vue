<script setup>
    //import ref
    import { ref, onMounted } from "vue";
 
    //import router
    import { useRouter, useRoute } from 'vue-router';
 
    //import api
    import api from "../../api";
 
    //init router
    const router = useRouter();
 
    //init route
    const route = useRoute();
 
    //define state
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const user_type = ref("");
    const errors = ref([]);
 
    //onMounted
    onMounted( async () => {
 
        //fetch detail data post by ID
        await api.get(`/api/users/${route.params.id}`)
        .then(response => {
 
            //set response data to state
            name.value = response.data.data.name
            email.value = response.data.data.email
            password.value = response.data.data.password
            user_type.value = response.data.data.user_type
        });
    })
 
 
    //method "updatePost"
    const updateUser = async () => {
 
        //init formData
        let formData = new FormData();
 
        //assign state value to formData
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
        formData.append("user_type", user_type.value);
        formData.append("_method", "PATCH");
 
        //store data with API
        await api.post(`/api/users/${route.params.id}`, formData)
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
                        <form @submit.prevent="updateUser()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <textarea class="form-control" v-model="name" placeholder="Name"></textarea>
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <textarea class="form-control" v-model="email" placeholder="Email"></textarea>
                                <div v-if="errors.email" class="alert alert-danger mt-2">
                                    <span>{{ errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Password</label>
                                <textarea class="form-control" v-model="password" placeholder="Password"></textarea>
                                <div v-if="errors.password" class="alert alert-danger mt-2">
                                    <span>{{ errors.password[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">User Type</label>
                                <textarea class="form-control" v-model="user_type" rows="5" placeholder="User Type"></textarea>
                                <div v-if="errors.user_type" class="alert alert-danger mt-2">
                                    <span>{{ errors.user_type[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>