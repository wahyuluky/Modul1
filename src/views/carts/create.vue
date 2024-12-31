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
    const image = ref("");
    const user_id = ref("");
    const name = ref("");
    const price = ref("");
    const quantity = ref("");
    const errors = ref([]);
 
    //method for handle file changes
    const handleFileChange = (e) => {
        //assign file to state
        image.value = e.target.files[0];
    };
 
    //method "storePost"
    const storeCart = async () => {
 
        //init formData
        let formData = new FormData();
 
        //assign state value to formData
        formData.append("image", image.value);
        formData.append("user_id", user_id.value);
        formData.append("name", name.value);
        formData.append("price", price.value);
        formData.append("quantity", quantity.value);
 
        //store data with API
        await api.post('/api/carts', formData)
        .then(() => {
            //redirect
            router.push({ path: "/carts" });
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
                        <form @submit.prevent="storeCart()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" class="form-control" @change="handleFileChange($event)">
                                <div v-if="errors.image" class="alert alert-danger mt-2">
                                    <span>{{ errors.image[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">User Id</label>
                                <input type="text" class="form-control" v-model="user_id" placeholder="Id user">
                                <div v-if="errors.user_id" class="alert alert-danger mt-2">
                                    <span>{{ errors.user_id[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <textarea class="form-control" v-model="name" placeholder="name"></textarea>
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Price</label>
                                <textarea class="form-control" v-model="price" placeholder="price"></textarea>
                                <div v-if="errors.price" class="alert alert-danger mt-2">
                                    <span>{{ errors.price[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Quantity</label>
                                <textarea class="form-control" v-model="quantity" placeholder="quantity"></textarea>
                                <div v-if="errors.quantity" class="alert alert-danger mt-2">
                                    <span>{{ errors.quantity[0] }}</span>
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