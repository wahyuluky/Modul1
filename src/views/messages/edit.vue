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
    const user_id = ref("");
    const name = ref("");
    const email = ref("");
    const number = ref("");
    const message = ref("");
    const errors = ref([]);
 
    //onMounted
    onMounted( async () => {
 
        //fetch detail data post by ID
        await api.get(`/api/messages/${route.params.id}`)
        .then(response => {
 
            //set response data to state
            user_id.value = response.data.data.user_id
            name.value = response.data.data.name
            email.value = response.data.data.email
            number.value = response.data.data.number
            message.value = response.data.data.message
        });
    })
 
 
    //method "updatePost"
    const updateMessage = async () => {
 
        //init formData
        let formData = new FormData();
 
        //assign state value to formData
        formData.append("user_id", user_id.value);
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("number", number.value);
        formData.append("message", message.value);
        formData.append("_method", "PATCH");
 
        //store data with API
        await api.post(`/api/messages/${route.params.id}`, formData)
        .then(() => {
            //redirect
            router.push({ path: "/messages" });
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
                        <form @submit.prevent="updateMessage()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">User Id</label>
                                <textarea class="form-control" v-model="user_id" placeholder="User Id"></textarea>
                                <div v-if="errors.user_id" class="alert alert-danger mt-2">
                                    <span>{{ errors.user_id[0] }}</span>
                                </div>
                            </div>
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
                                <label class="form-label fw-bold">Number</label>
                                <textarea class="form-control" v-model="number" placeholder="Number"></textarea>
                                <div v-if="errors.number" class="alert alert-danger mt-2">
                                    <span>{{ errors.number[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Message</label>
                                <textarea class="form-control" v-model="message" rows="5" placeholder="Message"></textarea>
                                <div v-if="errors.message" class="alert alert-danger mt-2">
                                    <span>{{ errors.message[0] }}</span>
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